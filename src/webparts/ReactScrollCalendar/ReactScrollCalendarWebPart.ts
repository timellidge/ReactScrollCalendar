import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import IReactScrollCalendarProps from './components/IReactScrollCalendarProps';
import ReactScrollCalendarApp from './components/ReactScrollCalendarApp';
import { sp } from '@pnp/sp';

//import { values } from 'office-ui-fabric-react';

export interface IReactScrollCalendarWebPartProps {
  description: string;
  listname: string;
  listurl: string;
}

export default class ReactScrollCalendarWebPart extends BaseClientSideWebPart<IReactScrollCalendarWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup ({
        spfxContext: this.context,
        sp:{
          headers:{
            Accept: "application/json; odata=nometadata"
          },
        }
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<IReactScrollCalendarProps> = React.createElement(
      ReactScrollCalendarApp,
      {
        day: 0,
        listname: this.properties.listname,
        listurl: this.properties.listurl
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

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
                  label: 'description of the webpart'
                }),
                PropertyPaneTextField('listname', {
                  label: "List Name"
                }),
                PropertyPaneTextField('listurl', {
                  label: "List Url"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
