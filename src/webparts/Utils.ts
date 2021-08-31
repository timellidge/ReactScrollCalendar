import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

import { sp } from "@pnp/sp";
import "@pnp/sp/sites";
import { Web } from '@pnp/sp/webs';

// PnPJS Imports
import '@pnp/sp/lists';
import '@pnp/sp/items';
// import { IRenderListDataAsStreamResult } from '@pnp/sp/lists';
// import { Web } from '@pnp/sp/webs';
// import { FieldTypes, IFieldInfo } from '@pnp/sp/fields';
// import * as CamlBuilder from 'camljs';
// import { IDropdownOption } from 'office-ui-fabric-react';
// import { IViewInfo } from '@pnp/sp/views';
// import { IItemUpdateResult } from '@pnp/sp/items';
// import { ITypedHash } from '@pnp/common';

// thesea re the functions im writing

export async function isValidSPSite(siteUrl: string):Promise<boolean> {
  try {
    await Web(siteUrl).get();
    return true;
  } catch (e) {
    return false;
  }
}

export async function getSPData(client:SPHttpClient, url:string):Promise<any> {
  let response:SPHttpClientResponse = await client.get(url, SPHttpClient.configurations.v1);
  let json = response.json();
  return json;
}

export function JSONTryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.log(e);
    if (value === "undefined"){
      return void 0;
    }
    return value;
  }
}

export function getInitials(value: string) {
  try {
    const  Words = value.split(" ");
    const  Initials = Words.map(p => p.trim()[0].toUpperCase()); // get the first character from the trimmed string and push it to Upper case
    return Initials.join("");
  } catch (e) {
    console.log(e);
    return "??";
  }
}
