import { useEffect, useState } from "react";
import "./Filters.css"

export default function Filters({ searchRestaurant, allRestaurants, setRestaurants }) {
    const [fourAndHalfPlusRating, setFourAndHalfPlusRating] = useState(false);
    const [fourPlusRating, setFourPlusRating] = useState(false);
    const [ratingFilters, setRatingFilters] = useState([]);

    useEffect(() => {
        setRestaurants(
            ratingFilters.length ?
                allRestaurants.filter(restaurant => {
                    return ratingFilters.every(f => restaurant.rating >= f)
                }) : allRestaurants)
    }, [ratingFilters])

    const handleRatingCheckbox = (targetElem) => {
        const { id } = targetElem;
        const clickedRatingFilter = id.slice(0, id.length - 1);

        if (targetElem.checked) {
            setRatingFilters(prevItems => {
                return [
                    ...prevItems,
                    clickedRatingFilter,
                ]
            })

        } else {
            setRatingFilters(prevItems => {
                return prevItems.filter(item => item !== clickedRatingFilter)
            })
        }
    }

    return (
        <aside>
            <h2>Filters</h2>
            <div className="filter-container">
                <h3>Sort by</h3>
                <label htmlFor="4.5+">
                    <input type="checkbox" name="" id="4.5+"
                        checked={fourAndHalfPlusRating}
                        onChange={(e) => {
                            setFourAndHalfPlusRating(!fourAndHalfPlusRating)
                            handleRatingCheckbox(e.target);
                        }} />
                    Rating 4.5+
                </label>
                <label htmlFor="4+">
                    <input type="checkbox" name="" id="4+"
                        checked={fourPlusRating}
                        onChange={(e) => {
                            setFourPlusRating(!fourPlusRating)
                            handleRatingCheckbox(e.target);
                        }} />
                    Rating 4+
                </label>
            </div>
            <div className="filter-container" id="quick-filters">
                <h3>Quick filters</h3>
                <div onClick={() => searchRestaurant('')}>
                    All categories
                </div>
                <div onClick={() => searchRestaurant('dessert')}>
                    Dessert
                </div>
                <div onClick={() => searchRestaurant('fast food')}>
                    Fast Food
                </div>
            </div>
        </ aside>
    )
}