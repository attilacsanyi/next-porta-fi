'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link
        className="text-2xl font-bold"
        href="/"
      >
        PortaFi
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center space-x-4 md:flex">
        <appkit-button />
        <Link
          className="text-lg"
          href="/portfolio"
        >
          Portfolio
        </Link>
        <ModeToggle />
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex items-center space-x-2 md:hidden">
        <appkit-button />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/portfolio">Portfolio</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </nav>
    </header>
  );
};
