import styled from "styled-components";

export const SelectorSection = styled.div`
    margin: 10px;
    padding: 10px;
    background: lightgrey;
    height: 100vh;
    border: 3px solid #0909FF;
    border-radius: 10px;
`;

export const SelectorTitle = styled.label`
    font-size: 3em;
    color: #333333;
    display: block;
    padding: 5px;
    text-align: center;
    font-family: Comic Sans MS;
    border: 3px solid #8989FF;
    border-radius: 8px;
    background-color: white;
    margin-bottom: 5px;
`;

export const SelectorButton = styled.button`
    box-shadow:inset 0px 1px 0px 0px #dcecfb;
    background:linear-gradient(to bottom, #bddbfa 5%, #80b5ea 100%);
    background-color:#bddbfa;
    border-radius:6px;
    border:1px solid #84bbf3;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family: Comic Sans MS;
    font-size:20px;
    font-weight:bold;
    width: 99%;
    margin: 1%;
    padding: 10px;
    text-decoration:none;
    text-shadow:0px 1px 0px #528ecc;
    &:hover {
        background:linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
	    background-color:#80b5ea;
    }
    &:active {
        position:relative;
        top:1px;
    }
`;

export const DateDiv = styled.div`
    font-size: 2em;
    color: #333333;
    display: block;
    padding: 5px;
    padding-bottom: 10px;
    font-family: Comic Sans MS;
    border: 3px solid #8989FF;
    border-radius: 8px;
    background-color: white;
    margin-bottom: 5px; 
`;

export const DateLabel = styled.label`
    
`;

export const DateInput = styled.input`
    width: 50%;
`;

export const DateButton = styled.button`
    font-family: Comic Sans MS;
    width: 25%;
    margin-left: 5px;
`;