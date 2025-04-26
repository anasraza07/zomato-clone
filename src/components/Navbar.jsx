import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
    return (
        <nav>
            <Link to={"/"}><h1>Super Meals</h1></Link>
            <Link to={"/cart"}>
                <div className="cart-icon">
                    <span className="material-symbols-outlined">shopping_bag
                    </span>
                    <span>{(props.cart.length !== 0) && props.cart.length}</span>
                </div>
            </Link>
        </nav>
    )
}