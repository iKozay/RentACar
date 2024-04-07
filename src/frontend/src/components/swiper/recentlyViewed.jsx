import React , {useState, useEffect} from 'react';

import {Box} from "@mui/material";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Navigation, FreeMode} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./swiper.css"


const RecentlyViewed = ({recentVehicle}) =>{

    
    return (
    <div>
        <div className="recentlyViewedListings">
            <p className="recentlyViewedText">Recently Viewed</p>
          </div>
          <div className="recent-listings">
          <Swiper slidesPerView={3} spaceBetween={30} navigation={true} freeMode={true} modules={[Navigation, FreeMode]} >
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
                      {/* <p>{property.propertyType} : {property.price}<span style={{ color: "gold" }}> $</span></p> */}
                    </div>
                  </SwiperSlide>
                )
              }
           

            </Swiper>
            </div>

    </div>
       
    )
}

export default RecentlyViewed;
