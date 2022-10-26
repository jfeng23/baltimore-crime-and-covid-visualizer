import React from "react";
import { SelectorSection, SelectorTitle } from "./SelectorElements"
  
const Selector = () => {
  return (
    <>
      <SelectorSection>
        <SelectorTitle>Selector</SelectorTitle>
        <SelectorButton>Crime</SelectorButton>
        <SelectorButton>Assault</SelectorButton>
        <SelectorButton>Homicide</SelectorButton>
        <SelectorButton>Armed Robbery</SelectorButton>
        <SelectorButton>Theft</SelectorButton>
        <SelectorButton>COVID-19</SelectorButton>
      </SelectorSection>
    </>
  );
};
  
export default Selector;