import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./contexts/AuthContext";
// import CartProvider from "./contexts/CartContext";
// import WishProvider from "./contexts/WishContext";

const queryClient = new QueryClient();
function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <CartProvider> */}
          {/* <WishProvider> */}
            {children}
            {/* </WishProvider> */}
        {/* </CartProvider> */}
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
