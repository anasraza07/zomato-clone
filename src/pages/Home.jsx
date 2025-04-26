import { useEffect, useState } from "react";
import { data } from "../data/restaurants.js";
import "./Home.css";
import RestaurantCard from "../components/RestaurantCard.jsx";
import Filters from "../components/Filters.jsx";

export default function Home({ restaurants, setRestaurants }) {
    const [allRestaurants, setAllRestaurants] = useState(data);
    const [searchValue, setSearchValue] = useState("");

    // const [checkboxData, setCheckboxData] = useState({
    //     fourAndHalfPlusRating: false,
    //     fourPlusRating: false,
    // })

    useEffect(() => {
        searchRestaurant(searchValue);
    }, [searchValue])

    const searchRestaurant = (searchValue) => {
        searchValue = searchValue.toLowerCase();

        setRestaurants(allRestaurants.filter(restaurant => {
            const menus = restaurant.menu.map(singleMenu => {
                return singleMenu.name;
            })

            return restaurant.name.toLocaleLowerCase().includes(searchValue) || restaurant.category.toLocaleLowerCase().includes(searchValue) || menus.join(", ").toLowerCase().includes(searchValue)
        }))
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);

        // searchRestaurant(event.target.value);
    }

    return (
        <div className="Home">
            <Filters searchRestaurant={searchRestaurant}
                setRestaurants={setRestaurants}
                allRestaurants={allRestaurants} />

            {/* all restaurants */}
            <main>
                <input type="text" placeholder="Search..."
                    onChange={handleSearchChange} value={searchValue} />
                <h2>All restaurants</h2>
                <div id="cards-container">
                    {/* restaurant card */}
                    {restaurants.map(restaurant => (
                        <RestaurantCard restaurants={restaurants}
                            restaurant={restaurant} key={restaurant.id} />
                    ))}
                </div>
            </main>
        </div>
    )
}