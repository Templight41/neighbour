import { User } from 'lucide-react';
import Link from 'next/link';
import PageToggle from './page-toggle';

export default function AppHeader({ style }: { style: React.CSSProperties }) {
  return (
    <div
      //   className="flex items-center justify-between border-b border-border bg-card px-6 py-4 shadow-sm"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'var(--background)',
        padding: '16px',
        boxSizing: 'border-box',
        height: '64px',
        position: 'sticky',
        top: 0,
        // zIndex: 100,
        ...style,
      }}
    >
      {/* Left Container */}
      <div className="flex items-center gap-4">
        <PageToggle />
      </div>

      {/* Center Container */}
      <div
        className="flex items-center gap-3"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Link href="/">
          <h1
            style={{
              margin: 0,
              color: 'hsl(var(--foreground))',
              fontSize: '1.25rem',
              fontWeight: '600',
            }}
          >
            Neighbour
          </h1>
        </Link>
      </div>

      {/* Right Container with Profile Icon */}
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground transition-all duration-200 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
          >
            <User size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
}
