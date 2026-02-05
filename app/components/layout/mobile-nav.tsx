'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import { NavItem } from '@/app/components/layout/nav-item';
import type { MenuItem } from '@/types/content';

interface MobileNavProps {
  items: MenuItem[];
}

export function MobileNav({ items }: MobileNavProps): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[200px] bg-black p-5">
          <SheetHeader>
            <SheetTitle className="text-base">Menu</SheetTitle>
          </SheetHeader>
          <ul className="mt-6 list-none">
            {items.map(item => (
              <li key={item.name} className="mb-5 last:mb-0">
                <NavItem
                  name={item.name}
                  url={item.url}
                  tone="light"
                  isActive={item.url === pathname}
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
