import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSpotDetails } from "../../store/spot";

import './SpotImageModal.css'

const SpotImage = ({spotId}) => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots[spotId]);

    // console.log("Spot Images:", spot?.SpotImages);

    useEffect(() => {
        dispatch(showSpotDetails(spotId));
    }, [dispatch, spotId]);

    // if (!spot || !spot.SpotImages) return null;
    if (!spot) return <p>Loading spot details...</p>;
    if (!spot.SpotImages || spot.SpotImages.length === 0)
      return <p>No images available for this spot.</p>;


    const previewImage = spot.SpotImages.find((image) => image.preview === true);
    const smallImages = spot.SpotImages.filter((image) => image.preview === false && image.url);

    return(
        <div className="all_spot_container">
            <div className="big_image">

            {previewImage ? (
               <img src={previewImage.url} alt={spot.name} />
            ) : (
               <img
               src="images/WeChatee787054df89daea6e1a58875fb57021.jpg"
               alt="default preview"
               />
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