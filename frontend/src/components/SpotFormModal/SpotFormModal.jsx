import { useState,useEffect } from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createSpots,addImages,updateSpots} from '../../store/spot';

import'./SpotFormModal.css'

const SpotForm = ({spot,formType}) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const [previewImage, setPreviewImage] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(()=>{
        if(spot){
            setAddress(spot.address || "");
            setCity(spot.city || "");
            setState(spot.state || "");
            setCountry(spot.country || "");
            setLat(spot.lat || "");
            setLng(spot.lng || "");
            setDescription(spot.description || "");
            setName(spot.name || "");
            setPrice(spot.price || "");

            setPreviewImage(spot.previewImage || "");
            setImage2(spot.image2 || "");
            setImage3(spot.image3 || "");
            setImage4(spot.image4 || "");
            setImage5(spot.image5 || "");

        }
    },[spot]);


    const validateForm = () => {
        let error = {};
        if (!address) error.address = "Address is required";
        if (!city) error.city = "City is required";
        if (!state) error.state = "State is required";
        if (!country) error.country = "Country is required";
        if (!lat) error.lat = "Lat is required";
        if (lat > 90 || lat < -90) error.lat = "Lat must be within -90 and 90";
        if (!lng) error.lng = "Lng is required";
        if (lng > 180 || lng < -180) error.lng = "Lng must be within -180 and 180";
        if (!description) error.description = "Description is required";
        if (!name) error.name = "Name is required";
        if (!price) error.price = "Price is required";

        if (formType === "createSpot" && !previewImage)
            error.previewImage = "PrevieImage is required.";

        return error;
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const hasErrors = validateForm();
        if(Object.values(hasErrors).length > 0){
            setErrors(hasErrors);
            return;
        }

        setErrors({});

        const spotData ={...spot,address,city,state,country,lat,lng,name,description,price};


        let newSpot;
        if (formType === "Update Your Spot") {
          newSpot = await dispatch(updateSpots(spotData));
        } else if (formType === "Create a New Spot") {
          newSpot = await dispatch(createSpots(spotData));
          const imageArray = [
            { spotId: newSpot.id, preview: true, url: previewImage },
            { spotId: newSpot.id, preview: false, url: image2 },
            { spotId: newSpot.id, preview: false, url: image3 },
            { spotId: newSpot.id, preview: false, url: image4 },
            { spotId: newSpot.id, preview: false, url: image5 },
          ];
          await Promise.all(imageArray.map((image) => dispatch(addImages(image))));
        }



        if (newSpot.errors) {
            setErrors(newSpot.errors);
        } else {
            navigate(`/spots/${newSpot.id}`);
        }
    };

    return (
        <div className="spot_form">
          <form onSubmit={handleSubmit}>
            <h1>{formType}</h1>
    
            <div className="spot_location">
              <h2>Where&apos;s your place located?</h2>
              <p>
                Guests will only get your exact address once they booked a
                reservation.
              </p>
              <label>
                Country
                <input
                  value={country}
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
              {errors.country && <p className="error_message">{errors.country}</p>}
    
              <label>
                Street Address
                <input
                  value={address}
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              {errors.streetaddress && (
                <p className="error_message">{errors.streetaddress}</p>
              )}
    
              <div className="city_state">
                <label>
                  City
                  <input
                    value={city}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
                {errors.city && <p className="error_message">{errors.city}</p>}
    
                <label>
                  State
                  <input
                    value={state}
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
              </div>
              {errors.state && <p className="error_message">{errors.state}</p>}
    
              <div className="lat_lng">
                <label>
                  Latitude
                  <input
                    type="number"
                    value={lat}
                    placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                  />
                </label>
                {errors.lat && <p className="error_message">{errors.lat}</p>}
    
                <label>
                  Longitude
                  <input
                    type="number"
                    value={lng}
                    placeholder="Longitude"
                    onChange={(e) => setLng(e.target.value)}
                  />
                </label>
                {errors.lng && <p className="error_message">{errors.lng}</p>}
              </div>
            </div>
    
            <div className="sopt_detailed_description">
              <h2>Describe your place to guests</h2>
              <p>
                Mention the best features of your space, any special amentities like
                fast wifi or parking, and what you love about the neighborhood.
              </p>
              <label>
                <textarea
                  value={description}
                  placeholder="Please write at least 30 characters"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              {errors.description && (
                <p className="error_message">{errors.description}</p>
              )}
            </div>
    
            <div className="sopt_name">
              <h2>Create a title for your spot</h2>
              <p>
                Catch guests&apos; attention with a spot title that highlights what
                makes your place special.
              </p>
              <label>
                <input
                  value={name}
                  placeholder="Name of your spot"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {errors.name && <p className="error_message">{errors.name}</p>}
            </div>
    
            <div className="spot_price">
              <h2>Set a base price for your spot</h2>
              <p>
                Competitive pricing can help your listing stand out and rank higher
                in search results.
              </p>
              <label>
                <input
                  type="number"
                  value={price}
                  placeholder="Price per night (USD)"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              {errors.price && <p className="error_message">{errors.price}</p>}
            </div>
    
            {formType === "Create a New Spot" ? (
              <div className="spotImage_links">
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <label>
                  <input
                    id="previewImage"
                    name="previewImage"
                    value={previewImage}
                    placeholder="Preview Image URL"
                    onChange={(e) => setPreviewImage(e.target.value)}
                  />
                  {errors.previewurl && (
                    <p className="error_message">{errors.previewurl}</p>
                  )}
                  <input
                    id="image2"
                    name="image2"
                    value={image2}
                    placeholder="Image URL"
                    onChange={(e) => setImage2(e.target.value)}
                  />
                  <input
                    id="image3"
                    name="image3"
                    value={image3}
                    placeholder="Image URL"
                    onChange={(e) => setImage3(e.target.value)}
                  />
                  <input
                    id="image4"
                    name="image4"
                    value={image4}
                    placeholder="Image URL"
                    onChange={(e) => setImage4(e.target.value)}
                  />
                  <input
                    id="image5"
                    name="image5"
                    value={image5}
                    placeholder="Image URL"
                    onChange={(e) => setImage5(e.target.value)}
                  />
                </label>
              </div>
            ) : (
              <></>
            )}

            <button type="submit">
                 {formType === "Create a New Spot"
                    ? "Create Spot"
                    : "Update Your Spot"}
            </button>


            </form>
        </div>
    )





}

export default SpotForm;