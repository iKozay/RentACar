
const Vehicle = ({vehicle}) => {
    return (
        <a key={vehicle._id} href={vehicle.href} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={vehicle.Image}
            alt={"car"}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{vehicle.make}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{vehicle.model}</p>

        <p className="mt-1 text-lg font-medium text-gray-900">{vehicle.price}{"$/hr"}</p>
      </a>
    )
}
export default Vehicle;