import { allProducts } from "../assets/data";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [allItems, setAllItems] = useState([]);

    const setItems = () => {
        setAllItems(allProducts);
    }

    return (
        <CartContext.Provider value={{allItems, setItems}}>
            {children}
        </CartContext.Provider>
    );
}


export const useCart = () => {
    return useContext(CartContext);
}
