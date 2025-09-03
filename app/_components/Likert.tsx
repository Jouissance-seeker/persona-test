'use client';

import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

type LikertProps = {
  onChange?: (value: number) => void;
};

type ItemProps = {
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
};

const LikertItem = memo(function LikertItem(props: ItemProps) {
  const { index, isSelected, onSelect } = props;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(index)}
      className={cn(
        'group relative rounded-full border-3 transition-colors',
        index === 3
          ? 'border-gray-400'
          : index < 3
            ? 'border-purple-600'
            : 'border-emerald-600',
        index === 0 || index === 6
          ? 'h-20 w-20'
          : index === 1 || index === 5
            ? 'h-16 w-16'
            : index === 2 || index === 4
              ? 'h-14 w-14'
              : 'h-12 w-12',
      )}
    >
      <span
        className={cn(
          'block h-full w-full rounded-full transition-colors',
          isSelected
            ? index === 3
              ? 'bg-gray-400'
              : index < 3
                ? 'bg-purple-600'
                : 'bg-emerald-600'
            : 'bg-transparent',
        )}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity',
          isSelected ? 'opacity-100' : 'group-hover:opacity-50',
        )}
      >
        <Check
          className={cn(
            index === 0 || index === 6
              ? 'h-8 w-8'
              : index === 1 || index === 5
                ? 'h-7 w-7'
                : index === 2 || index === 4
                  ? 'h-6 w-6'
                  : 'h-5 w-5',
            isSelected
              ? 'text-white'
              : index === 3
                ? 'text-gray-500'
                : index < 3
                  ? 'text-purple-700'
                  : 'text-emerald-700',
          )}
          strokeWidth={2}
        />
      </span>
    </button>
  );
});

export function Likert(props: LikertProps) {
  const [value, setValue] = useState<number | null>(null);

  const items = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => ({ index }));
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      setValue(index);
      props.onChange?.(index);
    },
    [props],
  );

  return (
    <div
      dir="rtl"
      className="flex w-full max-w-3xl items-center justify-between gap-4"
    >
      <span className="text-xl font-medium text-purple-600">مخالفم</span>
      <div className="flex items-center gap-6">
        {items.map((item) => (
          <LikertItem
            key={item.index}
            index={item.index}
            isSelected={value === item.index}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <span className="text-xl font-medium text-emerald-600">موافقم</span>
    </div>
  );
}
