import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

interface QuestionsProps {
  data: string[];
}

export const Questions = (props: QuestionsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = useCallback(
    (_value: number) => {
      setTimeout(() => {
        if (currentIndex < props.data.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 500);
    },
    [currentIndex],
  );

  const getSlideScale = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    return Math.max(0.6, 1 - distance * 0.2);
  };

  const getSlideMotion = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    const blur = Math.min(distance * 2, 12);
    const opacity = Math.max(0.3, 1 - distance * 0.7);

    const scale = getSlideScale(index);

    let y = (index - currentIndex) * 90;

    if (index < currentIndex) y -= 40;
    if (index > currentIndex) y += 40;

    return {
      filter: `blur(${blur}px)`,
      opacity,
      y,
      scale,
    };
  };

  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl">
        <AnimatePresence mode="popLayout">
          {props.data.map((item, index) => (
            <motion.div
              key={index}
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                'flex items-center justify-center px-4',
                { 'pointer-events-none': index !== currentIndex },
              )}
              style={{
                transformOrigin: 'center',
              }}
              initial={getSlideMotion(index)}
              animate={getSlideMotion(index)}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              layout
            >
              <Question text={item} onChange={handleAnswer} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};

type QuestionProps = {
  onChange?: (value: number) => void;
  text: string;
};

const Question = (props: QuestionProps) => {
  const [value, setValue] = useState<number | null>(null);
  const items = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  const handleSelect = useCallback(
    (index: number) => {
      setValue(index);
      props.onChange?.(index);
    },
    [props],
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
      <div className="flex w-full justify-center">
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
};
