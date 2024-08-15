import React, { useState } from 'react';

const ItemCard = ({ item, addToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setIsAdded(true);
  };

  return (
    <div className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <img src={item.image.url} alt={item.name} className="w-full h-64 object-cover mb-4 rounded" />
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-gray-800 mb-4 text-lg">{item.price.formatted_with_symbol}</p>
      <button
        onClick={handleAddToCart}
        className={`text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 ${
          isAdded ? 'bg-green-500' : 'bg-blue-500'
        }`}
      >
        {isAdded ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ItemCard;
