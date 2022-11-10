import React from "react";
import { SelectorSection, SelectorTitle, SelectorButton, DateDiv, DateInput, DateLabel } from "./SelectorElements"

const Selector = () => {

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
        <SelectorTitle>Select Data Set</SelectorTitle>
        <SelectorButton id="covid">COVID-19</SelectorButton>
        <SelectorButton id="commonAssault">Common Assault</SelectorButton>
        <SelectorButton id="larceny">Larceny</SelectorButton>
        <SelectorButton id="homicide">Homicide</SelectorButton>
        <SelectorButton id="burglary">Burglary</SelectorButton>
        <SelectorButton id="rape">Rape</SelectorButton>
        <SelectorButton id="autoTheft">Auto Theft</SelectorButton>
        <SelectorButton id="shooting">Shooting</SelectorButton>
        <SelectorButton id="aggAssault">Aggrevated Assault</SelectorButton>
        <SelectorButton id="autoLarceny">Auto Larceny</SelectorButton>
        <SelectorButton id="carJacking">Car Jacking</SelectorButton>

      </SelectorSection>
    </>
  );
};

export default Selector;