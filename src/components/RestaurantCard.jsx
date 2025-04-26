import { useNavigate } from "react-router-dom";
import "./RestaurantCard.css";

export default function RestaurantCard({ restaurant }) {
    let navigate = useNavigate()

    const handleCardClick = (id) => {
        navigate("/restaurant/" + id)
    }

    return (
        <div className="RestaurantCard" onClick={() => handleCardClick(restaurant.id)}>
            <img src={restaurant.image} alt="" />
            <div className="card-content">
                <h4>{restaurant.name}</h4>
                <span>{restaurant.rating.toFixed(1)}</span>
            </div>
            <p className="category">{restaurant.category}</p>
        </div>
    )
}