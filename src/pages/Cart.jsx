import { useEffect, useState } from "react";
import "./Cart.css";

export default function Cart({ cart, setCart, setPrice, price }) {
    useEffect(() => {
        setPrice({
            subTotal: getSubTotal(),
            vat: getSubTotal() * 0.15,
            total: getSubTotal() + (getSubTotal() * 0.15)
        })
    }, [cart])

    console.log(price)

    function getSubTotal() {
        return cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
    }

    // console.log(price)

    const handleIncreaseCount = (id) => {
        setCart(prevCartItems => {
            return prevCartItems.map((cartItem) => {
                const newQty = cartItem.quantity + 1;
                if (cartItem.id === id) {
                    return { ...cartItem, quantity: newQty, }
                } else {
                    return cartItem;
                }
            })
        })
    }

    const handleDecreaseCount = (id) => {
        // console.log(cart)
        const userCartItem = cart.find(cartItem => cartItem.id === id);
        if (userCartItem.quantity === 1) {
            setCart(prevCartItems => {
                return prevCartItems.filter(cartItem => cartItem.id !== userCartItem.id)
            })
        } else {
            setCart(prevCartItems => {
                return prevCartItems.map(cartItem => {
                    const newQty = cartItem.quantity - 1
                    if (cartItem.id === id) {
                        return { ...cartItem, quantity: newQty }
                    } else {
                        return cartItem;
                    }
                })
            })
        }
    }

    return (
        <div className="Cart">
            <h1>Your Items</h1>
            <main>
                <div id="cart-items-container">
                    {cart.map(cartItem => (
                        <div className="cart-item" key={cartItem.id}>
                            <div className="cart-item-image">
                                <img src={cartItem.image} alt="" />
                            </div>
                            <div className="cart-item-content">
                                <div className="item-name">{cartItem.name}</div>
                                <div className="item-price-container">
                                    <div className="item-price">
                                        Rs. {cartItem.price}
                                    </div>
                                    <div className="item-quantity-container">
                                        <div className="increase-decrease" id="decrease-count"
                                            onClick={() => handleDecreaseCount(cartItem.id)}>-</div>
                                        <div className="item quantity">{cartItem.quantity}</div>
                                        <div className="increase-decrease" id="increase-count"
                                            onClick={() => handleIncreaseCount(cartItem.id)}>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="cart-item-cost">
                    <div>Sub total</div>
                    <div>{price.subTotal.toFixed(2)}</div>
                </div>
                <div className="cart-item-cost">
                    <div>Standard delivery</div>
                    <div>Free</div>
                </div>
                <div className="cart-item-cost">
                    <div>VAT (15%)</div>
                    <div>{price.vat.toFixed(2)}</div>
                </div>
                <hr />
                <div id="total-price" className="cart-item-cost">
                    <div>Total <span>(incl. fees and tax)</span></div>
                    <div>Rs. {price.total.toFixed(2)}</div>
                </div>
            </main>
        </div>
    )
}