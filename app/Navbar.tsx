'use client';

import { Skeleton } from '@/app/components';
import { Avatar, Box, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbPointerSearch } from 'react-icons/tb';

const Navbar = () => {
  return (
    <nav className="border-b mb-6 px-6 py-4">
      <Flex justify="between">
        <Flex align="center" gap="4">
          <Link href="/" className="text-xl"><TbPointerSearch /></Link>
          <NavLinks />
        </Flex>
        <AuthLinks />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className="flex gap-4 items-center">
      {links.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              '!text-zinc-900': link.href === pathname,
            }, 'nav-link')}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthLinks = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="4rem" height="2rem" />;

  if (status === 'unauthenticated') {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        <Button className="hover:cursor-pointer">Sign In</Button>
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">
              {session!.user!.email}
            </Text>
          </DropdownMenu.Label>
          <Link href="/api/auth/signout">
            <DropdownMenu.Item className="hover:cursor-pointer">Sign Out</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;