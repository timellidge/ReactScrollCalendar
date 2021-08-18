
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from 'moment';
import EventCell from './EventCell';

// note this any[] trick if it worked then it will be useful
export interface IDayCellProps {
  thisdate: string;
  index: number;
  firsts: any[];
  holiday: any[];
  events: any[];
}

const DayCell: React.FunctionComponent<IDayCellProps> = (props) => {
  // how do i get the iteration of the called array into here ? ie the index or key?
  const theDay = moment(props.thisdate);
  const items = props.events;
  const firsts = props.firsts;
  // console.log(theDay);
  // console.log(items);
  const theID = 'w' + theDay.week() + 'd' + theDay.weekday();
  return (
    <div className={styles.day} id={theID} data-date={theDay.date()} data-month={theDay.month() + 1}>
      <h5>{theDay.format('MMM D')}</h5>
          {firsts.map((item, i) => (
            <EventCell key = {i} thistitle= {item.Title} thiscolor = "" thisicon = "" irow={item.irow} index={i}/>
          ))}
          {items.map((item, i) => (
            <EventCell key = {i} thistitle= "" thiscolor = "" thisicon = "" irow={item.irow} index={i}/>
          ))}
          {props.holiday.length != 0 ?  <div className={styles.placeholder}>Office Closed</div> : ""}
    </div>
  );
};

export default DayCell;


