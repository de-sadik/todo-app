import * as http from "http";
import moment from "moment";
export interface ResponseData {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: undefined | null;
  dst_offset: number;
  dst_until: null | undefined;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
}

async function getTime(timezone: string): Promise<ResponseData> {
  return new Promise<ResponseData>((resolve, reject) => {
    http
      .get(`http://worldtimeapi.org/api/timezone/${timezone}`, (resp) => {
        let data: string = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(new Error("failed"));
      });
  });
}
export async function timeNow(timezone:string): Promise<string>{
      const res = await getTime(timezone)
    //   return moment(res.utc_datetime).toDate()
    return res.utc_datetime

} 