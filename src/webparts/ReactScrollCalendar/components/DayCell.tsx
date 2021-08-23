
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from 'moment';
import EventCell from './EventCell';

// note this any[] trick if it worked then it will be useful
export interface IDayCellProps {
  refDate: string;
  index: number;
  Events: any[];
}

export default function DayCell(props:any) {
  const theDay = moment(props.refDate).add(props.index, 'days').startOf('day');
  // now work out an ID for the objects css its a meaningful ID
  const theID = 'w' + theDay.week() + 'd' + theDay.weekday();
  return (
    <div className={styles.day} id={theID} data-date={theDay.date()} data-month={theDay.month() + 1}>
      <h5>{theDay.format('MMM D')}</h5>
          {props.Events.map((item, i) => (
            <EventCell key = {i}
            thisTitle= {item.Title}
            thisLocation={item.Location}
            thisManager = {item.Manager}
            thisNote = {item.Note}
            thisEventType = {item.EventType}
            thisIcon = {item.Icon}
            thisColor = {item.Colour}
            thisIsFirst = {item.FirstDay}
            iRow={item.Row}
            index={i}/>
          ))}
    </div>
  );
}




