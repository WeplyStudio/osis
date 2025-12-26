'use server';

/**
 * @fileOverview AI flow to assess the popularity of student initiative proposals.
 *
 * - assessInitiativePopularity - Function to assess the popularity of an initiative.
 * - AssessInitiativePopularityInput - Input type for the assessInitiativePopularity function.
 * - AssessInitiativePopularityOutput - Output type for the assessInitiativePopularity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessInitiativePopularityInputSchema = z.object({
  initiativeDescription: z
    .string()
    .describe('A detailed description of the student initiative proposal.'),
});
export type AssessInitiativePopularityInput = z.infer<
  typeof AssessInitiativePopularityInputSchema
>;

const AssessInitiativePopularityOutputSchema = z.object({
  predictedEngagementLevel: z
    .string()
    .describe(
      'The predicted level of student engagement with the initiative (e.g., High, Medium, Low).' + 'Explain reason'
    ),
  potentialReach: z
    .string()
    .describe(
      'An estimate of how many students the initiative is likely to reach.'
    ),
  aiSuggestedTags: z
    .array(z.string())
    .describe('AI-suggested tags to categorize the initiative.'),
});

export type AssessInitiativePopularityOutput = z.infer<
  typeof AssessInitiativePopularityOutputSchema
>;

export async function assessInitiativePopularity(
  input: AssessInitiativePopularityInput
): Promise<AssessInitiativePopularityOutput> {
  return assessInitiativePopularityFlow(input);
}

const assessInitiativePopularityPrompt = ai.definePrompt({
  name: 'assessInitiativePopularityPrompt',
  input: {schema: AssessInitiativePopularityInputSchema},
  output: {schema: AssessInitiativePopularityOutputSchema},
  prompt: `You are an expert in student engagement and OSIS initiatives.
  Given the following student initiative proposal, assess its potential popularity and impact.
  Provide a predicted engagement level (High, Medium, or Low),
  estimate the potential reach (number of students),
  and suggest relevant tags to categorize the initiative.

  Initiative Description: {{{initiativeDescription}}}
`,
});

const assessInitiativePopularityFlow = ai.defineFlow(
  {
    name: 'assessInitiativePopularityFlow',
    inputSchema: AssessInitiativePopularityInputSchema,
    outputSchema: AssessInitiativePopularityOutputSchema,
  },
  async input => {
    const {output} = await assessInitiativePopularityPrompt(input);
    return output!;
  }
);
