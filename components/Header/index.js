'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MobileNav, { NavItem } from './MobileNav';
import { menuItems } from 'utils/helpers';

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full justify-between sm:items-center">
      <Link href="/" aria-label="Go to home">
        <img
          src="/assets/logo.png"
          alt="Glen Padua logo"
          className="h-auto w-10 cursor-pointer sm:w-[65px]"
        />
      </Link>

      <MobileNav items={menuItems} />

      <ul className="hidden list-none text-black sm:flex sm:text-base">
        {menuItems.map(item => (
          <li key={item.name} className="mr-[30px] last:mr-0">
            <NavItem
              name={item.name}
              url={item.url}
              isActive={item.url === pathname}
              tone="dark"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
