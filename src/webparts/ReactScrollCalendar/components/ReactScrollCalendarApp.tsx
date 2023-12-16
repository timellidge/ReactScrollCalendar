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
import DayHeader from './DayHeader';
import NavigationHeader from './NavigationHeader';
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
  private people  = [];
  private colours = {};
  private icons   = {};

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
    console.log("THE URL", url);
    Utils.getSPData(this._client, url).then(d => {
      this.setState({ diaryItems: d.value }); // plop the data into state
      // now we have the data we need to pop it into the state after processing that is....
      // this is the key i was stuck on ie when to add the data to state it makes sense if its in the the
      // ".then" of the getEvents method.
      this._populateCalendar2(d.value);
    });
  }

  private _checkToEnd( start: number, end: number, row:number) {
    let ok = true;
    for (let i = start; i <= end; i++) {
      if (this.pdays[i].Rows[row] !== null) {
        ok = false;
        break;
      }
    }
    return ok;
  }

  private _markToEnd( start: number, end: number, row:number, evid: number) {
    //render the actual event whilst i'm here ?
    // or just add the draw to a queue to be rendered later?
    for (let i = start; i <= end; i++) {
      this.pdays[i].Rows[row] = evid;
    }
    return row;
  }

  private _doFragment(week: number, day: number, dur: number, ev: SPEventItem) {
    let daysIndex: number = week * 7 + day;

    const thisrowend: number = daysIndex + (Math.min(6, day + dur));
    let ok: boolean = false;
    // try all of the rows to find one that fits
    for (let r = 0; r <= 9; r++) {
      ok = this._checkToEnd(daysIndex, thisrowend, r);
      if (ok) {
        this._markToEnd(daysIndex, thisrowend, r, ev.Id);
        // mark up the first day of the event in the week with the event data
        this.pdays[daysIndex].Events.push({
          "Title": ev.Title, "Manager": ev.Manager, "Note": ev.OrganisersNote,
          "EventType": ev.EventType, "Location": ev.EventLocation,
          "Person": this.people.indexOf(ev.Manager),
          "Icon": this.icons[ev.EventType],
          "Colour": this.colours[ev.EventLocation],
          "Row": r,
          "RowEnd": thisrowend
        });
        console.log("event added", this.pdays[daysIndex].Events);
        break;
      }
    }

    // we had 10 does to fit it in and it dodnt work out boo hoo
    if (!ok) {
      console.log("DIDNT FIT");
    }
    // do a test here for the end of ther event and if not call _doFragment again
    if(daysIndex + dur < thisrowend){
      this._doFragment(week+1, 0, dur-(6-day), ev);
    }
  }

  private _populateCalendar2(events: SPEventItem[]) {
    // now lets see about populating the days with these events
    // whilst we are at setting the events state lets populate the local days
    // so we have a diary scaffold before we add the specific events not sure of the events as its got a lot of metadata in it
    // includign row so we are probably ok
    for (let i = 0; i < this.pdays.length; i++) {
      const dayRows = new Array(10).fill(null);
      this.pdays[i] = { "dayIndex": i, "Events": [], "Rows": dayRows, "Overlay": "" };
    }

    console.log("DIARY ITEMS LENGTH", this.state.diaryItems.length);
    console.log(this.state.diaryItems);

    events.forEach(ev => {
      const startIndex = moment(ev.StartDate).diff(this.refDate, 'days');
      const weekDay = moment(ev.StartDate).weekday();
      const eventDuration = moment(ev.EndDate).diff(ev.StartDate, 'days');

      if (ev.EventType === "Office") {
        // if its an office event we just pop an overlay on the day
        this.pdays[startIndex].Overlay += (ev.Title + " ");
      } else {
        // if its not an office we need to do some work to fit it in
        this._doFragment(moment(ev.StartDate).week(), weekDay, eventDuration, ev);
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

  public componentDidUpdate(){
    Utils.isValidSPSite(this.props.listurl0).then(d =>{
      if (d === true) {
        console.log ("the url is valid");
      } else {
        console.log ("keep trying");
      }
    });
  }

  public render(): React.ReactElement<IReactScrollCalendarProps> {

    // super excited by this i can define a variable then add it to a container for use within it do it as i render
    // so i cns set the calendar to have the correct day of the week., sort of CSS via code
    const mystyle = { "--StartDay": this.firstWeekday } as CSSProperties;
    return (
      <div className={styles.ReactScrollCalendar} style={ mystyle }>
        <div className={styles.calendarContaner}>
          <NavigationHeader months={this.monthNames} />
          <DayHeader days={this.dayNames} />
          <DayCollection days={this.state.days} refDate={this.refDate} />
        </div>
        <Keys people={this.people} icons={this.icons} colours={this.colours} />
      </div>
    );
  }
}

