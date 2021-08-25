import { WebPartContext } from "@microsoft/sp-webpart-base";

export default interface IReactScrollCalendarProps {
  day: number;
  listurl0:string;
  listurl1:string;
  listurl2:string;
  ctx: WebPartContext;
  People: string;
  Icons: string;
  Colours: string;
}
