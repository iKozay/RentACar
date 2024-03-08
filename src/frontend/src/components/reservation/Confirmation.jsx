import React from "react";
// import ReactPlayer from 'react-player'

import confirmVideo from '../../assets/confirm.mp4'

export default function Confirmation() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold mb-1">Thank you for your reservation.</h1>
            <ReactPlayer
                // Disable download button
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}

                // Disable right click
                onContextMenu={e => e.preventDefault()}
                className='react-player fixed-bottom'
                url= {confirmVideo}
                width='50%'
                height='50%'
                controls = {false}
                playing={true}
            />
            <button className="mt-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={goToReserveration}>Go to My Reservation</button>
        </div>
    );
}
function goToReserveration(){
    console.log('go to reservation');
    // add route to account
}