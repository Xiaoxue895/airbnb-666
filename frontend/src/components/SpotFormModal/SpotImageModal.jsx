import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSpotDetails } from "../../store/spot";

import './SpotImageModal.css'

const SpotImage = ({spotId}) => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots[spotId]);

    console.log("Spot Images:", spot?.SpotImages);

    useEffect(() => {
        dispatch(showSpotDetails(spotId));
    }, [dispatch, spotId]);

    if (!spot || !spot.SpotImages) return null;


    const previewImage = spot.SpotImages.filter(image => image.preview === true);
    const smallImages = spot.SpotImages.filter(image => image.preview === false);

    return(
        <div className="all_spot_container">
            <div className="big_image">

            {previewImage.length > 0 ? (
                <img src={previewImage[0].url} alt={spot.name} />
            ) : (
                <div><img src ="/images/house-540796_1280.jpg"></img></div> 
            )}
            </div>

            {smallImages.map((image) => (
                <div className="small_image" key={image.id}>
                    <img src={image.url} alt={image.id} />
                </div>
            ))}


        </div>
    )




}


export default SpotImage;

//未完待续！！！！