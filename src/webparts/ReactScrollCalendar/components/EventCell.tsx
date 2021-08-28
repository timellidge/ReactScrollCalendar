
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getInitials } from '../../Utils';

//  <EventCell key = {i} thistitle= {item.Title} thiscolor = {item.Location} thisicon = {item.Category} irow={item.Manager} index={i}/>

export interface IEventCellProps {
  thisTitle: string;
  thisLocation: string;
  thisManager: string;
  thisNote: string;
  thisEventType: string;
  thisIcon: string;
  thisColor: string;
  thisIsFirst: boolean;
  thisIsLast: boolean;
  iRow: number;
  index: number;
}

export default function EventCell(props: any) {
  //console.log(props); //there shoufl be no office events s suh we weeded them out highter up the tree
  // look at this conditionally adding two classes on render
  //return (<div className={styles.event + " " + (props.thisIsFirst ? styles.first : "")} data-row={props.iRow}> {props.thisTitle}</div>);
  const initials = getInitials(props.thisManager);

  //each event can have up to three elements a start a middle and an end
  // use the booleans passed down from the app to conditionllay deisplay stuff
  // const inLineStyle = {"background-color" : props.thisColor}; - HOW NOT TO DO IT !!!
  //~ DO THIS INSTEAD const inLineStyle = {borderColor: props.thisColor};
  // lets work out a colour based on location and type of event
  // the company colours all come in three variants -1 (darker) "" the colour and "1" lighter ie red-1 red and red1
  // so ill use the Holiday / work to set that
  const modifier = props.thisEventType === "Working"? "": "-1";
  const eventColor : string = `var(--${props.thisColor}${modifier})`;


  return (<div className={styles.event} data-row={props.iRow} title={props.thisManager + " " + props.thisLocation}>
    <div className={ styles.eventguts } style={{borderColor: eventColor}}>
      <div className={styles.line}></div>
      {props.thisIsFirst? <div className={styles.first}><FontAwesomeIcon icon={['fad', props.thisIcon]} /> {initials}</div>: "" }
      {props.thisIsLast?  <div className={styles.end}></div> : "" }
    </div>
  </div>);

}
