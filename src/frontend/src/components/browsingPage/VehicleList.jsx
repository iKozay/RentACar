import Vehicle from "./Vehicle"
import {useState,useEffect} from 'react';


  export default function VehicleList() {
    const [vehicles,setVehicles] = useState([]);

    useEffect(()=>{
      // Here is where the fetching from the database need to happen
      // for now, I will just use the vehicles list
      const fetchVehicles = () => {setVehicles(vehiclesList);}
      fetchVehicles();
    },[]);// empty dependency array means that fetching happens only once when the component is rendered
    return (

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Vehicles</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {vehicles && vehicles.map((vehicle) => (
             <Vehicle key={vehicle.id} vehicle={vehicle}/>
            ))}
          </div>
        </div>
      </div>

    )

  }

  const vehiclesList = [
    {
      id: 1,
      name: 'Mclaren 765LT',
      href: '#',
      price: '$50/day',
      imageSrc: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp',
      imageAlt: 'car',
    },
    {
      id: 2,
      name: 'Mercedes G-Wagon',
      href: '#',
      price: '$100/day',
      imageSrc: 'https://cdn.motor1.com/images/mgl/ozYE4/s3/bulletproof-mercedes-amg-g63-by-inkas.jpg',
      imageAlt: 'car',
    },
    {
      id: 1,
      name: 'Mclaren 765LT',
      href: '#',
      price: '$50/day',
      imageSrc: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp',
      imageAlt: 'car',
    },
    {
      id: 2,
      name: 'Mercedes G-Wagon',
      href: '#',
      price: '$100/day',
      imageSrc: 'https://cdn.motor1.com/images/mgl/ozYE4/s3/bulletproof-mercedes-amg-g63-by-inkas.jpg',
      imageAlt: 'car',
    },
    {
      id: 1,
      name: 'Mclaren 765LT',
      href: '#',
      price: '$50/day',
      imageSrc: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp',
      imageAlt: 'car',
    },
    {
      id: 2,
      name: 'Mercedes G-Wagon',
      href: '#',
      price: '$100/day',
      imageSrc: 'https://cdn.motor1.com/images/mgl/ozYE4/s3/bulletproof-mercedes-amg-g63-by-inkas.jpg',
      imageAlt: 'car',
    },
    {
      id: 1,
      name: 'Mclaren 765LT',
      href: '#',
      price: '$50/day',
      imageSrc: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp',
      imageAlt: 'car',
    },
    {
      id: 2,
      name: 'Mercedes G-Wagon',
      href: '#',
      price: '$100/day',
      imageSrc: 'https://cdn.motor1.com/images/mgl/ozYE4/s3/bulletproof-mercedes-amg-g63-by-inkas.jpg',
      imageAlt: 'car',
    },
    {
      id: 1,
      name: 'Mclaren 765LT',
      href: '#',
      price: '$50/day',
      imageSrc: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp',
      imageAlt: 'car',
    },
    {
      id: 2,
      name: 'Mercedes G-Wagon',
      href: '#',
      price: '$100/day',
      imageSrc: 'https://cdn.motor1.com/images/mgl/ozYE4/s3/bulletproof-mercedes-amg-g63-by-inkas.jpg',
      imageAlt: 'car',
    },
  ]