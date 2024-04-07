import React , {useState, useEffect} from 'react';

import {Box} from "@mui/material";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Navigation, FreeMode} from "swiper/modules";

import "./swiper.css";


const RecentlyViewed = ({recentlyViewed}) =>{

    const [recentVehicle, setRecentVehicle] = useState([]);

    useEffect(() => {
        const fetchData = async() => {

            let vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");

            if (vehicles.length ===4){
                setRecentVehicle(vehicles);
            }
            else {

                const response = await fetchData(
                    "http://localhost:3000/api/vehicles/vehicles",
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );            
                const data = await response.json();

                localStorage.setItem("vehicles", JSON.stringify(data.slice(0,4)));

                setRecentVehicle(data.slice(0,4));

                }
        }
    }
    )
    
    return (
    <div>
        <div className="recentlyViewedListings">
            <p className="recentlyViewedText">Recently Viewed</p>
          </div>
          <div className="recent-listings">
          <Swiper slides-per-view={3} spaceBetween={30} navigation={true} freeMode={true} modules={[Navigation, FreeMode]} className="mySwiper">
              {
                recentVehicle?.map((vehicle, index) =>
                  <SwiperSlide key={index}>
                    <div className="recentproperty-card">
                      <Box sx={{ height: 400, width: 325, border: '1px dashed' }}>

                      

                      <img
            src={vehicle.Image}
            alt={"car"}
            className="rounded-lg h-full w-full object-cover object-center  group-hover:scale-105 group-hover:rotate-3 duration-200"
          />                        

                      </Box>
                      <div className="recentproperty-card header">
                      </div>
                      <p>{property.propertyType} : {property.price}<span style={{ color: "gold" }}> $</span></p>
                    </div>
                  </SwiperSlide>
                )
              }
              <swiper-navigation>
                <swiper-button-prev></swiper-button-prev>
                <swiper-button-next></swiper-button-next>
              </swiper-navigation>

            </Swiper>
            </div>

    </div>
       
    )
}

export default RecentlyViewed;
