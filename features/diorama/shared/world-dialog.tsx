'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMotionPolicy } from '@/features/diorama/shared/scene-motion';

export function WorldDialog({
  open,
  onOpenChange,
  title,
  eyebrow,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}): JSX.Element {
  const { enabled } = useMotionPolicy();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="world-dialog-overlay"
          data-motion={enabled}
        />
        <Dialog.Content
          className="world-dialog"
          data-motion={enabled}
          aria-describedby={undefined}
        >
          <Dialog.Close
            className="world-dialog-close"
            aria-label="Close details"
          >
            <X size={20} />
          </Dialog.Close>
          {eyebrow && <p className="world-eyebrow">{eyebrow}</p>}
          <Dialog.Title>{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
