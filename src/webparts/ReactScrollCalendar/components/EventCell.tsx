
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";

export interface IEventCellProps {
  thistitle: string;
  thisicon: string;
  thiscolor: string;
  irow: string;
  index:number;
}

const EventCell: React.FunctionComponent<IEventCellProps> = (props) => {
    //const [count, setCount] = useState(0);
    //THI IS THE WEEKDAY HEADERS
    return (<div className={styles.event} data-row={props.irow}> {props.thistitle}</div>);
};

export default EventCell;


