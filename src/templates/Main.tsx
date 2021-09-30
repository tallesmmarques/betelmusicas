import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import {
  FaMusic,
  FaPlusSquare,
  FaCalendarDay,
  FaCalendarPlus,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

interface IMainProps {
  meta: React.ReactNode;
}

const Main: React.FC<IMainProps> = ({ meta, children }) => {
  const [theme, setTheme] = useState<string>(
    typeof window !== 'undefined' ? localStorage.theme : 'dark'
  );
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  return (
    <div className="antialiased min-h-screen w-full text-gray-50">
      {meta}

      <div className="text-black">
        <div className="mb-10">{children}</div>
        <div className="app-bar">
          <Link href="/" passHref>
            <button className="app-btn">
              <FaMusic />
              <span>Músicas</span>
            </button>
          </Link>
          <Link href="/music/create" passHref>
            <button className="app-btn">
              <FaPlusSquare />
              <span>Criar Música</span>
            </button>
          </Link>
          <Link href="/event/" passHref>
            <button className="app-btn">
              <FaCalendarDay />
              <span>Eventos</span>
            </button>
          </Link>
          <Link href="/event/ministry" passHref>
            <button className="app-btn">
              <FaCalendarPlus />
              <span>Criar Evento</span>
            </button>
          </Link>
          {theme === 'dark' ? (
            <button onClick={() => setTheme('light')} className="app-btn">
              <FaSun />
              <span>Tema</span>
            </button>
          ) : (
            <button onClick={() => setTheme('dark')} className="app-btn">
              <FaMoon />
              <span>Tema</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Main };
