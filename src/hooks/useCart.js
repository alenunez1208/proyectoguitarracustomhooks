import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
    const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data, setData] = useState([]);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
    setData(db);
    }, []);

    useEffect(() => {
    handleSaveLocalStorage();
    }, [cart]);

    const handleAddCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
        if (cart[itemExist].cantidad >= MAX_ITEMS) return;

        const updateCart = [...cart];
        updateCart[itemExist].cantidad++;
        setCart(updateCart);
    } else {
        item.cantidad = 1;
        setCart([...cart, item]);
    }
    };

    const handleRemoveItemCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    };

    const handleAddCantidad = (id) => {
    const updateCart = cart.map((item) => {
        if (item.id === id && item.cantidad < MAX_ITEMS) {
        return { ...item, cantidad: item.cantidad + 1 };
        }

        return item;
    });

    setCart(updateCart);
    };

    const handleRemoveCantidad = (id) => {
    const updateCart = cart.map((item) => {
        if (item.id === id && item.cantidad > MIN_ITEMS) {
        return { ...item, cantidad: item.cantidad - 1 };
        }

        return item;
    });

    setCart(updateCart);
    };

    const handleClearCart = () => {
    setCart([]);
    };

    const handleSaveLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.cantidad * item.price, 0),
    [cart]
  );

    return {
        data,
        cart,
        handleAddCart,
        handleRemoveItemCart,
        handleAddCantidad,
        handleRemoveCantidad,
        handleClearCart,
        isEmpty,
        cartTotal
    }
}