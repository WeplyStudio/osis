'use server';

/**
 * @fileOverview Analyzes the feasibility of student initiative proposals.
 *
 * - analyzeInitiativeFeasibility - A function that analyzes the feasibility of student initiative proposals.
 * - AnalyzeInitiativeFeasibilityInput - The input type for the analyzeInitiativeFeasibility function.
 * - AnalyzeInitiativeFeasibilityOutput - The return type for the analyzeInitiativeFeasibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeInitiativeFeasibilityInputSchema = z.object({
  proposal: z
    .string()
    .describe('The student initiative proposal to analyze.'),
});
export type AnalyzeInitiativeFeasibilityInput = z.infer<
  typeof AnalyzeInitiativeFeasibilityInputSchema
>;

const AnalyzeInitiativeFeasibilityOutputSchema = z.object({
  feasibilityScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the feasibility of the proposal, with 1 being most feasible.'
    ),
  justification: z
    .string()
    .describe(
      'A justification for the feasibility score, explaining the reasoning behind the score.'
    ),
  tags: z
    .array(z.string())
    .describe('AI-suggested tags to help categorize the proposal.'),
});
export type AnalyzeInitiativeFeasibilityOutput = z.infer<
  typeof AnalyzeInitiativeFeasibilityOutputSchema
>;

export async function analyzeInitiativeFeasibility(
  input: AnalyzeInitiativeFeasibilityInput
): Promise<AnalyzeInitiativeFeasibilityOutput> {
  return analyzeInitiativeFeasibilityFlow(input);
}

const analyzeInitiativeFeasibilityPrompt = ai.definePrompt({
  name: 'analyzeInitiativeFeasibilityPrompt',
  input: {schema: AnalyzeInitiativeFeasibilityInputSchema},
  output: {schema: AnalyzeInitiativeFeasibilityOutputSchema},
  prompt: `You are an experienced advisor to the OSIS student organization.

You are helping the organization evaluate the feasibility of student initiative proposals.

Based on the following proposal, provide a feasibility score between 0 and 1, a justification for the score, and suggest tags to categorize the proposal.

Proposal: {{{proposal}}}`,
});

const analyzeInitiativeFeasibilityFlow = ai.defineFlow(
  {
    name: 'analyzeInitiativeFeasibilityFlow',
    inputSchema: AnalyzeInitiativeFeasibilityInputSchema,
    outputSchema: AnalyzeInitiativeFeasibilityOutputSchema,
  },
  async input => {
    const {output} = await analyzeInitiativeFeasibilityPrompt(input);
    return output!;
  }
);
