import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export async function getSPData(client:SPHttpClient, url:string):Promise<any> {
  let response:SPHttpClientResponse = await client.get(url, SPHttpClient.configurations.v1);
  let json = response.json();
  return json;
}
