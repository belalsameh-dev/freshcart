import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth.js";
import "./Orders.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import OrderItem from "../../components/OrderItem/OrderItem.jsx";

function Orders() {
  const { token } = useAuth();
  const { id: userId } = jwtDecode(token);

  function getAllOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
  const { data: allOrders, isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
    select: (res) => [...res.data].reverse(),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="orders container">
      <h1 className="section-title">Orders</h1>
      <div className="orders-list">
        {allOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}

export default Orders;
