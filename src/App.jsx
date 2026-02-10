import { useState } from "react";
import ShoppingCart from "./components/ShoppingCart";
import CartItem from "./components/CartItem";
import ProductDetails from "./components/ProductDetails";
import { useCart } from "./context/cartContext";

function App() {
  const {allItems, loading} = useCart();
  const [selectedProductId, setSelectedProductId] = useState(null);

  if (loading) {
    return (
      <div className="grid place-items-center py-20">
        <h1 className="text-5xl italic text-gray-500">Loading products...</h1>
      </div>
    );
  }

  // Show product details if a product is selected
  if (selectedProductId) {
    return (
      <ProductDetails 
        productId={selectedProductId} 
        onBack={() => setSelectedProductId(null)} 
      />
    );
  }

  // Show product list
  return (
    <div className="grid place-items-center py-20">
      <h1 className="lg:text-5xl md:text-4xl text-3xl italic text-gray-500 mb-16 px-10 text-center">
        Trend Alerts: Must-Have Outfits of the Season
      </h1>
      <ShoppingCart />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 place-items-start gap-10 xl:px-6 px-10">
        {allItems?.map((item) => {
          return(
            <CartItem 
              key={item.id} 
              item={item}
              onViewDetails={setSelectedProductId}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App