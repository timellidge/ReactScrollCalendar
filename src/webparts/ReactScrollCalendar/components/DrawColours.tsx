import * as React from "react";
import styles from './ReactScrollCalendar.module.scss';

// we will map the coty to the colour
export interface IDrawColoursProps {
  colourName: string;
  cityName:string;
}

export default function DrawColours(props:any) {
  // just display stuff - no calculations nothign special i think i thhink thsi is needed to do the calculation i dont know enough to do it in line
  const theColour:string = `var(--${props.colourName})`;
  return (
   <h5><div style={{backgroundColor: theColour,  width: "12px", height:"12px", borderRadius: "25%", display:"inline-block", verticalAlign: "middle",margin:"3px"}} ></div> {props.cityName} </h5>
  );
}
