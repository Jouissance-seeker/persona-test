'use client';

import { type PropsWithChildren } from 'react';

interface IntroProps {
  onStart: (type: 'men' | 'women') => void;
}

export const Intro = (props: IntroProps & PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-medium md:text-xl">
        یک گزینه را انتخاب کنید
      </h1>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md bg-purple-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-purple-700"
          onClick={() => props.onStart('men')}
        >
          تست مردان
        </button>
        <button
          type="button"
          className="rounded-md bg-emerald-600 px-4 py-2 text-white shadow-sm transition-colors hover:bg-emerald-700"
          onClick={() => props.onStart('women')}
        >
          تست زنان
        </button>
      </div>
      {props.children}
    </div>
  );
};
