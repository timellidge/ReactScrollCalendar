
import styles from './ReactScrollCalendar.module.scss';
import * as React from "react";

export interface IDayHeaderCellProps {
  thisday: string;
  index: number;
}

const DayHeaderCell: React.FunctionComponent<IDayHeaderCellProps> = (props) => {
    //const [count, setCount] = useState(0);
    //THI IS THE WEEKDAY HEADERS
    return (<div className={styles.dayname} data-dayno={props.index}>{props.thisday}</div>);
};

export default DayHeaderCell;


