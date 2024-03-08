import React, { useState, useRef } from 'react';

const SortFilterButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedCategory || 'Car Type'}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        
        <div
          style={{
            position: 'absolute',
            top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight,
            right: 0,
            minWidth: buttonRef.current.offsetWidth,
          }}
          className="z-10 bg-neutral-200 divide-y divide-gray-100 rounded-lg">

          <ul className="p-3 space-y-3 text-sm text-gray-700">
            <li>
              <div
                className={`cursor-pointer ${selectedCategory === 'SUV' ? 'font-medium text-neutral-900' : ''}`}
                onClick={() => handleCategoryClick('SUV')}>
                SUV
              </div>
            </li>
            <li>
              <div
                className={`cursor-pointer ${selectedCategory === 'Sedan' ? 'font-medium text-neutral-900' : ''}`}
                onClick={() => handleCategoryClick('Sedan')}>
                Sedan
              </div>
            </li>
            <li>
              <div
                className={`cursor-pointer ${selectedCategory === 'Sport' ? 'font-medium text-neutral-900' : ''}`}
                onClick={() => handleCategoryClick('Sport')}>
                Sport
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortFilterButtons;
