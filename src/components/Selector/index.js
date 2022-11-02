import React from "react";
import { SelectorSection, SelectorTitle, SelectorButton } from "./SelectorElements"
  
const Selector = () => {
  return (
    <>
      <SelectorSection>
        <SelectorTitle>Filters:</SelectorTitle>
        <SelectorButton>COVID-19</SelectorButton>
        <SelectorButton>Crime</SelectorButton>
        <SelectorButton>Assault</SelectorButton>
        <SelectorButton>Homicide</SelectorButton>
        <SelectorButton>Armed Robbery</SelectorButton>
        <SelectorButton>Theft</SelectorButton>
      </SelectorSection>
    </>
  );
};
  
export default Selector;