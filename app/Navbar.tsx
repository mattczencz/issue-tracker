'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const Navbar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="flex gap-8 px-6 py-4 border-b mb-6 items-center">
      <Link href="/" className="text-xl"><AiFillBug /></Link>

      <ul className="flex gap-4 items-center">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                'text-zinc-900': link.href === pathname,
                'text-zinc-500': link.href !== pathname
              }, 'nav-link')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && <Link href="/api/auth/signout">Sign Out</Link>}
        {status === 'unauthenticated' && <Link href="/api/auth/signin">Sign In</Link>}
      </Box>
    </nav>
  );
};
export default Navbar;