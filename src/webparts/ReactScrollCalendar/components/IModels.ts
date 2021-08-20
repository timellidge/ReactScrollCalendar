export interface SPListData{
  value : SPEventItem[];
}

export interface SPEventItem {
  Title:string;
  Manager:string;
  EventType:string;
  Location:string;
  EventDate:string;
  EndDate:string;
}
