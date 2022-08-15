import { AppRoutes } from "./../src/routes";
import { GlobalStyle } from "../src/styles/GlobalStyle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
