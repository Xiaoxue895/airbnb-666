import { csrfFetch } from "./csrf";

const SHOW_REVIEW_LIST = "review/SHOW_REVIEW_LIST";
const CREATE_REVIEW = "review/CREATE_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

const showSpotReviewList = ({spotId,reviews}) =>{
    return{
        type:SHOW_REVIEW_LIST,
        reviews:{spotId,reviews}
    }
}

const showUserReviewList = ({userId,reviews}) =>{
    return{
        type:SHOW_REVIEW_LIST,
        reviews:{userId,reviews}
    }
}

const createReview = (review) =>{
    return{
        type:CREATE_REVIEW,
        review
    }
}

const deleteReview =(reviewId,spotId) =>{
    return {
        type:DELETE_REVIEW,
        reviewId,
        spotId
    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
      const reviews = await response.json();
      dispatch(showSpotReviewList({ spotId, reviews }));
      return reviews;
    } else {
      const error = await response.json();
      return error;
    }
  };

  export const getUserReviews = (userId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/current`);
    if (response.ok) {
      const reviews = await response.json();
      dispatch(showUserReviewList({ userId, reviews }));
      return reviews;
    } else {
      const error = await response.json();
      return error;
    }
  };


  export const createReviews = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (response.ok) {
      const newReview = await response.json();
      dispatch(createReview(newReview));
      return newReview;
    } else {
      const error = await response.json();
      return error;
    }
  };

  export const deleteReviews = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteReview(reviewId, spotId));
      return { message: "Successfully deleted" };
    } else {
      const error = await response.json();
      return error;
    }
  };

  const initialState = {};

  const reviewsReducer = (state = initialState, action) => {
    switch(action.type){

        case SHOW_REVIEW_LIST:{
          const { spotId, reviews } = action.reviews;
          return {
            ...state,
            [spotId]: reviews,
          };
        }


        case CREATE_REVIEW: {
          const review = action.review;
          const spotId = review.spotId;
          const spotReviews = state[spotId] ? state[spotId].Reviews : [];
          return {
            ...state,
            [spotId]: {
              ...state[spotId],
              Reviews: [...spotReviews, review],
            },
          };
        }

        
        case DELETE_REVIEW: {
          const { reviewId, spotId } = action;
          return {
            ...state,
            [spotId]: {
              ...state[spotId],
              Reviews: state[spotId].Reviews.filter(
                (review) => review.id !== reviewId
              ),
            },
          };
        }

        default:
            return state;
    }
  }
  export default reviewsReducer;
