'use client';

import { Likert } from './_components/Likert';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';

const data = [
  'شما مرتب دوستان جدیدی پیدا می‌کنید.',
  'شما از تنهایی لذت می‌برید.',
  'شما به راحتی با دیگران ارتباط برقرار می‌کنید.',
  'شما ترجیح می‌دهید در گروه‌های کوچک باشید.',
  'شما انرژی خود را از تعامل با دیگران دریافت می‌کنید.',
  'شما مرتب دوستان جدیدی پیدا می‌کنید.',
  'شما از تنهایی لذت می‌برید.',
  'شما به راحتی با دیگران ارتباط برقرار می‌کنید.',
  'شما ترجیح می‌دهید در گروه‌های کوچک باشید.',
  'شما انرژی خود را از تعامل با دیگران دریافت می‌کنید.',
  'شما مرتب دوستان جدیدی پیدا می‌کنید.',
  'شما از تنهایی لذت می‌برید.',
  'شما به راحتی با دیگران ارتباط برقرار می‌کنید.',
  'شما ترجیح می‌دهید در گروه‌های کوچک باشید.',
  'شما انرژی خود را از تعامل با دیگران دریافت می‌کنید.',
  'شما مرتب دوستان جدیدی پیدا می‌کنید.',
  'شما از تنهایی لذت می‌برید.',
  'شما به راحتی با دیگران ارتباط برقرار می‌کنید.',
  'شما ترجیح می‌دهید در گروه‌های کوچک باشید.',
  'شما انرژی خود را از تعامل با دیگران دریافت می‌کنید.',
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = useCallback(
    (_value: number) => {
      setTimeout(() => {
        if (currentIndex < data.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 500);
    },
    [currentIndex],
  );

  const getSlideStyle = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    const scale = Math.max(0.4, 1 - distance * 0.2);
    const blur = Math.min(distance * 2, 12);
    const opacity = Math.max(0.3, 1 - distance * 0.7);
    const y = (index - currentIndex) * 120 + (scale - 1) * 14;

    return {
      scale,
      filter: `blur(${blur}px)`,
      opacity,
      y,
    };
  };

  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className={cn(
                'absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2',
                { 'pointer-events-none': index !== currentIndex },
              )}
              initial={getSlideStyle(index)}
              animate={getSlideStyle(index)}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="flex items-center justify-center px-4">
                <Likert text={item} onChange={handleAnswer} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
