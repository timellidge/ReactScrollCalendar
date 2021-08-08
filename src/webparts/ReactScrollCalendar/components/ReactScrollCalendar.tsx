import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from "moment";
import DayCell from './DayCell';
import DayHeaderCell from './DayHeaderCell';
import NavigationCell from './NavigationCell';
import IReactScrollCalendarProps from './IReactScrollCalendarProps';

//build soem data structures fro the react components to iterate over Days
const dayNames = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
dayNames.map((dayname, i) => (
 console.log(dayname, i)
));
// and Months  CBA with Yeas just yet
const monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

// do i need to explain this ? but its in the past at the start of the Year
const startdate = moment().startOf('year');
const days = new Array(730); // create an empty array with length 720 items Dont care whats in it
// now i need to populate the array with dates to go off into the future
for (let i = 0; i < 730; i++) {
  days[i] = moment(startdate).add(i, 'days');
}

// PRETEND DATA
const diaryItems = [
  {"start":"2021/02/03/", "end":"2021/02/08/", "Title":"Item1"},
  {"start":"2021/02/05/", "end":"2021/02/18/", "Title":"Item2"},
  {"start":"2021/02/07/", "end":"2021/02/18/", "Title":"Item3"},
  {"start":"2021/03/03/", "end":"2021/03/08/", "Title":"Item4"}
]

const ReactScrollCalendar: React.FunctionComponent<IReactScrollCalendarProps> = (props) => {
  return (
      <div className={styles.ReactScrollCalendar}>
        <div className={styles.calendarContaner}>
          <div className={styles.navigationheader}>
            <ul>
            {monthNames.map((monthName, i) => (
              <NavigationCell key = {i} thismonth={monthName} index={i}/>
            ))}
            </ul>
          </div>
          <div className={styles.calendarheader}>
            {dayNames.map((dayname, i) => (
              <DayHeaderCell thisday={dayname} index={i}  key = {i+1} />
            ))}
          </div>
          <div className={styles.calendarScrollContainer} id='scrollcontainer'>
            <div className={styles.daysContainer} id='dayscontainer'>
              {days.map((day, i) => (
                <DayCell thisdate={day} index={i}  key = {i+1}/>

              ))}
              {/* i wonder if we can place a ting here at a specific location  */}
              <div id='fixed'>this is fixed</div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default ReactScrollCalendar;
