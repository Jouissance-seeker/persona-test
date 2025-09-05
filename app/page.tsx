'use client';

import { Intro } from './container/intro';
import { Questions } from './container/questions';
import { Result } from './container/result';
import questions from '@/data/questions.json';
import { useEffect, useMemo, useState } from 'react';

type Scores = Record<string, number>;

type MenQuestions = Record<string, string[]>;

type Step = 'intro' | 'questions' | 'result';

export default function Page() {
  const [step, setStep] = useState<Step>('intro');
  const [type, setType] = useState<'men' | 'women' | null>(null);
  const [scores, setScores] = useState<Scores>({});

  const source: MenQuestions | null = useMemo(() => {
    if (!type) return null;
    const src = type === 'women' ? questions.women : questions.men;
    return Object.fromEntries(
      Object.entries(src).map(([k, arr]) => [k, arr as string[]]),
    );
  }, [type]);

  const handleStart = (t: 'men' | 'women') => {
    setType(t);
    const src = t === 'women' ? questions.women : questions.men;
    setScores(Object.fromEntries(Object.keys(src).map((k) => [k, 0])));
    setStep('questions');
  };

  const handleAnswer = (key: string, increment: number) => {
    setScores((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + increment }));
  };

  const handleComplete = (finalLocal?: Scores) => {
    if (finalLocal) {
      setScores((prev) => ({ ...prev, ...finalLocal }));
    }
    setStep('result');
  };

  useEffect(() => {
    console.log('scores', scores);
  }, [scores]);

  if (step === 'intro') {
    return <Intro onStart={handleStart} />;
  }

  if (step === 'questions' && type && source) {
    return (
      <Questions
        type={type}
        data={source}
        onAnswer={handleAnswer}
        onComplete={handleComplete}
      />
    );
  }

  return <Result scores={scores} onRestart={() => setStep('intro')} />;
}
