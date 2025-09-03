'use client';

import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

type LikertProps = {
  onChange?: (value: number) => void;
  text: string;
};

export function Likert(props: LikertProps) {
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
      ? 'h-14 w-14 md:h-18 md:w-18'
      : i === 1 || i === 3
        ? 'h-12 w-12 md:h-15 md:w-15'
        : 'h-10 w-10 md:h-12 md:w-12';

  const getIconSize = (i: number) =>
    i === 0 || i === 4
      ? 'h-6 w-6 md:h-8 md:w-8'
      : i === 1 || i === 3
        ? 'h-5 w-5 md:h-7 md:w-7'
        : 'h-4 w-4 md:h-5 md:w-5';

  return (
    <div>
      <h1 className="mb-3 text-center text-lg font-medium md:text-xl">
        {props.text}
      </h1>
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
                        'block h-full w-full rounded-full transition-colors',
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
}
