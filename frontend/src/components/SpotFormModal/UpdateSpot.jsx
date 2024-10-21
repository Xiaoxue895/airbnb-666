import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {showSpotDetails} from '../../store/spot'

import SpotForm from './SpotFormModal';

const UpdateSpot = () =>{

    const {spotId} = useParams();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(showSpotDetails(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state =>state.spots[spotId]);

    if (!spot) return null;


    return (
        Object.keys(spot).length > 1 && (
          <>
            <SpotForm
              spot={spot}
              formType="updateSpot"
            />
          </>
        )
      );


}

export default UpdateSpot;