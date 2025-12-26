// src/ai/flows/suggest-initiative.ts
'use server';
/**
 * @fileOverview A flow for students to suggest new initiatives for the OSIS organization, 
 * analyzing suggestions for feasibility and popularity, and suggesting tags.
 *
 * - suggestInitiative - A function that handles the initiative suggestion process.
 * - SuggestInitiativeInput - The input type for the suggestInitiative function.
 * - SuggestInitiativeOutput - The return type for the suggestInitiative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInitiativeInputSchema = z.object({
  title: z.string().describe('The title of the initiative.'),
  description: z.string().describe('A detailed description of the initiative.'),
});
export type SuggestInitiativeInput = z.infer<typeof SuggestInitiativeInputSchema>;

const SuggestInitiativeOutputSchema = z.object({
  feasibility: z.string().describe('An assessment of the initiative\'s feasibility.'),
  popularity: z.string().describe('An estimation of the initiative\'s popularity among students.'),
  suggestedTags: z.array(z.string()).describe('AI-suggested tags to categorize the initiative.'),
});
export type SuggestInitiativeOutput = z.infer<typeof SuggestInitiativeOutputSchema>;

export async function suggestInitiative(input: SuggestInitiativeInput): Promise<SuggestInitiativeOutput> {
  return suggestInitiativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInitiativePrompt',
  input: {schema: SuggestInitiativeInputSchema},
  output: {schema: SuggestInitiativeOutputSchema},
  prompt: `You are an AI assistant helping the OSIS organization evaluate student initiative suggestions.

  Analyze the following initiative suggestion for feasibility, popularity, and suggest relevant tags.

  Initiative Title: {{{title}}}
  Initiative Description: {{{description}}}

  Feasibility: (Assess the feasibility of implementing this initiative.  Consider resource constraints, logistical challenges, and potential obstacles.)
  Popularity: (Estimate how popular this initiative would be among the student body.  Consider student interests, needs, and potential impact.)
  Suggested Tags: (Suggest 3-5 tags that would help categorize this initiative.  These tags should be relevant to the initiative's topic and target audience.)`,
});

const suggestInitiativeFlow = ai.defineFlow(
  {
    name: 'suggestInitiativeFlow',
    inputSchema: SuggestInitiativeInputSchema,
    outputSchema: SuggestInitiativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
