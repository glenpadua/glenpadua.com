'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from 'components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'components/ui/sheet';
import { cn } from 'lib/utils';

export const NavItem = ({ name, url, isActive, tone = 'dark', onNavigate }) => {
  const textTone =
    tone === 'light' ? 'text-white visited:text-white' : 'text-black visited:text-black';
  const underlineTone = tone === 'light' ? 'after:bg-white' : 'after:bg-black';

  return (
    <Link
      href={url}
      onClick={onNavigate}
      className={cn(
        'relative inline-block whitespace-nowrap pb-1 text-[1.1rem] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:content-[""] after:transition-all hover:after:w-full',
        textTone,
        underlineTone,
        isActive && 'after:w-full'
      )}
    >
      {name}
    </Link>
  );
};

const MobileNav = ({ items }) => {
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
};

export default MobileNav;
