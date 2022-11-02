import React from "react";
import { SelectorSection, SelectorTitle, SelectorButton } from "./SelectorElements"
  
const Selector = () => {
  return (
    <>
      <SelectorSection>
<<<<<<< Updated upstream
        <SelectorTitle>Filters:</SelectorTitle>
        <SelectorButton>COVID-19</SelectorButton>
=======
        <SelectorTitle>Select Data Set</SelectorTitle>
>>>>>>> Stashed changes
        <SelectorButton>Crime</SelectorButton>
        <SelectorButton>Assault</SelectorButton>
        <SelectorButton>Homicide</SelectorButton>
        <SelectorButton>Armed Robbery</SelectorButton>
        <SelectorButton>Theft</SelectorButton>
<<<<<<< Updated upstream
=======
        <SelectorButton>COVID-19</SelectorButton>

        <br></br>
        <DateDiv>
          <DateLabel>Start Date:</DateLabel><br></br>
          <DateInput type={'date'} style={{marginBottom: '5px'}}></DateInput><br></br>
          <DateLabel>End Date:</DateLabel><br></br>
          <DateInput type={'date'}></DateInput><br></br>
          <DateButton>Submit</DateButton>
        </DateDiv>

>>>>>>> Stashed changes
      </SelectorSection>
    </>
  );
};
  
export default Selector;