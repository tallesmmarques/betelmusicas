import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

import { genders } from '../utils/definitions';

interface FormData {
  [key: string]: boolean;
}

const SearchBar: React.FC<{
  setFilter: (value: string[]) => void;
  setSearch: (value: string) => void;
}> = ({ setFilter, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      ...genders.reduce((p, c) => ({ ...p, [c]: true }), {}),
    },
  });

  useEffect(() => {
    const subscription = watch((values) => {
      if (!Object.values(values).filter((c) => c === false).length) {
        setIsAllChecked(true);
      } else {
        setIsAllChecked(false);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setIsAllChecked]);

  const closeFilter = () => {
    setIsOpen(false);
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };
  const openFilter = () => {
    setIsOpen(true);
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
  };
  const onSubmit = (data: FormData) => {
    setFilter(
      Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    );
    closeFilter();
  };
  const onCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked === true) {
      genders.forEach((gender) => setValue(gender, true));
    } else {
      genders.forEach((gender) => setValue(gender, false));
    }
  };

  return (
    <div>
      <div className="flex mx-auto w-full sm:max-w-lg space-x-3 mt-8">
        <div className="relative rounded-md bg-white dark:bg-gray-600 border dark:border-none shadow-sm w-full flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-300">
              <FaSearch />
            </span>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Pesquisar por música"
            className="py-2 focus:ring-0 outline-none dark:bg-gray-600 dark:text-gray-100 block w-full pl-10 pr-3 rounded-md"
          />
        </div>
        <button
          onClick={openFilter}
          className="bg-white dark:bg-gray-600 border dark:border-none shadow-sm rounded-md text-gray-500 dark:text-gray-200
         active:bg-gray-200 text-lg py-2 px-3"
        >
          <FiFilter />
        </button>
      </div>
      {isOpen && (
        <div className=" h-screen w-screen fixed left-0 top-0 z-20">
          <div
            className="bg-black bg-opacity-50 h-screen w-screen flex items-start
        justify-center overflow-y-scroll pt-12 pb-24"
          >
            <div className="bg-white dark:bg-gray-700 rounded-md shadow-lg mx-auto w-11/12 md:w-1/3">
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
                <h2 className="text-lg text-gray-900 dark:text-gray-100 font-semibold">
                  Filtrar músicas
                </h2>
                <div>
                  <div className="mt-1 dark:text-gray-200">
                    <label>
                      <input
                        checked={isAllChecked}
                        onChange={onCheckAll}
                        className="mr-3"
                        type="checkbox"
                      />
                      Todos...
                    </label>
                  </div>
                  {genders.map((gender) => (
                    <div className="mt-1 dark:text-gray-200" key={gender}>
                      <label>
                        <input
                          className="mr-3"
                          {...register(gender)}
                          type="checkbox"
                        />
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex w-full space-x-3">
                  <button onClick={closeFilter} className="btn btn-secondary">
                    Cancelar
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Filtrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
