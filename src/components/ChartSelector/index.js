import React from "react";
import { SelectorSection, DateDiv, DateInput, DateLabel } from "./SelectorElements"

const Selector = () => {

  // selector section for charts
  // it provides the date input module

  return (
    <>
      <SelectorSection>
        <DateDiv>
          <DateLabel>Start Date:</DateLabel><br></br>
          <DateInput type={'date'} id='start' style={{marginBottom: '5px'}}></DateInput><br></br>
          <DateLabel>End Date:</DateLabel><br></br>
          <DateInput type={'date'} id='end'></DateInput><br></br>
        </DateDiv>
        <br></br>
      </SelectorSection>
    </>
  );
};

export default Selector;