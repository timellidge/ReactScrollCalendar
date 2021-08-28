
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import {Link} from 'react-scroll';
import * as moment from "moment";

// Note
export interface INavigationCellProps {
  thismonth: string;
  index: number;
}

// note all of the logic relating to Props sits inside the function that generates them
// other logic CAN sit outside,
export default function NavigationCell(props:any) {

      // OK lets get the week number for this Month (index-1) it all fits on one line but shoudl it ?
      const wkdate = moment().startOf('year').add(props.index,'months');

      // This is poor as i duplicate the code here to generate the ID for the first of the month
      // but its fairly simple stuff so im not that bothered
      // I need to attach it to the react scroll component so i know where to scroll to
      const scrollTargetId = `w${wkdate.week()}d${wkdate.weekday()}`;
      const monthRef = `MonthClicker${props.index}`;
      //console.log(scrollTargetId);
      // use the react <Link> Component tell it what its goignt to scroll in and as ive explained where to scroll to
      return (
        <li data-month={props.index}>
            <Link className={styles.monthname } id={monthRef} containerId='scrollcontainer' activeClass={styles.activemonthname} to={scrollTargetId} spy={true} smooth={true}>
          {props.thismonth}</Link>
        </li>
      );
}



