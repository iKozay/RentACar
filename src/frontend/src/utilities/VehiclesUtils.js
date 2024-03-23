import fetchData from "./fetchData";


export async function CreateVehicle(make, model,price,transmission,numberOfSeats,address,colour,numberOfDoors,numberOfBaggage,kilometrage,electricOrFuel,avaibality,image) {
    const response = await fetchData("http://localhost:3000/api/vehicles/add", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            make: make,
            model: model,
            price: price,
            transmission: transmission,
            numberOfSeats: numberOfSeats,
            address: address,
            colour: colour,
            numberOfDoors: numberOfDoors,
            numberOfBaggage: numberOfBaggage,
            kilometrage: kilometrage,
            electricOrFuel: electricOrFuel,
            avaibality: avaibality,
            image: image
        }),
    });
    if(response.data){
        console.log("Successfully created a vehicle")
        return response.data;
    }
    else if(response.error){
        alert("failed to create a vehicle");
    }
    return null;
}

export async function FetchAllVehicles() {
  const response = await fetchData("http://localhost:3000/api/vehicles/vehicles", {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
    if(response.data){
        console.log("Successfully fetched all vehicles")
        return response.data;
    }
    else if(response.error){
        alert("failed to fetch all vehicles");
    }
    return false;
}

export async function FetchVehicleById(vehicleID) {
    const response = await fetchData(`http://localhost:3000/api/vehicles/vehicle/${vehicleID}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
        if(response.data){
            console.log("Successfully fetched the vehicle by id.")
            return response.data;
        }
        else if(response.error){
            alert("failed to fetch the vehicle by id.");
        }
        return null;
}

export async function FetchVehiclesCurrentBranch() {
    const branchID = localStorage.getItem("branchID");
    const response = await fetchData(`http://localhost:3000/api/vehicles/branch/${branchID}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
        if(response.data){
            console.log("Successfully fetched the vehicles by branch id.")
            return response.data;
        }
        else if(response.error){
            alert("failed to fetch the vehicles by branch id.");
        }
        return null;
}

