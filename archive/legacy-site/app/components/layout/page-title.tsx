import type { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

export function PageTitle({ children }: PageTitleProps): JSX.Element {
  return (
    <h1 className="text-center text-[2.3rem] font-light text-black sm:text-[2.5rem]">
      {children}
    </h1>
  );
}
