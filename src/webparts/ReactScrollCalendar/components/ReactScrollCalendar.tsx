import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from "moment";
import DayCell from './DayCell';
import DayHeaderCell from './DayHeaderCell';
import NavigationCell from './NavigationCell';
import IReactScrollCalendarProps from './IReactScrollCalendarProps';
import { sp, Web} from '@pnp/sp/presets/all';
//import { SPList } from '@microsoft/sp-page-context';
//import { SPHttpClientConfiguration, SPHttpClientResponse } from '@microsoft/sp-http';
//import { SPListItem } from '@microsoft/sp-page-context';

export interface SPListData{
  value : SPListItem[];
}

export interface SPListItem {
  Title:string;
  Manager:string;
  EventType:string;
  Location:string;
  StartDate:string;
  EndDate:string;

}

// PRETEND DATA
const diaryItems = [
  {"StartDate":"2021/02/03/", "EndDate":"2021/02/08/", "Title":"Item1", "irow":"row1"},
  {"StartDate":"2021/02/05/", "EndDate":"2021/02/18/", "Title":"Item2", "irow":"row2"},
  {"StartDate":"2021/02/07/", "EndDate":"2021/02/18/", "Title":"Item3", "irow":"row3"},
  {"StartDate":"2021/03/03/", "EndDate":"2021/03/08/", "Title":"Item4", "irow":"row4"},
  {"StartDate":"2021/08/07/", "EndDate":"2021/08/18/", "Title":"Item3", "irow":"row1"},
  {"StartDate":"2021/08/03/", "EndDate":"2021/08/08/", "Title":"Item4", "irow":"row2"},
  {"StartDate":"2021/07/13/", "EndDate":"2021/07/20/", "Title":"OFFICE", "irow":"row1"}
];

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
// i can process the data here to make a more complex structure to pass to the days... ie each day contains and array of events
// it may work ... but is it very react?... not sure but it is quite me...
for (let i = 0; i < 730; i++) {
  const theDay =  moment(startdate).add(i, 'days').startOf('day'); // thsi kind of pre-proesses the data every day is a data structure of daye and events for that day - all very neat : maybe the mondays and the fist days need some special treatment so i can render them in react
  const allEvents = diaryItems.filter(ditem => (theDay >= moment(ditem.StartDate) && theDay <= moment(ditem.EndDate).startOf('day'))); // first filter by date to get a sub set
  const firstdays = allEvents.filter(fitem => (theDay <= moment(fitem.StartDate).endOf('day'))); // then see if its the first...
  const items  = allEvents.filter(nitem => (theDay > moment(nitem.StartDate).startOf('day'))); // then filter by not office events
  const office = allEvents.filter(oitem => ("OFFICE" === oitem.Title)); // then office events
  days[i] = {"itemDate": theDay, "holiday": office, "firsts":firstdays, "events": items};
  console.log (theDay, firstdays, items);
}




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
                <DayCell thisdate={day.itemDate} index={i}  key = {i+1} firsts={day.firsts} events={day.events} holiday={day.holiday}/>
              ))}
            </div>
          </div>
        </div>
      </div>

  );
};

export default ReactScrollCalendar;
