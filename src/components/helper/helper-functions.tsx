export const setTimeZone = "Asia/Taipei";

export const arrayOfMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const lagunaCenterCoordinates = {
  lat: 14.1791,
  lng: 121.2391,
};

export const arrayOfMonthsColors = [
  "#C3DFE0",
  "#BCD979",
  "#9DAD6F",
  "#7D6D61",
  "#5E574D",
  "#2B2C28",
  "#7B7554",
  "#2D936C",
  "#AFCBFF",
  "#0E1C36",
  "#FF4F79",
  "#FFB49A",
];

export const getDateNow = () => {
  const newDate = new Date().toLocaleString("en", {
    timeZone: setTimeZone,
  });

  return new Date(newDate.toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split("T")[0];
};

// Copyright year
export const copyrightYear = () => {
  return getDateNow().split("-")[0];
};

// format the numbers separated by comma
export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// format the numbers separated by comma
export const numberWithCommasToFixed = (item: string, x: any) => {
  let result = "0.00";

  if (typeof item !== "undefined" && item !== "") {
    result = numberWithCommas(Number(item).toFixed(x));
  }
  return result;
};
