import { useContext } from "react";
import { WishContext } from "../contexts/WishContext";

export const useWish = () => useContext(WishContext);
