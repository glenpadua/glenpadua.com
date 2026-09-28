import type { ReactNode } from 'react';
import { Badge } from '@/app/components/ui/badge';

interface TagProps {
  children: ReactNode;
  color?: string;
}

export function Tag({ children, color = '#000' }: TagProps): JSX.Element {
  return (
    <Badge
      className="inline rounded-2xl px-2.5 py-1 text-[0.7em] font-light text-white"
      style={{ background: color }}
    >
      {children}
    </Badge>
  );
}
