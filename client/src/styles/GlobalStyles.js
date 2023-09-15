import { createGlobalStyle } from "styled-components"
const GlobalStyles = createGlobalStyle`
  &:root{
    // 
    --bp-tabland:75em;
    /* Box shadow */
    --shadow :0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-sm : 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md :  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg :0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) ;
    --shadow-xl :0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) ;
    /* Orange */
    --color-orange-50:rgb(255 247 237) ;
    --color-orange-100: rgb(255 237 213) ;
    --color-orange-200:rgb(254 215 170) ;
    --color-orange-300:  rgb(253 186 116);
    --color-orange-400:rgb(251 146 60) ;
    --color-orange-500: rgb(249 115 22);
    --color-orange-600:rgb(234 88 12) ;
    --color-orange-700: rgb(194 65 12);
    --color-orange-800:rgb(154 52 18) ;
    --color-orange-900: rgb(124 45 18) ;
    --color-orange-950: rgb(67 20 7) ;
    /* Grey */
    --color-grey-50:rgb(249 250 251) ;
    --color-grey-100: rgb(243 244 246) ;
    --color-grey-200:rgb(229 231 235) ;
    --color-grey-300:rgb(209 213 219)  ;
    --color-grey-400: rgb(156 163 175);
    --color-grey-500: rgb(107 114 128);
    --color-grey-600:rgb(75 85 99);
    --color-grey-700:rgb(55 65 81);
    --color-grey-800:rgb(31 41 55);
    --color-grey-900: rgb(17 24 39);
    --color-grey-950:  rgb(3 7 18);
    /* White */
    --color-white : #FFF;
    /* Red */
    --color-red-50: rgb(254 242 242) ;
    --color-red-100: rgb(254 226 226);
    --color-red-200:rgb(254 202 202);
    --color-red-300:rgb(252 165 165)  ;
    --color-red-400: rgb(248 113 113);
    --color-red-500: rgb(239 68 68);
    --color-red-600: rgb(220 38 38);
    --color-red-700: rgb(185 28 28);
    --color-red-800:rgb(153 27 27);
    --color-red-900:  rgb(127 29 29);
    --color-red-950:  rgb(69 10 10);
    /* Blue */
    --color-blue-50: rgb(239 246 255);
    --color-blue-100: rgb(219 234 254);
    --color-blue-200:rgb(191 219 254);
    --color-blue-300:rgb(147 197 253) ;
    --color-blue-400:rgb(96 165 250);
    --color-blue-500: rgb(59 130 246);
    --color-blue-600: rgb(37 99 235);
    --color-blue-700: rgb(29 78 216);
    --color-blue-800: rgb(30 64 175);
    --color-blue-900:  rgb(30 58 138);
    --color-blue-950:  rgb(23 37 84);
  }
.ql-toolbar {
  background-color: var(--color-grey-100);
  border: none !important;

  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
  display:flex;
  justify-content: center;
}
.ql-toolbar button {
  transform: scale(1.15);
}
.ql-header{
  font-size: 1.7rem !important;
  font-weight: 500 !important;
}
.ql-container{
  border: none !important;
  /* background-color: var(--color-grey-50); */
  /* padding: 1rem 0; */
}
.ql-editor::placeholder {
  /* Your styles here */
  color: #999; /* Change the color */
  font-style: italic; //Add italics, for example
  color: red !important;
}
.ql-editor {
  border: none !important;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color:var(--color-grey-600);
  font-size: 2rem;
  font-size: 1.8rem;
  & * img{
    width: 15rem;
    display:block;
    margin:2px 0 ;
  }
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
    // 75em = 1200px
    // 56.25em = 800px
    // 37.5em = 600
    @media screen and (max-width:75em) {
      font-size: 56.25%;
    }
    @media screen and (max-width:56.25em) {
      font-size: 50%;
    }
    @media screen and (max-width:37.5em) {
      font-size: 43.75%;
    }
  }

  body {
    /* font-family: "Poppins", sans-serif; */
    font-family: 'Poppins', sans-serif;
    color: var(--color-grey-700);

    transition: color 0.3s, background-color 0.3s;
    /* min-height: 100vh; */
    line-height: 1.5;
    font-size: 1.6rem;
    /* padding: 0 3rem; */
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-orange-400);
    outline-offset: -1px;
  }

  /* Parent selector, finally 😃 */
  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;

    /* For dark mode */
    /* filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity)); */
  }
`
export default GlobalStyles
