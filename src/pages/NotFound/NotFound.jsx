import "./notFound.css";
import NotFoundImg from "../../assets/error.svg";

function NotFound() {
  return (
    <section className="not-found">
      <img src={NotFoundImg} alt="404 image" className="mb-3" />
      <h1 className="section-title">page not found</h1>
    </section>
  );
}

export default NotFound;
