import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import IReactScrollCalendarProps from './components/IReactScrollCalendarProps';
import ReactScrollCalendar from './components/ReactScrollCalendar';

import { values } from 'office-ui-fabric-react';

export interface IReactScrollCalendarWebPartProps {
  description: string;
  starttime: string;
  endtime: string;

}

export default class ReactScrollCalendarWebPart extends BaseClientSideWebPart<IReactScrollCalendarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactScrollCalendarProps> = React.createElement(
      ReactScrollCalendar,
      {
        starttime: this.properties.starttime,
        endtime: this.properties.endtime,
        day: 0
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const AMOptions = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map((CT) => ({ key: CT, text: CT }));
    const PMOptions = ["12:00", "12:30", "13:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"].map((CT) => ({ key: CT, text: CT }));

    return {
      pages: [
        {
          header: {
            description: "Configure the Scrolll Calendar web part"
          },
          groups: [
            {
              groupName: "",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'description of the'
                }),
                PropertyPaneDropdown('starttime', {
                  label: "Start of working day",
                  options: AMOptions,
                  selectedKey: "09:00"
                }),
                PropertyPaneDropdown('endtime', {
                  label: "End of working day",
                  options: PMOptions,
                  selectedKey: "16:30"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
