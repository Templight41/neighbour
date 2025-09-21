'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname, useRouter } from 'next/navigation';
import { MessageCircle, Store } from 'lucide-react';

export default function PageToggle() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(pathname.includes('/auction'));
  console.log(isChecked);

  const handleCheckboxChange = () => {
    if (pathname.includes('/profile'))
      return router.push(isChecked ? '/auction' : '/');
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (pathname.includes('/profile')) return;
    if (isChecked) {
      if (pathname.includes('/auction')) return;
      router.push('/auction');
    } else {
      if (pathname.includes('/chat') || pathname === '/') return;
      router.push('/');
    }
  }, [isChecked]);

  useEffect(() => {
    if (pathname.includes('/profile')) return;
    if (pathname.includes('/auction')) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [pathname]);

  return (
    <>
      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center justify-center rounded-full bg-white p-1 shadow-card">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          style={{
            color: 'var(--text-accen)',
          }}
          className={`flex items-center space-x-[6px] rounded-full ${
            isMobile ? 'px-[10px]' : 'px-[18px]'
          } py-2 font-medium text-sm ${
            !isChecked
              ? 'bg-[var(--secondary)] text-primary'
              : 'text-body-color'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={`${isMobile ? '' : 'mr-[6px]'} fill-current`}
          >
            <MessageCircle size={16} />
          </svg>
          {isMobile ? '' : 'Chat'}
        </span>
        <span
          style={{
            color: 'var(--text-accen)',
          }}
          className={`flex items-center space-x-[6px] rounded-full ${
            isMobile ? 'px-[10px]' : 'px-[18px]'
          } py-2 font-medium text-sm ${
            isChecked ? 'bg-[var(--secondary)] text-primary' : 'text-body-color'
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={`${isMobile ? '' : 'mr-[6px]'} fill-current`}
          >
            <Store size={16} />
          </svg>
          {isMobile ? '' : 'Store'}
        </span>
      </label>
    </>
  );
}
