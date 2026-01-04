"use client";

export const getDataByStations = (stations: any, data: any) => {
  let result: any[] = [];

  stations.map((item: any) => {
    const dataArr = data.filter((d: any) => d.stations_id == item.stations_id);
    const currentAmount =
      dataArr.reduce((prev: any, cur: any) => prev + Number(cur.amount), 0) /
      dataArr.length;

    result.push({ ...item, amount: currentAmount });
  });

  return result;
};
