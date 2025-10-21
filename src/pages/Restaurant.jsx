import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Restaurant({ restaurants, setCart, cart }) {
  const [restaurant, setRestaurant] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setRestaurant(restaurants.find((r) => r.id == id));
  }, [id, restaurants]);

  const handleClick = (menuId) => {
    const menu = restaurant.menu.find((m) => m.id === menuId);
    const existing = cart.find((c) => c.id === menu.id);

    setCart((prev) => {
      if (!existing) return [{ ...menu, quantity: 1 }, ...prev];
      return prev.map((c) =>
        c.id === menu.id ? { ...c, quantity: c.quantity + 1 } : c
      );
    });

    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-24">
      {restaurant && (
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-48 h-48 rounded-xl object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="bg-gray-700 px-3 py-1 text-sm rounded-full w-fit text-gray-300">
                {restaurant.category}
              </p>
              <h1 className="text-3xl font-bold mt-2">{restaurant.name}</h1>
              <p className="mt-2 bg-yellow-400 text-black w-fit px-3 py-1 rounded-md font-semibold">
                ⭐ {restaurant.rating?.toFixed(1)}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search in menu..."
            className="w-full max-w-md bg-gray-800 text-gray-200 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500" />

          {/* Menu Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurant.menu?.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover" />
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-400">Rs. {item.price}</p>
                  </div>
                  <button
                    onClick={() => handleClick(item.id)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold w-9 h-9 rounded-full flex justify-center items-center text-xl cursor-pointer">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
