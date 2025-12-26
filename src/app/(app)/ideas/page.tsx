'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestInitiative } from '@/ai/flows/suggest-initiative';
import type { SuggestInitiativeOutput } from '@/ai/flows/suggest-initiative';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Zap, Star, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  description: z.string().min(20, 'Description must be at least 20 characters long.'),
});

type FormData = z.infer<typeof formSchema>;

export default function IdeasPage() {
  const [analysis, setAnalysis] = useState<SuggestInitiativeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await suggestInitiative(data);
      setAnalysis(result);
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'Failed to analyze your idea. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="font-headline text-3xl font-bold">Suggest an Initiative</h1>
        <p className="text-muted-foreground mt-2">
          Have a great idea for a new club, event, or school improvement? Share it with OSIS! Our AI will provide an initial analysis to help us review it.
        </p>
        <Card className="mt-6 shadow-md">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initiative Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., School Coding Club" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your idea in detail. What is it, who is it for, and what are the goals?"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full font-bold text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze & Submit Idea'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 lg:mt-0">
        <h2 className="font-headline text-2xl font-bold">AI Analysis</h2>
        <div className="mt-4 sticky top-24">
          {isLoading && (
            <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed shadow-none bg-card/80">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="font-semibold text-lg font-headline">AI is thinking...</p>
                <p className="text-muted-foreground">Analyzing your brilliant idea!</p>
            </Card>
          )}
          {!isLoading && !analysis && (
            <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed shadow-none bg-card/80">
                <Zap className="w-12 h-12 text-muted-foreground mb-4"/>
                <p className="font-semibold text-lg font-headline">Analysis will appear here</p>
                <p className="text-muted-foreground">Submit an idea to see the AI's feedback.</p>
            </Card>
          )}
          {analysis && (
            <Card className="shadow-lg animate-in fade-in-50 zoom-in-95">
                <CardHeader>
                    <CardTitle className="font-headline">Analysis Results</CardTitle>
                    <CardDescription>Here's the AI's initial feedback on your proposal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="flex items-center gap-2 font-semibold mb-2 text-base"><Zap className="text-primary w-5 h-5"/> Feasibility</h3>
                        <p className="text-muted-foreground text-sm">{analysis.feasibility}</p>
                    </div>
                     <div>
                        <h3 className="flex items-center gap-2 font-semibold mb-2 text-base"><Star className="text-yellow-500 w-5 h-5 fill-yellow-500"/> Popularity</h3>
                        <p className="text-muted-foreground text-sm">{analysis.popularity}</p>
                    </div>
                     <div>
                        <h3 className="flex items-center gap-2 font-semibold mb-2 text-base"><Tag className="text-secondary-foreground w-5 h-5"/> Suggested Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {analysis.suggestedTags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
