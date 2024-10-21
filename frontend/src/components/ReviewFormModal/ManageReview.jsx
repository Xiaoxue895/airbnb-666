import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from '../../context/Modal';
import { getUserReviews, deleteReviews } from "../../store/review";

import DeleteModal from '../DeleteModel/DeleteModel'

import './ManageReview.css'

const ManageReview =()=>{

    const { setModalContent, closeModal } = useModal();

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews?.undefined?.Reviews);

    useEffect(() => {
        dispatch(getUserReviews(currentUser.id));
    }, [dispatch, currentUser.id]);

    if (!reviews) return null;

    const handleDeleteClick = (reviewId) => {
        setModalContent(
          <DeleteModal
            onDelete={() => handleDeleteConfirm(reviewId)}
            onClose={closeModal}
            message="Are you sure you want to remove this review?"
            type="Review"
          />
        );
    };
    
    const handleDeleteConfirm = async (reviewId) => {
        await dispatch(deleteReviews(reviewId));
        closeModal();
    }

    return (
        <div className="current_review_list_container">
            <h1>Manage Reviews</h1>
    
            <div className="current_review_container">
                {reviews
                    .sort((a, b) => b.id - a.id)
                    .map((review) => (
                        <div key={review.id} className="current_review_small_container">
                            <h2>{review.Spot.name}</h2>
                            <p>{review.createdAt.slice(0, 7)}</p>
                            <p>{review.review}</p>
    
                            <div className="current_review_buttons">
                                <button>Update</button>
                                <button onClick={() => handleDeleteClick(review.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );





}

export default ManageReview;

