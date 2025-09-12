'use client';

import { ModeToggle } from '@/components/layout/mode-toggle';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between p-4">
        <Link
          className="text-2xl font-bold"
          href="/"
        >
          PortaFi
        </Link>

        <nav className="flex items-center space-x-2 md:space-x-4">
          <appkit-button />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};
