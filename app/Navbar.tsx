'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const Navbar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="border-b mb-6 px-6 py-4">
      <Flex justify="between">
        <Flex align="center" gap="4">
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
        </Flex>
        <Flex align="center">
          {status === 'unauthenticated' && (
            <Link href="/api/auth/signin">
              <Button className="hover:cursor-pointer">Sign In</Button>
            </Link>
          )}
          {status === 'authenticated' && (

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">
                    {session.user!.email}
                  </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item >
                  <Link href="/api/auth/signout">Sign Out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Flex>
      </Flex>
    </nav>
  );
};
export default Navbar;