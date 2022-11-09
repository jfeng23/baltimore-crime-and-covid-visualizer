import React from "react";
import { SelectorSection, SelectorTitle, SelectorButton, DateButton, DateDiv, DateInput, DateLabel } from "./SelectorElements"

const Selector = () => {

  return (
    <>
      <SelectorSection>
        <SelectorTitle>Select Data Set</SelectorTitle>
        <SelectorButton id="crime">Crime</SelectorButton>
        <SelectorButton id="assault">Assault</SelectorButton>
        <SelectorButton id="homicide">Homicide</SelectorButton>
        <SelectorButton id="robbery">Armed Robbery</SelectorButton>
        <SelectorButton id="theft">Theft</SelectorButton>
        <SelectorButton id="covid">COVID-19</SelectorButton>

        <br></br>
        <DateDiv>
          <DateLabel>Start Date:</DateLabel><br></br>
          <DateInput type={'date'} id='start' style={{marginBottom: '5px'}}></DateInput><br></br>
          <DateLabel>End Date:</DateLabel><br></br>
          <DateInput type={'date'} id='end'></DateInput><br></br>
          <DateButton>Submit</DateButton>
        </DateDiv>

      </SelectorSection>
    </>
  );
};

export default Selector;