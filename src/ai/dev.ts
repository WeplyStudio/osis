import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-initiative.ts';
import '@/ai/flows/assess-initiative-popularity.ts';
import '@/ai/flows/suggest-initiative.ts';
import '@/ai/flows/analyze-initiative-feasibility.ts';