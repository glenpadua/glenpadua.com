'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

interface NavItemProps {
  name: string;
  url: string;
  isActive: boolean;
  tone?: 'dark' | 'light';
  onNavigate?: () => void;
}

export function NavItem({
  name,
  url,
  isActive,
  tone = 'dark',
  onNavigate,
}: NavItemProps): JSX.Element {
  const textTone =
    tone === 'light'
      ? 'text-white visited:text-white'
      : 'text-black visited:text-black';
  const underlineTone = tone === 'light' ? 'after:bg-white' : 'after:bg-black';

  return (
    <Link
      href={url}
      onClick={onNavigate}
      className={cn(
        'relative inline-block whitespace-nowrap pb-1 text-[1.1rem] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:content-[""] after:transition-all hover:after:w-full',
        textTone,
        underlineTone,
        isActive && 'after:w-full',
      )}
    >
      {name}
    </Link>
  );
}
