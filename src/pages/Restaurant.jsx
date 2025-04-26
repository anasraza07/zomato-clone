import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import "./Restaurant.css"

export default function Restaurant({ restaurants, setCart, cart }) {
    const [restaurant, setRestaurant] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(restaurants)
        setRestaurant(restaurants.find(restaurant => restaurant.id == id));
    }, [])

    const handleClick = (id) => {
        const selectedMenu = restaurant.menu.find(singleMenu => {
            return singleMenu.id === id;
        });

        // console.log(selectedMenu)

        const selectedMenuInCart = cart.find(cartItem => cartItem.id === selectedMenu.id)

        setCart(prevCartItems => {
            if (!cart.length || !selectedMenuInCart) {
                return [{ ...selectedMenu, quantity: 1 }, ...prevCartItems]
            } else {
                return prevCartItems.map(cartItem => {
                    return cartItem.id === selectedMenu.id ?
                        { ...cartItem, quantity: cartItem.quantity + 1 } :
                        cartItem
                })
            }
        })

        // jo menu click ho wo access krlo
        // goal: agr cart empty hai ya selected menu cart main nhi hai to cart main selected menu set kro with quantity: 1
        // aur agr selected menu cart main hai to phr us selected menu ki quantity ko just 1 se increase krdo

        navigate("/cart")
    }


    return (
        <div className="Restaurant">
            {Object.keys(restaurant).length && (
                <>
                    <div id="header">
                        <img src={restaurant.image} alt="" />
                        <div className="content">
                            <div className="category">{restaurant.category}</div>
                            <h1>{restaurant.name}</h1>
                            <div className="rating">{restaurant.rating.toFixed(1)}</div>
                        </div>
                    </div>
                    <hr />
                    <input type="text" name="" id="" placeholder="Search in menu" />
                    <div id="menus-container">
                        {restaurant.menu.map(item => (
                            <div className="menu-card" key={item.id}>
                                <div className="menu-card-content">
                                    <h3>{item.name}</h3>
                                    <div className="price">Rs. {item.price}</div>
                                    {/* <div className="desc">Serves 1</div> */}
                                </div>
                                <img src={item.image} alt="" />
                                <div className="add-to-cart"
                                    onClick={() => handleClick(item.id)}>+</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}