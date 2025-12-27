
'use server';

import { z } from 'zod';

const aspirationSchema = z.object({
  name: z.string().optional(),
  aspiration: z.string().min(10, { message: "Aspirasi harus minimal 10 karakter." }),
  category: z.string(),
});

type AspirationFormInputs = z.infer<typeof aspirationSchema>;

export async function sendAspiration(data: AspirationFormInputs): Promise<{ success: boolean; error?: string }> {
  const parsedData = aspirationSchema.safeParse(data);

  if (!parsedData.success) {
    const errorMessage = parsedData.error.errors[0]?.message || "Data tidak valid.";
    return { success: false, error: errorMessage };
  }

  const { name, aspiration, category } = parsedData.data;

  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram Bot Token or Chat ID is not configured in .env file.");
    return { success: false, error: "Fitur ini sedang dalam perbaikan." };
  }

  const senderName = name ? name.trim() : 'Anonim';
  const messageText = `
*🗳️ Aspirasi Baru Masuk!*

*Kategori:*
${category}

*Dari:*
${senderName}

*Isi Aspirasi:*
${aspiration}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: chatId,
    text: messageText,
    parse_mode: 'Markdown',
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
    });

    const result = await response.json();
    
    if (!result.ok) {
        console.error("Telegram API Error:", result.description);
        return { success: false, error: "Gagal mengirim ke Telegram." };
    }

    return { success: true };

  } catch (error) {
    console.error("Failed to send aspiration to Telegram:", error);
    return { success: false, error: "Terjadi kesalahan jaringan." };
  }
}
