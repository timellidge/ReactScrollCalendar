import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import * as moment from "moment";
import DayCell from './DayCell';
import DayHeaderCell from './DayHeaderCell';
import NavigationCell from './NavigationCell';
import IReactScrollCalendarProps from './IReactScrollCalendarProps';
// simple old version not the PNP one

import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
///import { sp, SPHttpClient, Web } from '@pnp/sp/presets/all';
import { SPListData, SPEventItem } from "./IModels";

// PRETEND DATA
// const diaryItems = [
//   { "EventDate": "2021/02/03/", "EndDate": "2021/02/08/", "Title": "Item1", "irow": "row1" },
//   { "EventDate": "2021/02/05/", "EndDate": "2021/02/18/", "Title": "Item2", "irow": "row2" },
//   { "EventDate": "2021/02/07/", "EndDate": "2021/02/18/", "Title": "Item3", "irow": "row3" },
//   { "EventDate": "2021/03/03/", "EndDate": "2021/03/08/", "Title": "Item4", "irow": "row4" },
//   { "EventDate": "2021/08/07/", "EndDate": "2021/08/18/", "Title": "Item3", "irow": "row1" },
//   { "EventDate": "2021/08/03/", "EndDate": "2021/08/08/", "Title": "Item4", "irow": "row2" },
//   { "EventDate": "2021/07/13/", "EndDate": "2021/07/20/", "Title": "OFFICE", "irow": "row1" }
// ];



export default class ReactScrollCalendarApp extends React.Component<IReactScrollCalendarProps> {
  //build some data structures for the react components to iterate over
  private dayNames = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
  // and Months CBA with Years just yet
  private monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  // do i need to explain this ? but its in the past at the start of the Year its my reference date
  private RefDate = moment().startOf('year');

  private pdays = new Array(365);

  // set the statefull things my React is going to react to
  public state = {
    diaryItems:[],
    days:[]
  };

  // thanks to deshon these are some bog standard talk to sp calls
  private _client:SPHttpClient = this.props.ctx.spHttpClient;

  private async _getSPData(client:SPHttpClient, url:string):Promise<any> {
    let response:SPHttpClientResponse = await client.get(url, SPHttpClient.configurations.v1);
    let json = response.json();
    return json;
  }

  private _getEvents(){
    let url = "https://plreonboardingcom.sharepoint.com/sites/CPSPlayPit/_api/web/lists/getByTitle('Events')/items";
    this._getSPData(this._client, url).then(d => {
      let data = d.value;
      this.setState({diaryItems:data});
    });
  }

  public componentDidMount(){
    this._getEvents();
    // now i need to populate the array with dates to go off into the future
    // i can process the data here to make a more complex structure to pass to the days... ie each day contains and array of events
    // it may work ... but is it very react?... not sure but it is quite me...
    console.log("INITIAL DIARY ITEMS");
    console.log(this.state.diaryItems);
    // whilst we are at setting the events state lets populate the days as well not quite an empty array
    for (let i = 0; i < 365; i++) {
      this.pdays[i] = {"Events": []};
    }
    // OK Now pop that lot into state...
    this.setState({days: this.pdays});
  }

  public componentDidUpdate(){
    console.log("DIARY ITEMS UPDATE");
    console.log(this.state.diaryItems);
    // now we habve the data lets pop it into the array of days
    this.state.diaryItems.forEach(ev => {
      const startIndex =  moment(ev.EventDate).diff(this.RefDate, 'days');
      const weekDay =  moment(ev.EventDate).weekday();
      // do the first day
      this.state.days[startIndex].Events.push({"Title": ev.Title, "Category": ev.Category, "manager": ev.ManagerId, "Desc":ev.Description, "FirstDay": true, "Weekday": weekDay});
      const eventDuration =  moment(ev.EndDate).diff(ev.EventDate, 'days');
      //we already covered the first day so now we are just after the rest of them
      for (let i = 1; i <= eventDuration ; i++ ){
        // prety much the same but its not a first day, suppose we can add a day No to help with the CSS + Monday
        this.state.days[startIndex+i].Events.push({"Title": ev.Title, "Category": ev.Category, "manager": ev.ManagerId, "Desc":ev.Description, "FirstDay": false, "Weekday": weekDay});
      }
      //console.log(startIndex, eventDuration, weekDay);
    });
    console.log("STATE DAYS");
    console.log(this.state.days);
    //this.setState({days: this.pdays});
  }



  public render(): React.ReactElement<IReactScrollCalendarProps> {
    return (
      <div className={styles.ReactScrollCalendar}>
        <div className={styles.calendarContaner}>
          <div className={styles.navigationheader}>
            <ul>
              {this.monthNames.map((monthName, i) => (
                <NavigationCell key={i} thismonth={monthName} index={i} />
              ))}
            </ul>
          </div>
          <div className={styles.calendarheader}>
            {this.dayNames.map((dayname, i) => (
              <DayHeaderCell thisday={dayname} index={i} key={i} />
            ))}
          </div>
          <div className={styles.calendarScrollContainer} id='scrollcontainer'>
            <div className={styles.daysContainer} id='dayscontainer'>
              {this.state.days.map((day, i) => (
                <DayCell thisdate={this.RefDate} index={i} key={i} Events={day.Events} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
