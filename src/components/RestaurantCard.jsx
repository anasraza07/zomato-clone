import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/restaurant/" + restaurant.id)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-40 object-cover"
      />

      <div className="px-4 py-3 flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-800 truncate">
          {restaurant.name}
        </h4>
        <span className="text-yellow-600 font-medium">
          ⭐ {restaurant.rating.toFixed(1)}
        </span>
      </div>

      <p className="px-4 pb-4 text-sm text-gray-500">{restaurant.category}</p>
    </div>
  );
}
