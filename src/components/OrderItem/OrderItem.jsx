import "./OrderItem.css";

function OrderItem({ order }) {
  const {
    id: orderId,
    createdAt: date,
    totalOrderPrice: total,
    paymentMethodType: method,
    cartItems,
  } = order;

  const formattedDate = new Date(date).toLocaleString("en-US", {
    timeZone: "Egypt",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="order-item bg-body-tertiary p-4">
      <div className="order-info">
        <div>
          <span>Order ID</span>
          <strong>{`#${orderId}`}</strong>
        </div>
        <div>
          <span>Date</span>
          <strong>{formattedDate}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>
            {total} EGP
            <span className={`order-method ${method}`}>{method}</span>
          </strong>
        </div>
      </div>
      <div className="order-details">
        {cartItems.map((item) => (         
          <div key={item._id} className="item">
            <div className="border p-2">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-100"
              />
              <h6 className="text-center pt-2 small fw-bolder">
                {item.product.title.split(" ").slice(0, 2).join(" ")}
              </h6>
              <p className="small m-0">
                <span className="text-main">Quantity:</span> {item.count}
              </p>
              <p className="small m-0">
                <span className="text-main">Price:</span> {item.price} EGP
              </p>
              <p className="small m-0">
                <span className="text-main">Total:</span>{" "}
                {item.price * item.count} EGP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItem;
