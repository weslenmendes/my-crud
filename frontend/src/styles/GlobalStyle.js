import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    background-color: #2f3640;
  }
`;
