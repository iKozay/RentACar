import React from "react";

export default function ViewReservation() {

    const [currentTab, setCurrentTab] = React.useState(0); // 0 for upcoming, 1 for past

    const tabStyle = "p-3 transition duration-300 ease-in-out w-1/2";
    const selectedTab = (tab) => {
        return currentTab === tab ? " bg-white border-hidden" : " bg-zinc-300 hover:bg-zinc-400 border";
    }

    return (
        <div>
            <div className="p-6 my-6 mx-10 bg-white rounded-md shadow-2xl shadow-stone-300">
                <div>
                    <button className="float-right ml-20 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>window.open("/", "_self")}>Make Reservation</button>
                </div>
                <div className="overflow-hidden border">
                    <button className={tabStyle+selectedTab(0)}  onClick={(e) => setCurrentTab(0)}>Upcoming</button>
                    <button className={tabStyle+selectedTab(1)} onClick={(e) => setCurrentTab(1)}>Past</button>
                </div>
                {currentTab === 0 ? tabContent(true) : tabContent(false)}
            </div>
        </div>
    );
}

function tabContent(upcoming) {
    const upcomingReservations = [
        {
            id: 34,
            vehicle: 'Mclaren 765LT',
            fromDate: 'Jan 25, 2024',
            toDate: 'Jan 30, 2024',
        },
        {
            id: 57,
            vehicle: 'Lamborghini Aventador',
            fromDate: 'Feb 25, 2024',
            toDate: 'Feb 30, 2024',
        },
        {
            id: 79,
            vehicle: 'Ferrari 488 Pista',
            fromDate: 'Mar 25, 2024',
            toDate: 'Mar 30, 2024',
        },
        {
            id: 90,
            vehicle: 'Porsche 911 GT3',
            fromDate: 'Apr 25, 2024',
            toDate: 'Apr 30, 2024',
        },

    ];
    const pastReservations = [
        {
            id: 18,
            vehicle: 'Mercedes G-Wagon',
            fromDate: 'Dec 20, 2023',
            toDate: 'Jan 5, 2024',
        },
        {
            id: 56,
            vehicle: 'Lamborghini Aventador',
            fromDate: 'Feb 25, 2024',
            toDate: 'Feb 30, 2024',
        },
        {
            id: 78,
            vehicle: 'Ferrari 488 Pista',
            fromDate: 'Mar 25, 2024',
            toDate: 'Mar 30, 2024',
        },
        {
            id: 90,
            vehicle: 'Porsche 911 GT3',
            fromDate: 'Apr 25, 2024',
            toDate: 'Apr 30, 2024',
        },
        {
            id: 12,
            vehicle: 'Audi R8',
            fromDate: 'May 25, 2024',
            toDate: 'May 30, 2024',
        },
        {
            id: 34,
            vehicle: 'Mclaren 765LT',
            fromDate: 'Jan 25, 2024',
            toDate: 'Jan 30, 2024',
        },
    ];
    var response = [];
    if(upcoming){
        // api call to get upcoming reservations
        // clear response
        response = [];
        response = upcomingReservations;
    }else{
        // api call to get past reservations
        response = [];
        response = pastReservations;
    }

    // return table displaying the reservations
    return (
        <div className={"overflow-x-auto"}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className={"text-xs text-gray-700 uppercase bg-gray-50"}>
                <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Vehicle</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {response.map((reservation) => (
                        <tr key={reservation.id} className={"odd:bg-white even:bg-gray-50 border-b"}>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation.id}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation.vehicle}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation.fromDate}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation.toDate}</td>
                            <td className="font-medium text-blue-600 hover:underline ">
                                <button className="font-medium text-blue-600 hover:underline" onClick={(e)=>goToReservationDetails(reservation.id)}>View</button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    );
}

function goToReservationDetails(reservationID) {
    window.open("/reservation/details/"+reservationID, "_self");
}