import { useEffect } from "react";

export default function Cart({ cart, setCart, setPrice, price }) {
  useEffect(() => {
    setPrice({
      subTotal: getSubTotal(),
      vat: getSubTotal() * 0.15,
      total: getSubTotal() + getSubTotal() * 0.15,
    });
  }, [cart]);

  function getSubTotal() {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }

  const handleIncreaseCount = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseCount = (id) => {
    const found = cart.find((item) => item.id === id);
    if (found.quantity === 1) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-24">
      <h1 className="text-center text-3xl font-bold mb-10">Your Cart</h1>

      <main className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-6 shadow-lg">
        {/* Cart Items */}
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-gray-700 pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-xl object-cover"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400">Rs. {item.price}</p>
              </div>

              <div className="flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-full">
                <button
                  onClick={() => handleDecreaseCount(item.id)}
                  className="text-lg font-bold px-2 hover:text-red-400"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseCount(item.id)}
                  className="text-lg font-bold px-2 hover:text-green-400"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Price Details */}
        <div className="space-y-2 text-gray-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {price.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (15%)</span>
            <span>Rs. {price.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-white text-lg mt-3 pt-3 border-t border-gray-700">
            <span>Total</span>
            <span>Rs. {price.total.toFixed(2)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
