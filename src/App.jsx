import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { commerce } from './commerce';

const App = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    };

    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const removeFromCart = async (itemId) => {
    const { cart } = await commerce.cart.remove(itemId);
    setCart(cart);  // Update cart state
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-gray-400">Shop Now</Link>
              </div>
              <div className="space-x-4">
                <Link to="/" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">Home</Link>
                <Link to="/cart" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">
                  Cart ({cart ? cart.total_items : 0}) {/* Safe check */}
                </Link>
              </div>
            </div>
          </nav>
          <div className="pt-20">
            <Home addToCart={addToCart} />
          </div>
        </div>
      ),
    },
    {
      path: "/cart",
      element: (
        <div>
          <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-gray-400">Shop Now</Link>
              </div>
              <div className="space-x-4">
                <Link to="/" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">Home</Link>
                <Link to="/cart" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">
                  Cart ({cart ? cart.total_items : 0}) {/* Safe check */}
                </Link>
               
              </div>
            </div>
          </nav>
          <div className="pt-20">
            <CartPage cartItems={cart ? cart.line_items : []} removeFromCart={removeFromCart} />
          </div>
        </div>
      ),
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
