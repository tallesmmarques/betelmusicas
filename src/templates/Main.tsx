import React from 'react';

import Link from 'next/link';
import {
  FaCalendarDay,
  FaCalendarPlus,
  FaMoon,
  FaMusic,
  FaPlusSquare,
} from 'react-icons/fa';

interface IMainProps {
  meta: React.ReactNode;
}

const Main: React.FC<IMainProps> = ({ meta, children }) => (
  <div className="antialiased min-h-screen w-screen text-gray-50">
    {meta}

    <div className="">
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
        <button className="app-btn">
          <FaCalendarDay />
          <span>Eventos</span>
        </button>
        <Link href="/event/ministry" passHref>
          <button className="app-btn">
            <FaCalendarPlus />
            <span>Criar Evento</span>
          </button>
        </Link>
        <button className="app-btn">
          <FaMoon />
          <span>Tema</span>
        </button>
      </div>
    </div>
  </div>
);

export { Main };
