import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { commerce } from '../commerce'; // Import the initialized commerce instance

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]); // Default to an empty array
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await commerce.products.list(); // Fetch products from Commerce.js
        console.log('API Response:', response); // Debugging log to inspect response

        if (response && response.data) {
          setProducts(response.data); // Set products data
          setFilteredProducts(response.data); // Initialize filtered products with all products
        } else {
          setProducts([]); // Fallback in case of undefined or empty data
          setFilteredProducts([]); // Ensure filtered products are empty
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter products based on search query
    if (query.trim() === '') {
      setFilteredProducts(products); // Reset to all products if query is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered); // Update filtered products
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="px-4">
      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search Products"
          className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring focus:ring-indigo-300"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ItemCard key={product.id} item={product} addToCart={addToCart} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
