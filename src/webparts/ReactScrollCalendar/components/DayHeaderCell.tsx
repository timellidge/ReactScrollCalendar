
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";

export interface IDayHeaderCellProps {
  thisday: string;
  index: number;
}

export default function DayHeaderCell(props:any) {
    //THIS IS THE WEEKDAY HEADER IT DOES NOTHING ITS JUST SOME DIVS WITH TEXT
    return (<div className={styles.dayname} data-dayno={props.index}>{props.thisday}</div>);
}


