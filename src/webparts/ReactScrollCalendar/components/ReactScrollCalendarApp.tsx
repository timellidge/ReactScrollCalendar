import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";
import { CSSProperties } from 'react';


import * as moment from "moment";

// font awesome (font difficult more like
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUmbrellaBeach, faUserEdit, faCaretDown, faArrowAltToRight, faBuilding } from '@fortawesome/pro-duotone-svg-icons';
library.add(faUmbrellaBeach, faUserEdit, faCaretDown, faArrowAltToRight, faBuilding); // this make them availibe anywhere by string i think

//imports specific to this Web part
import IReactScrollCalendarProps from './IReactScrollCalendarProps';
import DayCollection from './DayCollection';
import DayHeaderCell from './DayHeaderCell';
import NavigationCell from './NavigationCell';
import Keys from './Keys';

// Some stuff for talking to Sharepoint
import * as Utils from "../../Utils";
import { SPHttpClient } from '@microsoft/sp-http';
import { SPEventItem } from "./IModels";

export default class ReactScrollCalendarApp extends React.Component<IReactScrollCalendarProps> {
  //build some data structures for the react components to iterate over
  private dayNames = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
  // and Months CBA with Years just yet
  private monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  // do i need to explain this ? but its in the past at the start of the Year its my reference date
  private refDate = moment().startOf('year');
  private firstWeekday = this.refDate.weekday();

  // its a calendar so we need some days to work with
  private pdays = new Array(365);

  //data structures for the deocration of the calendar objects
  private people = [];
  private colours = {};
  private icons = {};

  private _peopleColoursIcons() {
    if (this.props.People) {
      const people = this.props.People.split(";");
      this.people = people.map(p => p.trim());
    }
    this.colours = Utils.JSONTryParse(this.props.Colours);
    console.log(this.colours);
    this.icons = Utils.JSONTryParse(this.props.Icons);
    console.log(this.icons);
  }

  // set the statefull things my React is going to react to
  public state = {
    diaryItems: [],
    days: []
  };

  // thanks to deShon these are some bog standard "talk to sp" calls
  private _client: SPHttpClient = this.props.ctx.spHttpClient;
  private _webUrl: string = this.props.ctx.pageContext.web.absoluteUrl;

  private _getEvents() {
    //let url = this._webUrl + "/_api/web/lists/getByTitle('Events')/items";
    let url = this.props.listurl0+"/_api/web/lists/getByTitle('"+this.props.listurl1+"')/items";
    Utils.getSPData(this._client, url).then(d => {
      this.setState({ diaryItems: d.value }); // plop the data into state
      // now we have the data we need to pop it into the state after processing that is....
      // this is the key i was stuck on ie when to add the data to state it makes sense if its in the the
      // ".then" of the getEvents method.
      this._populateCalendar(d.value);
    });
  }

  private _populateCalendar(events: SPEventItem[]) {
    // now lets see about populating the days with these events
    // whilst we are at setting the events state lets populate the local days
    // so we have a diary scaffold before we add the specific events
    for (let i = 0; i < this.pdays.length; i++) {
      this.pdays[i] = { "dayIndex": i, "Events": [], "Overlay": "" };
    }
    console.log("DIARY ITEMS LENGTH", this.state.diaryItems.length);
    console.log(this.state.diaryItems);
    events.forEach(ev => {
      const startIndex = moment(ev.StartDate).diff(this.refDate, 'days');
      const weekDay = moment(ev.StartDate).weekday();
      const eventDuration = moment(ev.EndDate).diff(ev.StartDate, 'days');
      // do a loop with some logic for the first day
      for (let i: number = 0; i <= eventDuration; i++) {
        // suppose we can add a day No to help with the CSS + Monday and do a ternery operator to flag the first day
        // weekday is heavy stuff with all that momenting for every day - how about i do a mod % 7 with the i that will be much quicker also add in some decoration, icon colours etc also flag the last day
        if (ev.EventType === "Office") {
          //console.log(ev);
          this.pdays[startIndex + i].Overlay += (ev.Title + " ");
        } else {
          this.pdays[startIndex + i].Events.push({
            "Title": ev.Title, "Manager": ev.Manager, "Note": ev.OrganisersNote,
            "EventType": ev.EventType, "Location": ev.EventLocation,
            "Row": this.people.indexOf(ev.Manager), "Icon": this.icons[ev.EventType], "Colour": this.colours[ev.EventLocation],
            "FirstDay": (i === 0 ? true : false), "LastDay": (i === eventDuration ? true : false), "Weekday": ((weekDay + i) % 7),
          });
        }
      }
    });
    // OK Now pop that lot into state...
    this.setState({ days: this.pdays });
    // console.log(this.pdays);
  }

  // OK so we are an the page now lets go get the Data
  public componentDidMount() {
    this._peopleColoursIcons();
    this._getEvents();
    // set a use effect that happens (ONCE) after render in this case i want to click on this month

  }

  public render(): React.ReactElement<IReactScrollCalendarProps> {

    // super excited by this i can define a variable then add it to a container for use within it do it as i render
    // so i cns set the calendar to have the correct day of the week.
    const mystyle = { "--StartDay": this.firstWeekday } as CSSProperties;
    return (
      <div className={styles.ReactScrollCalendar} style={ mystyle }>
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
          <DayCollection days={this.state.days} refDate={this.refDate} />
        </div>
        <Keys people={this.people} icons={this.icons} colours={this.colours} />
      </div>
    );
  }
}

