'use client';

import { NextUIProvider } from '@nextui-org/react';
import { FC, ReactNode } from 'react';

type NextUiIntermediaryPageProps = {
  children: ReactNode;
};

export const NextUiIntermediaryPage: FC<NextUiIntermediaryPageProps> = ({
  children,
}) => <NextUIProvider>{children}</NextUIProvider>;
