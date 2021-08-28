

import * as React from "react";
import styles from "./ReactScrollCalendar.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getInitials } from "../../Utils";
import DrawColours from "./DrawColours";


// Note this is the data we use to decorate the calendar with
export interface IKeysProps {
  people: [];
  icons: {};
  colours: {};
}

// this just shows the items in the arays as a key for the calendar
// People, icons and colors, just wrapped in soem HTML
export default function Keys(props: any) {
  // just display stuff - no calculations nothign special i think
  // well i will want it to fly out and it will need a tab
  console.log("Keys ", props.people);
  return (
    <div className={styles.keyscontainer}>
      <h4>Colours & Locations</h4>
      {Object.keys(props.colours).map(cityName =>
        (<DrawColours colourName={props.colours[cityName]} cityName={cityName} />)
      )}<h4>People</h4>
        {props.people.map((person: string, i: number) => (
          <h5>{getInitials(person)} : {person}</h5>
        ))}
      <h4>Icons & Activities</h4>
        {Object.keys(props.icons).map((iconName) => (
          <h5><FontAwesomeIcon className='fa-fw' icon={['fad', props.icons[iconName]]} /> {iconName} </h5>
        ))}
      <div id='keytab' className={styles.showkey}>Key</div>
    </div>
  );
}



