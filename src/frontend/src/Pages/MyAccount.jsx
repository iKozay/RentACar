import React, {useState, useEffect, useContext} from "react";
import fetchData from "../utilities/fetchData";
import { useParams } from "react-router-dom";
import {UserContext} from "./Root.jsx";

export default function MyAccount() {
    const { user } = useContext(UserContext);
    const [newUserData, setNewNewUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [updateBtn, setUpdateBtn] = useState(false);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            try {
                const response = await fetchData(`http://localhost:3000/api/users/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data) {
                    setUserData(response.data);
                    setSuccess(true);
                } else if (response.error) {
                    setError(true);
                }
            } catch (error) {
                console.error("Error fetching userData data:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [user]);

    const handleClickUpdateUser = () => {
        setUpdateBtn(true);
    };

    const handleCancelUpdate = () => {
        setUpdateBtn(false);
    };

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const updatedData = {
            username: document.getElementById("username").value,
            first_name: document.getElementById("firstName").value,
            last_name: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            date_of_birth: document.getElementById("dateOfBirth").value,
            profile_picture: document.getElementById("picture").value,
            phone_number: document.getElementById("phoneNumber").value,
        };
    
        const passwordValue = document.getElementById("password").value.trim();
        if (passwordValue !== "") {
            updatedData.password = passwordValue;
        }
    
        try {
            const response = await fetchData(`http://localhost:3000/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedData),
            });
            if (response.data) {
                // Update user data state if the request is successful
                setUserData(response.data);
                // Reset the update button state
                setUpdateBtn(false);
            } else if (response.error) {
                console.error("Error updating userData data:", response.error);
            }
        } catch (error) {
            console.error("Error updating userData data:", error);
        }
    };    

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Account Management</h1>
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                    src={userData ? userData.profile_picture : "/default-profile-picture.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Personal Information</h2>
                {success ? (
                    !updateBtn ? (
                        <div>
                            <p className="text-gray-800 py-2">Name: {userData.full_name} </p>
                            <p className="text-gray-800 py-2">Username: {userData.username} </p>
                            <p className="text-gray-800 py-2">Email: {userData.email} </p>
                            <p className="text-gray-800 py-2">Phone Number: {userData.phone_number} </p>
                            <p className="text-gray-800 py-2">Date of Birth: {new Date(userData["date_of_birth"]).toISOString().split("T")[0]} </p>
                            <br/>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded" onClick={handleClickUpdateUser}>Update</button>
                        </div>
                    ) : (
                        <div>
                            <p>Update User {userData.username}:</p>
                            <form action="" className="mt-4">
                            <div className="mb-4">
                                <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Username
                                </label>
                                <input
                                type="text"
                                name="username"
                                id="username"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={userData.username}
                                required
                                />
                                <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                                >
                                First name
                                </label>
                                <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={userData["first_name"]}
                                required
                                />
                                <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Last name
                                </label>
                                <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={userData["last_name"]}
                                required
                                />
                                <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Email
                                </label>
                                <input
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={userData["email"]}
                                required
                                />
                                <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Phone Number
                                </label>
                                <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={userData["phone_number"]}
                                required
                                />
                                <label
                                htmlFor="dateOfBirth"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Date of birth
                                </label>
                                <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={
                                    new Date(userData["date_of_birth"])
                                    .toISOString()
                                    .split("T")[0]
                                }
                                required
                                />
                                <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Profile picture
                                </label>
                                <input
                                type="text"
                                name="picture"
                                id="picture"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                defaultValue={userData["profile_picture"]}
                                required
                                />
                                <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                                >
                                Password
                                </label>
                                <input
                                type="password"
                                name="password"
                                id="password"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="Enter new password to reset"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
                                onClick={handleUpdateUser}
                                >
                                Update
                                </button>
                                <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
                                onClick={handleCancelUpdate}
                                >
                                Cancel
                                </button>
                            </div>
                            </form>
                        </div>
                    )
                ) : loading ? (
                    <h2 className="text-center text-gray-500">Loading...</h2>
                ) : error ? (
                    <h2 className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">Error</h2>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
