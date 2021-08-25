import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

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
