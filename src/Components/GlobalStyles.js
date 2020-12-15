import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration:none;
        color:inherit;
        &:hover{
            text-decoration:none;
            color:inherit;
        }
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:12px;
        background-color:#253235;
        color:white;
        height:100%;
    }
    #root{
        height:100%;
    }
    ::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #555;
        background-clip: padding-box;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: white;
        border-radius: 5px;
    }
`;

export default globalStyles;
