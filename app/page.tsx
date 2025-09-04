'use client';

import { Questions } from './container/questions';
import questions from '@/data/questions.json';
import { useEffect, useMemo, useState } from 'react';

type Scores = Record<string, number>;

type MenQuestions = Record<string, string[]>;

export default function Page() {
  const menQuestions: MenQuestions = useMemo(() => {
    return Object.fromEntries(
      Object.entries(questions.men).map(([key, arr]) => [key, arr as string[]]),
    );
  }, []);

  const [scores, setScores] = useState<Scores>(() =>
    Object.fromEntries(Object.keys(menQuestions).map((k) => [k, 0])),
  );

  useEffect(() => {
    console.log('scores', scores);
  }, [scores]);

  const handleAnswer = (key: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [key]: (prev[key] ?? 0) + (value + 1) * 2,
    }));
  };

  return <Questions data={menQuestions} onAnswer={handleAnswer} />;
}
