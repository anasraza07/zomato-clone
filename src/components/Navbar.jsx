import { Link } from "react-router-dom";

export default function Navbar({ cart }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50 flex justify-between items-center px-6 md:px-12 py-5">
      <Link to="/" className="text-2xl md:text-3xl font-bold text-red-600 font-sans">
        Super Meals
      </Link>

      <Link to="/cart" className="relative flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-full">
        <span className="material-symbols-outlined text-gray-700 text-2xl">
          shopping_bag
        </span>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
