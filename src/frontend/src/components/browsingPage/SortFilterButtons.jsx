import React, { useState, useRef } from 'react';

export default function SortFilterButtons({ allVehicles, sortedVehicles, setVehicles}) {

  const [isOpen1, setIsOpen1] = useState(false);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const buttonRef1 = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const buttonRef2 = useRef(null);

  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedCategory3, setSelectedCategory3] = useState(null);
  const buttonRef3 = useRef(null);

  const buttonRef4 = useRef(null);

  const [filter , setFilter] = useState({
    numberOfSeats: null,
    numberOfDoors: null,
    price: null
  });

  const resetAllFilters = () => {
    setSelectedCategory1(null);
    setSelectedCategory2(null);
    setSelectedCategory3(null);
    setVehicles(allVehicles);
  }
  const filterVehicles = (numberOfSeats, numberOfDoors, price) => {
    setFilter({
        numberOfSeats: numberOfSeats,
        numberOfDoors: numberOfDoors,
        price: price
    });
    let filteredVehicles = allVehicles;
    if(numberOfSeats !== null){
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.numberOfSeats === numberOfSeats);
    }
    if(numberOfDoors !== null){
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.numberOfDoors === numberOfDoors);
    }

    // sort the filtered vehicles
    sortVehicles(filter.price);

    setVehicles(filteredVehicles);
  }

    const sortVehicles = (price) => {
      if(price !== null){
        if(price === 1){
          setVehicles(sortedVehicles.sort((a, b) => a.price - b.price));
        }
        if(price === 2){
          setVehicles(sortedVehicles.sort((a, b) => b.price - a.price));
        }
      }
    }

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
  }

  const handleFilterBySeats = (category) => {
    if(category!==null){
      // const sortedVehicles = vehicles.filter((vehicle) => vehicle.numberOfSeats === category);
      // setVehicles(sortedVehicles);
      setSelectedCategory1(category + " seats");
    }else{
        // setVehicles(vehicles);
        setSelectedCategory1(null);
    }
    setIsOpen1(false);
    filterVehicles(category, filter.numberOfDoors, filter.price);
  };

  const handleFilterByDoors = (category) => {
    if(category!==null){
      // const sortedVehicles = vehicles.filter((vehicle) => vehicle.numberOfDoors === category);
      // setVehicles(sortedVehicles);
      setSelectedCategory2(category + " Doors");
    }else{
        // setVehicles(vehicles);
        setSelectedCategory2(null);
    }
    setIsOpen2(false);
    filterVehicles(filter.numberOfSeats, category, filter.price);
  };

  const handleSortByPrice = (category) => {
    if(category!==null){
      // const sortedVehicles = vehicles.filter((vehicle) => vehicle.price === category);
      // setVehicles(sortedVehicles);
      if(category === 1){
        setSelectedCategory3("Low to High");
      }
      if(category === 2){
        setSelectedCategory3("High to Low");
      }
    }else{
        // setVehicles(vehicles);
        setSelectedCategory3(null);
    }
    setIsOpen3(false);
    filterVehicles(filter.numberOfSeats, filter.numberOfDoors, category);
  };

  return (

    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className="relative inline-block text-left">

        {/*Button 1*/}
        <button ref={buttonRef1} onClick={toggleDropdown1} className="text-white bg-neutral-700 hover:bg-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 w-44"
          type="button">
          {selectedCategory1 || 'Number of Seats'}

          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
          
        </button>

        {isOpen1 && (
          
          <div
            style={{
              position: 'absolute',
              top: buttonRef1.current.offsetTop + buttonRef1.current.offsetHeight,
              left: 1,
              minWidth: buttonRef1.current.offsetWidth,
            }}
            className="z-10 bg-neutral-200 divide-y divide-gray-100 rounded-lg">

            <ul className="p-3 space-y-3 text-sm text-gray-700">
              <li>
                <div
                    className={`cursor-pointer ${selectedCategory1 === 'reset' ? 'font-medium text-neutral-900' : ''}`}
                    onClick={() => handleFilterBySeats(null)}>
                  Reset
                </div>
              </li>
              <li>
                <div
                  className={`cursor-pointer ${selectedCategory1 === '2 seats' ? 'font-medium text-neutral-900' : ''}`}
                  onClick={() => handleFilterBySeats(2)}>
                  2 seats
                </div>
              </li>
              <li>
                <div
                  className={`cursor-pointer ${selectedCategory1 === '4 seats' ? 'font-medium text-neutral-900' : ''}`}
                  onClick={() => handleFilterBySeats(4)}>
                  4 seats
                </div>
              </li>
              <li>
                <div
                    className={`cursor-pointer ${selectedCategory1 === '5 seats' ? 'font-medium text-neutral-900' : ''}`}
                    onClick={() => handleFilterBySeats(5)}>
                  5 seats
                </div>
              </li>
              <li>
                <div
                  className={`cursor-pointer ${selectedCategory1 === '6 seats' ? 'font-medium text-neutral-900' : ''}`}
                  onClick={() => handleFilterBySeats(6)}>
                  6 seats
                </div>
              </li>
            </ul>
          </div>
        )}

        {/*Button 2*/}
        <button ref={buttonRef2} onClick={toggleDropdown2} className="text-white bg-neutral-700 hover:bg-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 w-28"
          type="button">
          {selectedCategory2 || 'Doors'}

          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        {isOpen2 && (
          
          <div
            style={{
              position: 'absolute',
              top: buttonRef2.current.offsetTop + buttonRef2.current.offsetHeight,
              left: 208,
              minWidth: buttonRef2.current.offsetWidth,
            }}
            className="z-10 bg-neutral-200 divide-y divide-gray-100 rounded-lg">

            <ul className="p-3 space-y-3 text-sm text-gray-700">
              <li>
                <div
                    className={`cursor-pointer ${selectedCategory2 === 'Reset' ? 'font-medium text-neutral-900' : ''}`}
                    onClick={() => handleFilterByDoors(null)}>
                  Reset
                </div>
              </li>
              <li>
                <div
                    className={`cursor-pointer ${selectedCategory2 === '2 Doors' ? 'font-medium text-neutral-900' : ''}`}
                    onClick={() => handleFilterByDoors(2)}>
                  2 Doors
                </div>
              </li>
              <li>
                <div
                  className={`cursor-pointer ${selectedCategory2 === '4 Doors' ? 'font-medium text-neutral-900' : ''}`}
                  onClick={() => handleFilterByDoors(4)}>
                  4 Doors
                </div>
              </li>
            </ul>
          </div>
        )}

        <button ref={buttonRef3} onClick={toggleDropdown3} className="text-white bg-neutral-700 hover:bg-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-8 w-36"
          type="button">
          {selectedCategory3 || 'Sort by Price'}

          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        {isOpen3 && (

          <div
            style={{
              position: 'absolute',
              top: buttonRef3.current.offsetTop + buttonRef3.current.offsetHeight,
              right: 158,
              minWidth: buttonRef3.current.offsetWidth,
            }}
            className="z-10 bg-neutral-200 divide-y divide-gray-100 rounded-lg">

            <ul className="p-3 space-y-3 text-sm text-gray-700">
              <li>
                <div
                    className={`cursor-pointer ${selectedCategory3 === 'Reset' ? 'font-medium text-neutral-900' : ''}`}
                    onClick={() => handleSortByPrice(null)}>
                  Reset
                </div>
              </li>
              <li>
                <div
                  className={`cursor-pointer ${selectedCategory3 === 'Low to High' ? 'font-medium text-neutral-900' : ''}`}
                  onClick={() => handleSortByPrice(1)}>
                  Low to High
                </div>
              </li>
              <li>
                <div
                  className={`cursor-pointer ${selectedCategory3 === 'High to Low' ? 'font-medium text-neutral-900' : ''}`}
                  onClick={() => handleSortByPrice(2)}>
                  High to Low
                </div>
              </li>
            </ul>
          </div>
        )}

        {/* Button 4 */}
        <button ref={buttonRef4} onClick={resetAllFilters} className="text-white bg-neutral-700 hover:bg-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex mr-8"
          type="button">
          Reset All
        </button>

      </div>
    </div>
  );
};