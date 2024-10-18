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
        {spotsArray.map((spot) => (
            <div
            key={spot.id}
            value ={toolTip}
            onMouseOut={()=>setToolTip(null)}
            onMouseOver={()=>setToolTip(spot.id)}
            className="spot_container"
        
            >
        
            <Link key ={spot.id} to = {`/spots/${spot.id}`} />
            <img src={spot.preImage} alt={spot.name} />
            <div>{spot.city},{spot.state},${spot.price}</div>

           </div>

        ))}
        </div>
    )


}

export default SpotList;

//需要注意，目前还没处理图片的逻辑，需要再考虑下
//周四中午测试，无错误，能在浏览器终端展示，但没有css所以页面没有内容
