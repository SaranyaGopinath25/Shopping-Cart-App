import { createContext, useContext, useState, useEffect } from "react";
import { getParsedItemFromLocalStorage } from "../utilities/localStorageFns";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            
            // Map API response to products list
            const allProducts = data.map((product) => ({
                id: product.id,
                name: product.title,
                imageUrl: product.image,
                description: product.description,
                price: product.price,
                quantity: 1,
                inCart: false,
            }));

            // Get cart items from local storage and restore inCart and quantity
            const cartItems = getParsedItemFromLocalStorage("cartItems");
            if (cartItems && cartItems.length > 0) {
                console.log("Cart items from local storage :::: " + cartItems);
                cartItems.forEach((cartItem) => {
                    const product = allProducts.find((p) => p.id === cartItem.id);
                    if (product) {
                        product.inCart = cartItem.inCart;
                        product.quantity = cartItem.quantity;
                    }
                });
            }

            setAllItems(allProducts);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                if(prevItem.inCart){
                    return prevItem;
                }
                return prevItem.id === item.id ? {...prevItem, inCart : true} : prevItem
            })
        })
    }

    const removeFromCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                return prevItem.id === item.id ? {...prevItem, inCart : false, quantity : 1} : prevItem;
            })
        })
    }

    const updateQuantity = (cartItem, amount) => {
        setAllItems((prevItems) => {
            return prevItems.map((item) => {
                return item.id === cartItem.id ? {...item, quantity : item.quantity + amount} : item
            })
        })
    }

    return (
        <CartContext.Provider value={{allItems, addToCart, removeFromCart, updateQuantity, loading, error}}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => {
    return useContext(CartContext);
}
