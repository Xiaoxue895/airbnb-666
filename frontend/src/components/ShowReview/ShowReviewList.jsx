import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {getSpotReviews,deleteReviews} from '../../store/review';
import { useModal } from '../../context/Modal';

import DeleteModal from "../DeleteModel/DeleteModel";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";

import './ShowReviewList.css'

const ReviewList = ({spotId})=>{
    const dispatch = useDispatch();
    const { setModalContent, setOnModalClose, closeModal } = useModal();

    const reviews = useSelector((state) => state.reviews[spotId]);
    const currentSpot = useSelector((state) => state.spots[spotId]);
    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch, spotId]);

    const hasReviews = reviews && reviews.Reviews.length > 0;
    const totalStars = hasReviews ? reviews.Reviews.reduce((sum, review) => sum + review.stars, 0) : 0;
    const averageRating = hasReviews ? (totalStars / reviews.Reviews.length).toFixed(1) : null;

    const hasReviewed = hasReviews && currentUser && reviews.Reviews.some(review => review.userId === currentUser.id);
    const isOwner = currentUser && currentSpot && currentUser.id === currentSpot.ownerId;

    const openReviewModal = () => {
        setOnModalClose(() => {});
        setModalContent(
        <ReviewFormModal spotId={spotId} onSubmitSuccess={() => dispatch(getSpotReviews(spotId))}/>);
    };

    const handleDeleteClick = (reviewId) => {
        setModalContent(
            <DeleteModal
                onDelete={() => handleDeleteConfirm(reviewId, spotId)}
                onClose={closeModal}
                message="Are you sure you want to delete this review?"
                type="Review"
            />
        );
    };

    const handleDeleteConfirm = async (reviewId, spotId) => {
        await dispatch(deleteReviews(reviewId, spotId));
        closeModal();
    };


    return (
        <div className="review_list_container">
            {hasReviews ? (
                <>
                    <h3>
                        ⭐️ {averageRating} · {reviews.Reviews.length} {reviews.Reviews.length === 1 ? "Review" : "Reviews"}
                    </h3>

                    {!hasReviewed && !isOwner && currentUser && (
                        <button className="post_review_button" onClick={openReviewModal}>
                            Post Your Review
                        </button>
                    )}

                    {/* show the review list */}
                    {reviews.Reviews.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((review) => {
                        const date = new Date(review.updatedAt);
                        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);

                        return (
                            <div key={review.id} className="reviewList_small_container">
                                <h3>{review.User?.firstName || (currentUser && currentUser.firstName)}</h3>
                                <p>{formattedDate}</p>
                                <p>{review.review}</p>


                                {currentUser && currentUser.id === review.userId && !isOwner && (
                                    <button className="delete_review_button" onClick={() => handleDeleteClick(review.id)}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </>
            ) : (

                currentUser && !isOwner? (
                    <>
                        <h2>⭐️ New</h2>
                        <p>Be the first to post a review!</p>
                        <button className="post_review_button" onClick={openReviewModal}>
                            Post Your Review
                        </button>
                    </>
                ) : <h2>⭐️ New</h2>
            )}
        </div>
    );
};


export default ReviewList;
