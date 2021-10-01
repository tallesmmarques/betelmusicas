import React from 'react';

import { IoClose } from 'react-icons/io5';

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}> = ({ children, isOpen, onClose, title }) => {
  return isOpen ? (
    <div className=" h-screen w-full fixed left-0 top-0">
      <div
        className="bg-black bg-opacity-50 h-screen w-full flex items-start
        justify-center overflow-y-scroll pt-12 pb-24"
      >
        <div className="bg-white dark:bg-gray-700 rounded-md p-4 shadow-lg mx-auto w-11/12 md:w-1/3">
          <main className="flex justify-between items-center">
            <h3 className="font-semibold flex-1 text-gray-900 dark:text-gray-100 text-xl">
              {title}
            </h3>
            <button
              className="text-gray-900 dark:text-gray-100 text-xl p-2"
              onClick={onClose}
            >
              <IoClose />
            </button>
          </main>

          <footer className="text-gray-900 pt-4">{children}</footer>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Modal;
