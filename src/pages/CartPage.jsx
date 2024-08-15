import React, { useState } from 'react';

const CartPage = ({ cartItems, removeFromCart }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredCartItems, setFilteredCartItems] = useState(cartItems); // State for filtered cart items
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter cart items based on search query
    if (query.trim() === '') {
      setFilteredCartItems(cartItems); // Reset to all cart items if query is empty
    } else {
      const filtered = cartItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCartItems(filtered); // Update filtered cart items
    }
  };

  // Handle item click to show details
  const handleItemClick = (item) => {
    setSelectedProduct(item); // Set the selected product
  };

  // Close product details
  const handleCloseDetails = () => {
    setSelectedProduct(null); // Reset the selected product
  };

  // If cart is empty
  if (!filteredCartItems || filteredCartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search Cart Items"
          className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredCartItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 flex justify-between items-center cursor-pointer"
            onClick={() => handleItemClick(item)} // Handle item click
          >
            <div>
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-800">{item.price.formatted_with_symbol}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation(); // Prevent item click when removing
                removeFromCart(item.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Display selected product details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseDetails}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
            <img src={selectedProduct.image.url} alt={selectedProduct.name} className="w-full h-64 object-cover mb-4" />
            <p className="text-gray-800 mb-4">{selectedProduct.description}</p>
            <p className="text-xl font-bold mb-4">{selectedProduct.price.formatted_with_symbol}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
