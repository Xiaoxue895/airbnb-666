import { useState } from "react";
import {useDispatch} from "react-redux";
import { useModal } from '../../context/Modal';
import{ createReviews} from '../../store/review'
import ReviewStarRating from '../ReviewStarRating/ReviewStarRating'

import './ReviewFormModal.css'

const ReviewFormModal =({spotId,onSubmitSuccess})=>{

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const newReview = { review, stars };

        await dispatch(createReviews(newReview, spotId));

        if (onSubmitSuccess) {
            onSubmitSuccess();
        }

        closeModal();
        };

    return(
        <div>
            <form onSubmit={handleSubmit} className="review_form_modal">
                <h1>How was your stay?</h1>

                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />


                <div className='star_div'>
                    <span>Stars:</span>
                    <span className='stars_container'>
                    <ReviewStarRating rating={stars} setRating={setStars} />
                    </span>
                </div>

                <button type="submit " disabled ={review.length < 10 || stars === 0}>
                Submit Your Review
                </button>

            </form>
        </div>
    )

    

}

export default ReviewFormModal;
