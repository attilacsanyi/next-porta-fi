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
      <nav className="flex items-center space-x-4">
        <Link
          className="text-lg"
          href="/portfolio"
        >
          Portfolio
        </Link>
      </nav>
    </header>
  );
};
