import { useState,useEffect } from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createSpots,updateSpots,addImages} from '../../store/spot';
//css.js

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
        if(formType ==="createSpot"){
            newSpot = await dispatch(createSpots(spotData));

            const imageArray = [
                { spotId: newSpot.id, preview: true, url: previewImage },
                image2 && { spotId: newSpot.id, preview: false, url: image2 },
                image3 && { spotId: newSpot.id, preview: false, url: image3 },
                image4 && { spotId: newSpot.id, preview: false, url: image4 },
                image5 && { spotId: newSpot.id, preview: false, url: image5 },
              ].filter(Boolean); 

          await Promise.all(imageArray.map((image) => dispatch(addImages(image))));
        }
        
        if(formType === "updateSpot"){
            newSpot = await dispatch(updateSpots(spotData));
        }


        if (newSpot.errors) {
            setErrors(newSpot.errors);
        } else {
            navigate(`/spots/${newSpot.id}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{formType}</h1>

                <label>
                    Address
                    <input 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                {errors.address &&<p>{errors.address}</p>}

                <label>
                    City
                    <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                {errors.city &&<p>{errors.city}</p>}

                <label>
                    State
                    <input 
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                </label>
                {errors.state &&<p>{errors.state}</p>}

                <label>
                    Country
                    <input 
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                {errors.country &&<p>{errors.country}</p>}

                <label>
                    Lat
                    <input 
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                {errors.lat &&<p>{errors.lat}</p>}

                <label>
                    Lng
                    <input 
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                {errors.lng &&<p>{errors.lng}</p>}

                <label>
                    Name
                    <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {errors.name &&<p>{errors.name}</p>}

                <label>
                    Description
                    <input 
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                {errors.description &&<p>{errors.description}</p>}

                <label>
                    Price
                    <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                {errors.price &&<p>{errors.price}</p>}


                {formType ==="createSpot"?(
                    <div>
                        <label>
                            <input
                             id="previewImage"
                             name="previewImage"
                             value={previewImage}
                             onChange={(e) => setPreviewImage(e.target.value)}
                            />
                            {errors.previewImage &&<div>{errors.previewImage}</div>}


                            <input
                            id="image2"
                            name="image2"
                            value={image2}
                            onChange={(e) => setImage2(e.target.value)}
                            />

                            <input
                            id="image3"
                            name="image3"
                            value={image3}
                            onChange={(e) => setImage3(e.target.value)}
                            />

                            <input
                            id="image4"
                            name="image4"
                            value={image4}
                            onChange={(e) => setImage4(e.target.value)}
                            />

                            <input
                            id="image5"
                            name="image5"
                            value={image5}
                            onChange={(e) => setImage5(e.target.value)}
                            />
                        </label>
                    </div>
                ):(<></>)}
                

                <button type="submit">
                    {formType === "createSpot"
                    ? "create a spot"
                    : "update a spot"}
                </button>


            </form>
        </div>
    )





}

export default SpotForm;