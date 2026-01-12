import { Puff } from "react-loader-spinner";
import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <Puff
        visible={true}
        height="100"
        width="100"
        color="#0aad0a"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default LoadingScreen;
