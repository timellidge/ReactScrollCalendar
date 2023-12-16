export interface SPListData{
  value : SPEventItem[];
}

export interface SPEventItem {
  Id:number;
  Title:string;
  OrganisersNote:string;
  Manager:string;
  EventType:string;
  EventLocation:string;
  StartDate:string;
  EndDate:string;
}
