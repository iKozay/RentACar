import React , {useState} from 'react';

import {Box} from "@mui/material";

import {Swiper, SwiperSlide} from 'swiper/react';

import {Navigation, FreeMode} from "swiper/modules";

import "./swiper.css";


const RecentlyViewed = ({recentlyViewed}) =>{
    
    return (
    <div>
        <div className="recentlyViewedListings">
            <p className="recentlyViewedText">Recently Viewed</p>
          </div>
          <div className="recent-listings">
          <Swiper slides-per-view={3} spaceBetween={30} navigation={true} freeMode={true} modules={[Navigation, FreeMode]} className="mySwiper">
              {
                recentlyViewed?.map((property, index) =>
                  <SwiperSlide key={index}>
                    <div className="recentproperty-card">
                      <Box sx={{ height: 400, width: 325, border: '1px dashed' }}>

                      

                            <img src={""} alt="Photos" />
                        

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
