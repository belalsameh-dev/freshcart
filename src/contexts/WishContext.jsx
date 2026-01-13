import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth.js";

const WishContext = createContext();
function WishProvider({ children }) {
  const [wish, setWish] = useState([]);
  const [wishCounter, setWishCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [wishIds, setWishIds] = useState(new Set());

  const { token } = useAuth();
  const headers = { token };

  function getLoggedUserWish() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => {
        setWish(res.data.data);
        setWishCounter(res.data.count);
        setWishIds(new Set(res.data.data.map((item) => item.id)));
        return res;
      })
      .catch((err) => err);
  }

  function fetchWish() {
    setIsLoading(true);
    return getLoggedUserWish().finally(() => setIsLoading(false));
  }

  function addProductToWish(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((res) => {
        setWishIds((prev) => new Set(prev).add(productId));
        setWishCounter((prev) => prev + 1);
        return res;
      })
      .catch((err) => err);
  }

  function removeProductFromWish(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => {
        setWish((prevWish) => prevWish.filter((item) => item.id !== productId));
        setWishIds((prev) => {
          const updated = new Set(prev);
          updated.delete(productId);
          return updated;
        });
        setWishCounter((prev) => prev - 1);
        return res;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserWish();
  }, []);

  return (
    <WishContext.Provider
      value={{
        isLoading,
        wish,
        wishIds,
        wishCounter,
        fetchWish,
        addProductToWish,
        removeProductFromWish,
        setWishCounter,
        getLoggedUserWish
      }}
    >
      {children}
    </WishContext.Provider>
  );
}

export { WishContext };
export default WishProvider;
