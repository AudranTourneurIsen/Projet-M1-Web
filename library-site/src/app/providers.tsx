'use client';

import { ReactNode, JSX } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return <NextUIProvider>{children}</NextUIProvider>;
}
