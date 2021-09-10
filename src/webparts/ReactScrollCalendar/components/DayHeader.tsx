
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";

export interface IDayHeaderProps {
  days: any[];
}

export default function DayHeader(props:any) {
    //THIS IS THE WEEKDAY HEADER IT DOES NOTHING ITS JUST SOME DIVS WITH TEXT
    //return (<div className={styles.dayname} data-dayno={props.index}>{props.thisday}</div>);

return(
<div className={styles.calendarheader}>
  {props.days.map((dayname :string, i :number) => (
    <div className={styles.dayname} data-dayno={i}>{dayname}</div>
  ))}
</div>);
}
