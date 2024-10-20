// in the '/spots/:spotId' routes path
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { showSpotDetails } from "../../store/spot";
import { getSpotReviews } from "../../store/review";

import ReviewList from '../ShowReview/ShowReviewList'
import SpotImage from "../SpotFormModal/SpotImageModal";

//css.js


const SpotDetail = ()=>{

    const {spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots[spotId])

    // console.log("Spot ID:", spotId); 
    // console.log("Spot data:", spot); // undifined

    const reviews = useSelector((state) => state.reviews[spotId]);  
    // console.log("======>", reviews); 


    const hasReviews = reviews && reviews.Reviews && reviews.Reviews.length > 0;

    const totalStars = hasReviews ? reviews.Reviews.reduce((sum, review) => sum + review.stars, 0) : 0;
    const averageRating = hasReviews ? (totalStars / reviews.Reviews.length).toFixed(1) : null;

    useEffect(()=>{

        if(spotId){
            dispatch(showSpotDetails(spotId));
            dispatch(getSpotReviews(spotId))
        }
    },[dispatch,spotId])

    // if (!spot || !spot.Owner ) return null;
    if (!spot) return <div>Loading spot details...</div>;
    if (!spot.Owner) return <div>Loading owner details...</div>;

    const handleReservation = () => {
        alert("Next class");
    }


    return(
    <div>
        <h2>{spot.name}</h2>
        <p>{spot.city}, {spot.state}, {spot.country}</p>
        <SpotImage spotId={spotId}/>

        <div>

            <div className="spot_detail_description">
                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                <p>{spot.description}</p>
            </div>

            <div>
                <span id="spot_price">${spot.price}</span><span>night</span>

            </div>

            <div>
            ⭐️ {!averageRating? "New": <>{averageRating} · {reviews?.Reviews?.length} {reviews?.Reviews?.length === 1 ? "Review" : "Reviews"}</>}
            </div>

            <div className="booking">
                    <div className="check_in">
                        <label>CHECK-IN</label>
                        <input type="date" className="booking_input"/>
                    </div>
                    <div className="check_out">
                        <label>CHECKOUT</label>
                        <input type="date" className="booking_input"/>
                    </div>

            </div>
            <button onClick={handleReservation}>Reserve</button>

        </div>
        
        <ReviewList spotId={spotId}/>
    </div>
    )



}

export default SpotDetail;