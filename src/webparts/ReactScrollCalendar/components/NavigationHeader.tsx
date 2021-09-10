
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import {Link} from 'react-scroll';
import * as moment from "moment";
import NavigationCell  from "./NavigationCell";

// Note
export interface INavigationHeaderProps {
  months: string;
}

// note all of the logic relating to Props sits inside the function that generates them
// other logic CAN sit outside,
export default function NavigationHeader(props:any) {
  // use the react <Link> Component tell it what its goignt to scroll in and as ive explained where to scroll to
  return (
    <div className={styles.navigationheader}>
      <ul>
        {this.monthNames.map((monthName, i) => (
          <NavigationCell key={i} month={monthName} index={i} />
        ))}
      </ul>
    </div>
  );
}



