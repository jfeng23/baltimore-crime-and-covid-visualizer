import React from "react";
import { SelectorSection, SelectorTitle, SelectorButton, DateInput, DateButton, DateLabel, DateDiv } from "./SelectorElements"
  
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

        <DateDiv>
          <DateLabel>Start Date:</DateLabel>
          <DateInput type={'date'}></DateInput>
          <DateLabel>End Date:</DateLabel>
          <DateInput type={'date'}></DateInput>
          <DateButton>Submit</DateButton>
        </DateDiv>

      </SelectorSection>
    </>
  );
};
  
export default Selector;