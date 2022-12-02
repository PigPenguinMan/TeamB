import { Context } from "../App";
import { useParams ,Link } from "react-router-dom";
import { useContext, useState } from "react";



const PlaceDetailInfo = () => {

    const {category,hospitalData} = useContext(Context);
    const {id, placeid} = useParams();
    
    const placefilter = 
    hospitalData.filter(place => place.주소.includes(category[id].name));
    

    return (   
        <div> 
        
        <div className="detail__title">  
            <h4> {placefilter[placeid].사업장}</h4>
            <p> {placefilter[placeid].주소}에 위치한 병원입니다</p>
            <p> {placefilter[placeid].전화번호}</p>
        </div>

        <div className="detail__mapbox">
            병원 지도 api
        </div>
        <div className="detail__info">
        <h4> 진료과목</h4>
        {placefilter[placeid].진료과목내용명} 
        </div>
        
        <div className="linkbox">
        <Link className="linktext">
            예약하기
        </Link>
        </div>
        
    </div>
    );
}

export default PlaceDetailInfo;