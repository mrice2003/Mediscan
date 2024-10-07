// tailwind.d.ts
import { TailwindFn } from 'tailwindcss-react-native';

declare module 'tailwindcss-react-native' {
  export function useTailwind(): TailwindFn;
}