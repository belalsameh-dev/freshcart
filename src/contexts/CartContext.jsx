import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext();
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();
  const headers = { token };

  function normalizeCart(res) {
    const data = res.data.data;
    setCart(data);
    setCartCounter(
      data.products.reduce((sum, product) => sum + product.count, 0)
    );
  }

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        normalizeCart(res);
        setCartId(res.data.cartId);
        return res;
      })
      .catch((err) => err);
  }

  function fetchCart() {
    setIsLoading(true);
    return getLoggedUserCart().finally(() => setIsLoading(false));
  }

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((res) => {
        normalizeCart(res);
        return res;
      })
      .catch((err) => err);
  }

  function updateCartItemQuantity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((res) => {
        normalizeCart(res);
        return res;
      })
      .catch((err) => err);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        normalizeCart(res);
        return res;
      })
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setCart({
          products: [],
          totalCartPrice: 0,
        });
        setCartCounter(0);
        return res;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        isLoading,
        cart,
        cartCounter,
        cartId,
        fetchCart,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        setCartCounter
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
export default CartProvider;
