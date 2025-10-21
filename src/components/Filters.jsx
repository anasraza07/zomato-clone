import { useEffect, useState } from "react";

export default function Filters({ searchRestaurant, allRestaurants, setRestaurants }) {
  const [fourAndHalfPlusRating, setFourAndHalfPlusRating] = useState(false);
  const [fourPlusRating, setFourPlusRating] = useState(false);
  const [ratingFilters, setRatingFilters] = useState([]);

  useEffect(() => {
    setRestaurants(
      ratingFilters.length
        ? allRestaurants.filter((restaurant) =>
          ratingFilters.every((f) => restaurant.rating >= f)
        )
        : allRestaurants
    );
  }, [ratingFilters]);

  const handleRatingCheckbox = (targetElem) => {
    const { id } = targetElem;
    const clickedRatingFilter = id.slice(0, id.length - 1);

    if (targetElem.checked) {
      setRatingFilters((prev) => [...prev, clickedRatingFilter]);
    } else {
      setRatingFilters((prev) => prev.filter((item) => item !== clickedRatingFilter));
    }
  };

  return (
    <aside className="bg-gray-900 text-gray-100 shadow-sm p-5 md:p-6 md:w-64 w-[98%] mx-auto md:fixed md:top-26 md:bottom-0 rounded-xl md:rounded-r-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-200 border-b pb-2">
        Filters
      </h2>

      {/* Sort by */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-300 mb-2">Sort by</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="4.5+"
              checked={fourAndHalfPlusRating}
              onChange={(e) => {
                setFourAndHalfPlusRating(!fourAndHalfPlusRating);
                handleRatingCheckbox(e.target);
              }}
              className="accent-indigo-600 w-4 h-4"
            />
            <span>Rating 4.5+</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="4+"
              checked={fourPlusRating}
              onChange={(e) => {
                setFourPlusRating(!fourPlusRating);
                handleRatingCheckbox(e.target);
              }}
              className="accent-indigo-600 w-4 h-4"
            />
            <span>Rating 4+</span>
          </label>
        </div>
      </div>

      {/* Quick Filters */}
      <div>
        <h3 className="text-base font-medium text-gray-300 mb-3">Quick Filters</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => searchRestaurant("")}
            className="bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
          >
            All Categories
          </button>
          <button
            onClick={() => searchRestaurant("dessert")}
            className="bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
          >
            Dessert
          </button>
          <button
            onClick={() => searchRestaurant("fast food")}
            className="bg-gray-800 text-white py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
          >
            Fast Food
          </button>
        </div>
      </div>
    </aside>
  );
}
