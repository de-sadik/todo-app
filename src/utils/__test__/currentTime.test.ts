import { WorldtimeapiResponse } from "../currentTime";
import { WorldTimeAPI } from "../currentTime";
export const apiResponse: WorldtimeapiResponse = {
  abbreviation: "IST",
  client_ip: "2401:4900:1b1a:df72:5132:16b5:8cc0:c9e0",
  datetime: "2022-02-11T11:56:18.726714+05:30",
  day_of_week: 5,
  day_of_year: 42,
  dst: false,
  dst_from: null,
  dst_offset: 0,
  dst_until: null,
  raw_offset: 19800,
  timezone: "Asia/Kolkata",
  unixtime: 1644560778,
  utc_datetime: "2022-02-11T06:26:18.726714+00:00",
  utc_offset: "+05:30",
  week_number: 6,
};

describe("worldtimeapi", () => {
  test("should return valid response", async () => {
    const wordTimeAPII = new WorldTimeAPI();
    const getTimeSpy = jest
      .spyOn(wordTimeAPII, "getTime")
      //@ts-ignore
      .mockReturnValueOnce(apiResponse);

    const time = await wordTimeAPII.timeNow("Asia/kolkata");

    expect(time).toBe(apiResponse.utc_datetime);
    expect(getTimeSpy).toHaveBeenCalledWith("Asia/kolkata");
  });
  test("should return reject promise", async () => {
    const wordTimeAPI = new WorldTimeAPI();
    const getTimeSpy = jest
      .spyOn(wordTimeAPI, "getTime")
      //@ts-ignore
      .mockRejectedValueOnce("failed");

    try {
      const time = await wordTimeAPI.getTime("Asia/sasas");
    } catch (e) {
      expect(e).toBe("failed");
    }
    expect(getTimeSpy).toHaveBeenCalledWith("Asia/sasas");
  });
});
