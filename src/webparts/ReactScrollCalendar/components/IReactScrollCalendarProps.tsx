import { WebPartContext } from "@microsoft/sp-webpart-base";

export default interface IReactScrollCalendarProps {
  day: number;
  listname:string;
  listurl:string;
  ctx: WebPartContext;
  IconsColours: string;
}
