// 这里管理spot，导向创建、更新 还要能删除
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { deleteSpots, showCurrentSpots } from "../../store/spot";

import { useModal } from "../../context/Modal";

import DeleteModal from '../DeleteModel/DeleteModel'

import './ManageSpot.css'

const ManageSpot = ()=>{
    const { setModalContent, closeModal } = useModal();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const spots = useSelector((state) => state.spots);
    const spotsArray = Object.values(spots);

    const filteredSpots = spotsArray.filter(spot => spot?.ownerId === currentUser?.id);

    useEffect(()=>{
        dispatch(showCurrentSpots())
    },[dispatch])

    if(!spots) return null;

    //处理删除
    const handleDeleteClick = (spotId) =>{

        setModalContent(

            <DeleteModal
            onDelete={()=>handleDeleteConfirm(spotId)}
            onClose={ closeModal }
            message= "Are you sure you want to remove this spot?"
            type= "Spot"
            />

        )
    }

    const handleDeleteConfirm = async (spotId) => {
        await dispatch(deleteSpots(spotId));
        closeModal();
    };
    

    return(
        <div className="all_spot_container">
            <h1>Manage Spots</h1>
            <button><Link to ={'/spots/new'} className="create_spot_button">
            Create a New Spot</Link></button>


            <div className="user_spot_container">

                {filteredSpots.sort((a, b) => b.id - a.id).map((spot)=>(
                    <div key ={spot.id} className="single_spot_container">

                        <Link key ={spot.id} to={`/spots/${spot.id}`} className = "single_spot_link">
                        <img src = {spot.previewImage} alt = {spot.name} />

                        <div>
                            <span>{spot.city},{spot.state}</span>
                            <span>⭐️ {spot.avgRating && spot.avgRating !== "No rating yet." ? spot.avgRating : "New"}</span>

                        </div>

                            <span className="single_spot_price">${spot.price} night</span>
                        
                        </Link>


                        <div>
                            <button><Link to ={`/spots/${spot.id}/update`}>Update</Link></button>
                            <button onClick={() => handleDeleteClick(spot.id)}>Delete</button>
                        </div>
                    </div>                   
                ))
                }
            </div>
        </div>
    )   
}

export default ManageSpot;