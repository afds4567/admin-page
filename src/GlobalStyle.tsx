import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    font-size: 1.6rem;
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }

  input {
    border: none;
    outline: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export default GlobalStyle;
