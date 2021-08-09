
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from 'moment';
import EventCell from './EventCell';
import { getItemClassNames } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames';

// note this any[] trick if it worked then it will be useful
export interface IDayCellProps {
  thisdate: string;
  index: number;
  events: any[];
}

const DayCell: React.FunctionComponent<IDayCellProps> = (props) => {
  // how do i get the iteration of the called array into here ? ie the index or key?
  const theDay = moment(props.thisdate);
  const items = props.events;
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


