import styled from "styled-components";

export const SelectorSection = styled.div`
    padding: 10px;
    background: #a3a3c2;
    height: 98vh;
    font-family: Verdana;
`;

export const SelectorTitle = styled.label`
    font-size: 1.7em;
    display: block;
    padding: 5px;
    text-align: left;
    color: white;
    margin-bottom: 5px;
`;

export const SelectorButton = styled.button`
    box-shadow:inset 0px 1px 3px 0px #91b8b3;
	background-color: #666699;
    width: 100%;
	border-radius:5px;
	border:1px solid #566963;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-size:1.4em;
    margin: 2px;
	padding:11px 23px;
	text-decoration:none;
	text-shadow:0px -1px 0px #2b665e;
    &:hover {
	    background-color:#5c5c8a;
    }
    &:active {
        position:relative;
        top:1px;
    }
`;

export const DateDiv = styled.div`
    font-size: 1.4em;
    display: block;
    color: white;
    padding: 5px;
`;

export const DateLabel = styled.label`
    padding-left: 5px;
`;

export const DateInput = styled.input`
    width: 50%;
    height: 30px;
`;