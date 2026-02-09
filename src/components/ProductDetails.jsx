import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CartButtons from './CartButtons';
import { useCart } from '../context/cartContext';
import { formatCurrency } from '../utilities/formatCurrency';

function ProductDetails({ productId, onBack }) {
  const { allItems } = useCart();
  const product = allItems.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="grid place-items-center py-20">
        <h1 className="text-2xl text-gray-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-lg">Back to Products</span>
        </button>

        {/* Product Details Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 h-fit">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl text-pink-500 font-semibold">
                {formatCurrency(product.price)} kr
              </p>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Product Meta */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Product ID
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    #{product.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Quantity
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {product.inCart ? `${product.quantity} in cart` : 'Not in cart'}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="border-t pt-6">
              <CartButtons item={product} fromCart={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
