
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from 'moment';
import EventCell from './EventCell';

// note this any[] trick if it worked then it will be useful
export interface IDayCellProps {
  thisDate: string;
  index: number;
  events: any[];
}

export default function DayCell(props:any) {
  // how do i get the iteration of the called array into here ? ie the index or key?
  const theDay = moment(props.thisDate).add(props.index, 'days').startOf('day');
  // now work out an ID for the objects css
  const theID = 'w' + theDay.week() + 'd' + theDay.weekday();
  console.log(props.events);
  return (
    <div className={styles.day} id={theID} data-date={theDay.date()} data-month={theDay.month() + 1}>
      <h5>{theDay.format('MMM D')} {"5"}</h5>
          {/* {props.events.map((item, i) => (
            <EventCell key = {i} thistitle= "" thiscolor = "" thisicon = "" irow={item.irow} index={i}/>
          ))} */}
    </div>
  );
}




