
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from 'moment';
import EventCell from './EventCell';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';

export interface IDayCellProps {
  thisdate: string;
  index: number;
}

// PRETEND DATA
const diaryItems = [
  {"start":"2021/02/03", "end":"2021/02/08", "Title":"Item1", "irow":"row1"},
  {"start":"2021/02/05", "end":"2021/02/18", "Title":"Item2", "irow":"row2"},
  {"start":"2021/02/07", "end":"2021/02/18", "Title":"Item3", "irow":"row3"},
  {"start":"2021/03/03", "end":"2021/03/08", "Title":"Item4", "irow":"row4"}
]


const DayCell: React.FunctionComponent<IDayCellProps> = (props) => {
  // how do i get the iteration of the called array into here ? ie the index or key?
  const theDay = moment(props.thisdate);
  const items = diaryItems.filter(ditem => (theDay >= moment(ditem.start) && theDay <= moment(ditem.end) ));
  console.log(theDay);
  console.log(items);
  const theID = 'w' + theDay.week() + 'd' + theDay.weekday();
  return (
    <div className={styles.day} id={theID} data-date={theDay.date()} data-month={theDay.month() + 1}>
      <h5>{theDay.format('MMM D')}</h5>
          {items.map((item, i) => (
            <EventCell key = {i} thistitle= {item.Title} thiscolor = "" thisicon = "" irow={item.irow} index={i}/>
          ))}
    </div>
  );
};

export default DayCell;


