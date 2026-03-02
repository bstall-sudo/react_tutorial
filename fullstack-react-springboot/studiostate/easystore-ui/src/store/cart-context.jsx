import { createContext, useEffect, useContext, useReducer } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const ADD_MERCH = "ADD_MERCH";
const ADD_FIRING = "ADD_FIRING";
const ADD_STUDIOTIME = "ADD_STUDIOTIME";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_MERCH_QTY = "UPDATE_MERCH_QTY";
const UPDATE_FIRING_WEIGHT = "UPDATE_FIRING_WEIGHT";
const UPDATE_FIRING_PHOTO = "UPDATE_FIRING_PHOTO";
const CLEAR_CART = "CLEAR_CART";

const generateCartItemId = () => {
  // simple unique id (reicht für local)
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const cartReducer = (prevCart, action) => {
  switch (action.type) {
    case ADD_MERCH: {
      const { product, quantity } = action.payload;

      const existingItem = prevCart.find(
        (item) => item.productId === product.productId && item.type === "MERCH",
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === existingItem.cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          type: "MERCH",
          cartItemId: generateCartItemId(),
          quantity,
        },
      ];
    }

    case ADD_FIRING: {
      const { product, weight, photo } = action.payload;

      // IMMER neue Zeile
      return [
        ...prevCart,
        {
          ...product,
          type: "FIRING",
          cartItemId: generateCartItemId(),
          weight, // grams
          photo: photo || null, // später
        },
      ];
    }

    case ADD_STUDIOTIME: {
      const { userName, startDateTime, endDateTime, sessionId, passId } =
        action.payload;

      // IMMER neue Zeile
      return [
        ...prevCart,
        {
          ...userName,
          type: "STUDIOTIME",
          cartItemId: generateCartItemId(),
          startDateTime,
          endDateTime,
          sessionId,
          passId,
        },
      ];
    }

    case UPDATE_MERCH_QTY: {
      const { cartItemId, quantity } = action.payload;
      return prevCart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      );
    }

    case UPDATE_FIRING_WEIGHT: {
      const { cartItemId, weight } = action.payload;
      return prevCart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, weight: Math.max(1, weight) }
          : item,
      );
    }

    case UPDATE_FIRING_PHOTO: {
      const { cartItemId, photo } = action.payload;
      return prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, photo } : item,
      );
    }

    case REMOVE_ITEM: {
      const { cartItemId } = action.payload;
      return prevCart.filter((item) => item.cartItemId !== cartItemId);
    }

    case CLEAR_CART:
      return [];

    default:
      return prevCart;
  }
};

export const CartProvider = ({ children }) => {
  const initialCartState = (() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse cart:", e);
      return [];
    }
  })();

  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart:", e);
    }
  }, [cart]);

  // Public API (das nutzt du in Components)
  const addMerchToCart = (product, quantity) => {
    dispatch({ type: ADD_MERCH, payload: { product, quantity } });
  };

  const addFiringToCart = (product, weight, photo = null) => {
    dispatch({ type: ADD_FIRING, payload: { product, weight, photo } });
  };

  const addStudioTimeToCart = (userName, startDateTime, endDateTime) => {
    dispatch({
      type: ADD_STUDIOTIME,
      payload: { userName, startDateTime, endDateTime },
    });
  };

  const removeItem = (cartItemId) => {
    dispatch({ type: REMOVE_ITEM, payload: { cartItemId } });
  };

  const updateMerchQty = (cartItemId, quantity) => {
    dispatch({ type: UPDATE_MERCH_QTY, payload: { cartItemId, quantity } });
  };

  const updateFiringWeight = (cartItemId, weight) => {
    dispatch({ type: UPDATE_FIRING_WEIGHT, payload: { cartItemId, weight } });
  };

  const updateFiringPhoto = (cartItemId, photo) => {
    dispatch({ type: UPDATE_FIRING_PHOTO, payload: { cartItemId, photo } });
  };

  const clearCart = () => dispatch({ type: CLEAR_CART });

  const totalQuantity = cart.reduce((acc, item) => {
    if (item.type === "MERCH") return acc + (item.quantity || 0);
    if (item.type === "FIRING") return acc + 1;
    if (item.type === "STUDIOTIME") return acc + 1;
    return acc;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addMerchToCart,
        addFiringToCart,
        addStudioTimeToCart,
        removeItem,
        updateMerchQty,
        updateFiringWeight,
        updateFiringPhoto,
        clearCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
