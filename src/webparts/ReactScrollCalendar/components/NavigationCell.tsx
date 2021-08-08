
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import {Link} from 'react-scroll';
import * as moment from "moment";

// Note
export interface INavigationCellProps {
  thismonth: string;
  index: number;
}

// note all of the logic relatign to Props sits inside the function thats what has the props
// other logic CAN sit outside,
const NavigationCell: React.FunctionComponent<INavigationCellProps> = (props) => {
      // note the use of the conditional class name based on data may not be needed

      // OK lets get the week number for this Month (index-1) it all fits on one line but shoudl it ?
      // get the start of the year then move to the start of the month we are drawign then find its week number
      // that gives us a clue as to the ID of the day cell for that week
      const wkdate = moment().startOf('year').add(props.index,'months');
      const scrollTargetId = `w${wkdate.week()}d${wkdate.weekday()}`;
      console.log(scrollTargetId);

      return (
        <li data-month={props.index}>
            <Link className={styles.monthname } containerId='scrollcontainer' activeClass={styles.activemonthname} to={scrollTargetId} spy={true} smooth={true}>
          {props.thismonth}</Link>
        </li>
      );
};

export default NavigationCell;


