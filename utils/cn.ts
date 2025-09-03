import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Params = ClassValue[];

export function cn(...params: Params) {
  return twMerge(clsx(params));
}
