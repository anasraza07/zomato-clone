import { useEffect, useState } from "react";
import { data } from "../data/restaurants.js";
import RestaurantCard from "../components/RestaurantCard.jsx";
import Filters from "../components/Filters.jsx";

export default function Home({ restaurants, setRestaurants }) {
  const [allRestaurants, setAllRestaurants] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    searchRestaurant(searchValue);
  }, [searchValue]);

  const searchRestaurant = (searchValue) => {
    searchValue = searchValue.toLowerCase();

    setRestaurants(
      allRestaurants.filter((restaurant) => {
        const menus = restaurant.menu.map((m) => m.name);
        return (
          restaurant.name.toLowerCase().includes(searchValue) ||
          restaurant.category.toLowerCase().includes(searchValue) ||
          menus.join(", ").toLowerCase().includes(searchValue)
        );
      })
    );
  };

  return (
    <div className="flex flex-col md:flex-row pt-26 pb-12 min-h-screen bg-gray-800 text-gray-100">

      {/* Sidebar */}
      <Filters
        searchRestaurant={searchRestaurant}
        setRestaurants={setRestaurants}
        allRestaurants={allRestaurants}
      />

      {/* Main */}
      <main className="flex-1 px-5 md:px-10 md:pl-74">
        <div className="flex justify-center mb-5">
          <input
            type="text"
            placeholder="Search restaurants, categories, or menu..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="w-full max-w-lg px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          All Restaurants
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
