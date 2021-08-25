
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
  console.log(props); //there shoufl be no office events s suh we weeded them out highter up the tree
  // look at this conditionally adding two classes on render
  //return (<div className={styles.event + " " + (props.thisIsFirst ? styles.first : "")} data-row={props.iRow}> {props.thisTitle}</div>);
  const initials = getInitials(props.thisManager);

  // ther aee two diffent ypes of thisngs to render based onthe first thing
  // const inLineStyle = {"background-color" : props.thisColor};

  return (<div className={styles.event} data-row={props.iRow} title={props.thisManager + " " + props.thisLocation}>
    {props.thisIsLast?  <div className={styles.line}></div> :  <div className={styles.linefull}></div> }
    {props.thisIsFirst? <div className={styles.first}><FontAwesomeIcon icon={['fad', props.thisIcon]} /> {initials}</div>: "" }
    {props.thisIsLast?  <div className={styles.end}></div> : "" }
  </div>);

}
