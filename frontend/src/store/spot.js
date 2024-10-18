import {csrfFetch} from './csrf';

const SHOW_SPOT_LIST = "spot/SHOW_SPOT_LIST"
const SHOW_SPOT_DETAIL = "spot/SHOW_SPOT_DETAIL"

const CREATE_SPOT = "spot/CREATE_SPOT"
const DELETE_SPOT = "spot/DELETE_SPOT"

const ADD_IMAGE ="image/ADD_IMAGE"
//开始处理图片


const showSpotList =(spots) =>{
    return{
        type:SHOW_SPOT_LIST,
        spots
    }
}

const showSpotDetail =(spot) =>{
    return{
        type:SHOW_SPOT_DETAIL,
        spot
    }
}

const createSpot = (spot) =>{
    return{
        type:CREATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) =>{
    return{
        type:DELETE_SPOT,
        spotId
    }
}

//开始处理图片
const addImage = (spot) =>{
  return{
    type:ADD_IMAGE,
    spot
  }
}

export const showSpotLists = () => async (dispatch) => {
    const response = await fetch("/api/spots");
    if (response.ok) {
      const spots = await response.json();

      dispatch(showSpotList(spots.Spots));
      return spots;
    } else {
      const error = await response.json();
      return error;
    }
  };

  export const showSpotDetails= (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const spot = await response.json();
      dispatch(showSpotDetail(spot));
      return spot;
    } else {
      const error = await response.json();
      return error;
    }
  };

  export const createSpots = (spot) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    if (response.ok) {
      const newSpot = await response.json();
      dispatch(createSpot(newSpot));
      dispatch(showSpotDetails());
      return newSpot;
    } else {
      const error = await response.json();
      return error.errors;
    }
  };

// 1016晚上,这里应该用update还是edit？感觉edit更合理一点

  export const updateSpots = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    if (response.ok) {
      const updatedSpot = await response.json();
      dispatch(createSpot(updatedSpot));
      return updatedSpot;
    } else {
      const error = await response.json();
      return { errors: error.errors };
    }
  };



  export const deleteSpots = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteSpot(spotId));
      return { message: "Successfully deleted" };
    } else {
      const error = await response.json();
      return error;
    }
  };


  //开始处理图片

  export const addImages = (image) => async (dispatch) => {
    const { spotId, url, preview } = image;
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, preview }),
    });
    if (response.ok) {
      const newImage = await response.json();
      dispatch(addImage(newImage));
      return newImage;
    } else {
      const error = await response.json();
      return error;
    }
  };



  const initialState = {};

  const spotsReducer = (state = initialState,action) =>{
    switch(action.type){
        case SHOW_SPOT_LIST:{
          console.log('Action spots:', action.spots); 
            const newState ={...state};
            action.spots.forEach((spot)=>{
                newState[spot.id] = spot;
            });
            return newState;
        }
        case SHOW_SPOT_DETAIL:{
            const newState = {...state};
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case CREATE_SPOT: {
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        }
        case ADD_IMAGE:{
          const newState = { ...state };
          const spot = newState[action.spot.id]; 
          if (spot) {
            spot.images = spot.images || []; 
            spot.images.push(action.spot.image); 
          }
          return newState;
        }
    default:
      return state;
    }

  };

export default spotsReducer;
