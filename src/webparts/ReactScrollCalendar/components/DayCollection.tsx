import * as React from "react";
import * as moment from "moment";
import styles from './ReactScrollCalendar.module.scss';
import DayCell from './DayCell';
import { useEffect } from 'react';

// note this any[] trick if it worked then it will be useful
export interface IDayCollectionProps {
  days: any[];
  refDate:string;
}

export default function DayCollection(props:any) {

  useEffect(() =>{
    const currentMonth = moment().month();
    const monthRef = `MonthClicker${currentMonth}`;
    console.log("ONCE for ID:"+ monthRef);
    //document.getElementById(monthRef);
  },[]);
  // this is a component to load the "scroller container and fill it with days
  // the use effect kicks in one uts built out and clicke the navigation (once i hope)

  return (
    <div className={styles.calendarScrollContainer} id='scrollcontainer'>
      <div className={styles.daysContainer} id='dayscontainer'>
        {props.days.map((day, i) => (
          <DayCell refDate={props.refDate} index={i} key={i} Events={day.Events} Overlay={day.Overlay} />
        ))}
      </div>
    </div>
  );
}




