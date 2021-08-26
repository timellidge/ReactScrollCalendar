
import styles from './ReactScrollCalendar.module.scss';
import * as React  from 'react';
import * as moment from 'moment';
import EventCell from './EventCell';

// note this any[] trick if it worked then it will be useful
export interface IDayCellProps {
  refDate: string;
  index: number;
  Events: any[];
  Overlay:string;
}

export default function DayCell(props:any) {
  const theDay = moment(props.refDate).add(props.index, 'days').startOf('day');
  // now work out an ID for the object css its a meaningful ID and i use it for scrolling
  // and for decorating the page with weekends and month starts etc
  // it is a X Y week no = row and day = column
  // also only show the month on the first day of the month (MMM D) as opposed to (D)
  // some conditionality needed to decide what to show in terns, of a day with events
  // and one with an overlay or just an ordinary day - note overlay is rendered last On top of the events
  // console.log(props);
  const theID = 'w' + theDay.week() + 'd' + theDay.weekday();
  return (
    <div className={styles.day} id={theID} data-date={theDay.date()} data-month={theDay.month() + 1}>
      <h5>{theDay.date() === 1? theDay.format('MMM D') : theDay.format('D')}</h5>
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
          thisIsLast = {item.LastDay}
          iRow={item.Row}
          index={i}/>
      ))}
      {props.Overlay > "" ?  <div className={styles.overlay}><div>{props.Overlay}</div></div> : ""}
    </div>
  );
}




