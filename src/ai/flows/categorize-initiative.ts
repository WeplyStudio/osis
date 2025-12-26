'use server';

/**
 * @fileOverview Suggests relevant tags for initiative proposals using AI.
 *
 * - categorizeInitiative - A function that categorizes initiative proposals and suggests tags.
 * - CategorizeInitiativeInput - The input type for the categorizeInitiative function.
 * - CategorizeInitiativeOutput - The return type for the categorizeInitiative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeInitiativeInputSchema = z.object({
  proposal: z.string().describe('The initiative proposal text.'),
});
export type CategorizeInitiativeInput = z.infer<typeof CategorizeInitiativeInputSchema>;

const CategorizeInitiativeOutputSchema = z.object({
  tags: z.array(z.string()).describe('Suggested tags for the initiative proposal.'),
});
export type CategorizeInitiativeOutput = z.infer<typeof CategorizeInitiativeOutputSchema>;

export async function categorizeInitiative(input: CategorizeInitiativeInput): Promise<CategorizeInitiativeOutput> {
  return categorizeInitiativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeInitiativePrompt',
  input: {schema: CategorizeInitiativeInputSchema},
  output: {schema: CategorizeInitiativeOutputSchema},
  prompt: `Suggest relevant tags for the following initiative proposal. The tags should be short, descriptive, and relevant to the content of the proposal. Return only an array of strings, do not return anything else. 

Proposal: {{{proposal}}}`,
});

const categorizeInitiativeFlow = ai.defineFlow(
  {
    name: 'categorizeInitiativeFlow',
    inputSchema: CategorizeInitiativeInputSchema,
    outputSchema: CategorizeInitiativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
