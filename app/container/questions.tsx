'use client';

import questions from '@/data/questions.json';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

interface QuestionsProps {
  type?: 'men' | 'women';
  data?: Record<string, string[]> | string[];
  onAnswer?: (key: string, value: number) => void;
  onComplete?: (scores: Record<string, number>) => void;
}

export const Questions = (props: QuestionsProps) => {
  const sourceData: Record<string, string[]> | string[] = useMemo(() => {
    if (props.data) return props.data;
    const fromType = props.type === 'women' ? questions.women : questions.men;
    return Object.fromEntries(
      Object.entries(fromType).map(([k, arr]) => [k, arr as string[]]),
    );
  }, [props.data, props.type]);

  const isArrayInput = Array.isArray(sourceData);

  const flatQuestions = useMemo(() => {
    if (isArrayInput) {
      return (sourceData as string[]).map((text) => ({ key: 'default', text }));
    }
    const items: Array<{ key: string; text: string }> = [];
    for (const [key, list] of Object.entries(
      sourceData as Record<string, string[]>,
    )) {
      for (const q of list) items.push({ key, text: q });
    }
    return items;
  }, [sourceData, isArrayInput]);

  const [shuffledQuestions, setShuffledQuestions] = useState<
    typeof flatQuestions
  >([]);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const arr = flatQuestions.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledQuestions(arr);
    setCurrentIndex(0);
    setReady(true);
  }, [flatQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);

  const [localScores, setLocalScores] = useState<Record<string, number>>({});

  const handleAnswer = useCallback(
    (value: number) => {
      const current = shuffledQuestions[currentIndex];
      const increment = (value + 1) * 2;

      if (props.onAnswer) {
        props.onAnswer(current.key, increment);
      } else {
        setLocalScores((prev) => ({
          ...prev,
          [current.key]: (prev[current.key] ?? 0) + increment,
        }));
      }

      setTimeout(() => {
        if (currentIndex < shuffledQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setCompleted(true);
        }
      }, 300);
    },
    [currentIndex, shuffledQuestions, props],
  );

  useEffect(() => {
    if (!completed) return;
    const timer = setTimeout(() => setHideProgress(true), 600);
    if (props.onComplete) props.onComplete(localScores);
    return () => clearTimeout(timer);
  }, [completed, localScores, props]);

  const getSlideScale = useCallback(
    (index: number) => {
      const distance = Math.abs(index - currentIndex);
      return Math.max(0.6, 1 - distance * 0.2);
    },
    [currentIndex],
  );

  const getSlideMotion = useCallback(
    (index: number) => {
      const distance = Math.abs(index - currentIndex);
      const blur = Math.min(distance * 2, 12);
      const opacity = Math.max(0.3, 1 - distance * 0.7);

      const scale = getSlideScale(index);

      let y = (index - currentIndex) * 90;
      if (index < currentIndex) y -= 40;
      if (index > currentIndex) y += 40;

      return { filter: `blur(${blur}px)`, opacity, y, scale } as const;
    },
    [currentIndex, getSlideScale],
  );

  const total = shuffledQuestions.length;
  const progress = useMemo(() => {
    if (hideProgress) return 0;
    return Math.min(
      100,
      (completed ? 1 : currentIndex / Math.max(total, 1)) * 100,
    );
  }, [hideProgress, completed, currentIndex, total]);

  // Render only a small window around the current index to cut DOM cost
  const visibleRange = 2;
  const visibleIndices = useMemo(() => {
    const start = Math.max(0, currentIndex - visibleRange);
    const end = Math.min(total - 1, currentIndex + visibleRange);
    const out: number[] = [];
    for (let i = start; i <= end; i += 1) out.push(i);
    return out;
  }, [currentIndex, total]);

  if (!ready) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden" />
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      {progress > 0 && progress < 100 && (
        <div dir="ltr" className="fixed top-0 right-0 left-0 z-50 h-1.5 w-full">
          <div
            className="h-full bg-purple-600 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="fixed top-4 right-3 z-50 rounded-lg bg-emerald-600 px-3 pt-1.5 pb-1 text-xs text-white backdrop-blur md:right-4 md:px-3 md:text-sm">
        {currentIndex + 1} از {total}
      </div>

      <div className="fixed top-4 left-3 z-50 w-fit rounded-lg bg-purple-600 px-3 pt-1.5 pb-1 text-xs text-white backdrop-blur md:left-4 md:px-3 md:text-sm">
        <p>{props.type === 'women' ? 'آرکتایپ زنان' : 'آرکتایپ مردان'}</p>
      </div>

      <div className="relative w-full max-w-4xl">
        <AnimatePresence mode="popLayout">
          {visibleIndices.map((index) => {
            const item = shuffledQuestions[index];
            return (
              <motion.div
                key={index}
                className={cn(
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                  'flex items-center justify-center px-4',
                  { 'pointer-events-none': index !== currentIndex },
                )}
                style={{ transformOrigin: 'center' }}
                initial={getSlideMotion(index)}
                animate={getSlideMotion(index)}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                layout
              >
                <Question
                  text={item.text}
                  onChange={index === currentIndex ? handleAnswer : undefined}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

type QuestionProps = {
  onChange?: (value: number) => void;
  text: string;
};

const Question = memo((props: QuestionProps) => {
  const [value, setValue] = useState<number | null>(null);
  const items = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  const handleSelect = useCallback(
    (index: number) => {
      setValue(index);
      props.onChange?.(index);
    },
    [props.onChange],
  );

  const getColor = (index: number, selected: boolean) => {
    if (!selected) return 'bg-transparent';
    if (index === 2) return 'bg-gray-400';
    return index < 2 ? 'bg-purple-600' : 'bg-emerald-600';
  };

  const getBorder = (index: number) =>
    index === 2
      ? 'border-gray-400'
      : index < 2
        ? 'border-purple-600'
        : 'border-emerald-600';

  const getIconColor = (index: number, selected: boolean) => {
    if (selected) return 'text-white';
    if (index === 2) return 'text-gray-500';
    return index < 2 ? 'text-purple-700' : 'text-emerald-700';
  };

  const getButtonSize = (i: number) =>
    i === 0 || i === 4
      ? 'size-14 md:size-18'
      : i === 1 || i === 3
        ? 'size-12 md:size-15'
        : 'size-10 md:size-12';

  const getIconSize = (i: number) =>
    i === 0 || i === 4
      ? 'size-6 md:size-8'
      : i === 1 || i === 3
        ? 'size-5 md:size-7'
        : 'size-4 md:size-5';

  return (
    <div>
      <h1 className="mb-3 text-center font-medium md:text-xl">{props.text}</h1>
      <div dir="ltr" className="flex w-full justify-center">
        <div className="flex justify-center">
          <div className="relative flex w-full items-center gap-5" dir="rtl">
            <span className="absolute right-1 -bottom-9 text-base text-purple-600 md:static md:text-xl">
              مخالفم
            </span>
            <div className="flex items-center gap-3 md:gap-4">
              {items.map((index) => {
                const isSelected = value === index;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelect(index)}
                    className={cn(
                      'group relative rounded-full border-2 transition-colors',
                      getBorder(index),
                      getButtonSize(index),
                    )}
                  >
                    <span
                      className={cn(
                        'block size-full rounded-full transition-colors',
                        getColor(index, isSelected),
                      )}
                    />
                    <span
                      className={cn(
                        'pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity',
                        isSelected ? 'opacity-100' : 'group-hover:opacity-50',
                      )}
                    >
                      <Check
                        strokeWidth={1.5}
                        className={cn(
                          getIconSize(index),
                          getIconColor(index, isSelected),
                        )}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="absolute -bottom-9 left-1 text-base text-emerald-600 md:static md:text-xl">
              موافقم
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Question.displayName = 'Question';
