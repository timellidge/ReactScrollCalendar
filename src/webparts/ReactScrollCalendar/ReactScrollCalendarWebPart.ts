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
  listurl0: string;
  listurl1: string;
  listurl2: string;
  ctx: WebPartContext;
  People: string;
  Icons:string;
  Colours: string;
}

const DefaultPeople = "Dave Howell;  Sian McAlpin; Rhys Faulkner; Court Post";
const DefaultColors = '{"Boston":"SeaGreen","Newport-Beach":"SeaGreen","Toronto":"SeaGreen","London":"Yellow","Other":"Yellow","Hamilton":"Green","Seoul":"Red","Sydney":"Red","Shanghai":"Red","Off-Island":"Orange"}';
const DefaultIcons = '{"Working":"user-edit","Leave"  :"umbrella-beach","Office" :"building"}';

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
        listurl0: this.properties.listurl0,
        listurl1: this.properties.listurl1,
        listurl2: this.properties.listurl2,
        ctx:      this.context,
        People:   this.properties.People || DefaultPeople,
        Icons:    this.properties.Icons ||  DefaultIcons,
        Colours:  this.properties.Colours || DefaultColors
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
                PropertyPaneTextField('listurl0', {
                  label: "Primary List Url",
                  value : this.properties.listurl0
                }),
                PropertyPaneTextField('listurl1', {
                  label: "Secondary List Url",
                  value : this.properties.listurl1,
                  placeholder: "Provide rest end point "
                }),
                PropertyPaneTextField('listurl2', {
                  label: "Tertiary List Url",
                  value : this.properties.listurl2
                }),
                PropertyPaneTextField('People', {
                  label: "One person per row, separate by ';'",
                  multiline: true,
                  rows:5,
                  resizable:true,
                  value : this.properties.People,
                  placeholder: DefaultPeople
                }),
                PropertyPaneTextField('Icons', {
                  label: 'Map Types to Icons JSON',
                  multiline: true,
                  rows:5,
                  resizable:true,
                  value : this.properties.Icons,
                  placeholder: DefaultIcons
                }),
                PropertyPaneTextField('Colours', {
                  label: 'Map locations to colours JSON',
                  multiline: true,
                  rows:15,
                  resizable:true,
                  value : this.properties.Colours,
                  placeholder: DefaultColors
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
