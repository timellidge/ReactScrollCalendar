
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import { PeoplePickerItemSuggestion } from '@fluentui/react';

//  <EventCell key = {i} thistitle= {item.Title} thiscolor = {item.Location} thisicon = {item.Category} irow={item.Manager} index={i}/>

export interface IEventCellProps {
  thisTitle:    string;
  thisLocation: string;
  thisManager:  string;
  thisNote:     string;
  thisEventType:string;
  thisIcon:     string;
  thisColor:    string;
  thisIsFirst:  boolean;
  iRow:         number;
  index:        number;
}

export default function EventCell(props:any) {
    console.log(props);
    // look at this conditionally adding two classes on render
    //return (<div className={styles.event + " " + (props.thisIsFirst ? styles.first : "")} data-row={props.iRow}> {props.thisTitle}</div>);

// ther aee two diffent ypes of thisngs to render based onthe first thing
if(props.thisIsFirst){
  return (<div className={styles.event + " " + styles.first} data-row={props.iRow}> {props.thisManager}</div>);
} else {}
  return (<div className={styles.event} data-row={props.iRow} title={props.Manager + " " + props.thisLocation}></div>);
}



