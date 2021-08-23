import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import IReactScrollCalendarProps from './components/IReactScrollCalendarProps';
import ReactScrollCalendarApp from './components/ReactScrollCalendarApp';
import { sp } from '@pnp/sp';

export interface IReactScrollCalendarWebPartProps {
  description: string;
  listname: string;
  listurl: string;
  ctx:WebPartContext;
  IconsColours: string;
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
        listurl: this.properties.listurl,
        ctx:this.context,
        IconsColours: this.properties.IconsColours
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
            description: "Configure the Scroll Calendar web part"
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
                }),
                PropertyPaneTextField('IconsColours', {
                  label: 'Icons & Colours',
                  multiline: true,
                  rows:15,
                  resizable:true
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
