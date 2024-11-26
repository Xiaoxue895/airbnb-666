// in the '/' routes path
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {showSpotLists} from "../../store/spot";
//should have the css file here
import './ShowSpotList.css'

const SpotList = () =>{
    const dispatch = useDispatch();
    const [toolTip, setToolTip] = useState(null);

    const spots = useSelector((state)=>state.spots);
    // console.log('Redux spots state:', spots);

    useEffect(() => {
        dispatch(showSpotLists());
        // console.log('Spots loaded');
    }, [dispatch]);

    if (!spots) return null;
    const spotsArray = Object.values(spots).filter(spot => spot !== undefined);
    // console.log('Spots array:', spotsArray);
 


    return (
        <div className="spot_list_wrapper">
        {spotsArray.sort((a, b) => b.id - a.id).map((spot) => (
            <div
            key={spot?.id}
            value ={toolTip}
            onMouseOut={()=>setToolTip(null)}
            onMouseOver={()=>setToolTip(spot.id)}
            className="spot_container"
        
            >
        
            <Link key ={spot.id} to = {`/spots/${spot?.id}`} >

            <img src={`${spot.previewImage}?t=${new Date().getTime()}`} alt={spot.name} />

            {/* onError={(e) => { e.target.onerror = null; e.target.src = 'images/WeChatee787054df89daea6e1a58875fb57021.jpg'; }}  */}
            
            {/* <div>{spot.city},{spot.state}</div> */}

            <div className="spot_list_desc">
                <div className="spot_list_preview">
                <div>{spot.city}, {spot.state}</div>
                <div>⭐️ {spot.avgRating && spot.avgRating !== "No rating yet." ? spot.avgRating : "New"}</div>
            </div>
            <span className='spot_list_preview_price'>${spot.price}</span><span> night</span>
            </div>

            {toolTip === spot.id ? <h4>{spot.name}</h4> : <h3 className="no_show">axi</h3>}
            </Link>
            </div>

        ))}
        </div>
    )


}

export default SpotList;

