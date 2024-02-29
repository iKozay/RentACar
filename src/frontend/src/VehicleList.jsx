const vehicles = [
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

  export default function VehicleList() {

    return (

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Vehicles</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {vehicles.map((vehicle) => (
              <a key={vehicle.id} href={vehicle.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={vehicle.imageSrc}
                    alt={vehicle.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{vehicle.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{vehicle.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

    )

  }