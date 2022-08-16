import { AppRoutes } from "./../src/routes";
import { GlobalStyle } from "../src/styles/GlobalStyle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main>
      <GlobalStyle />
      <AppRoutes />
      <ToastContainer />
    </main>
  );
}

export default App;
