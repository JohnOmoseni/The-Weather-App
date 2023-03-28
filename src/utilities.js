export function dayOfTheWeek(date) {
  const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
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

  if (!date) {
    const currDate = new Date();
    let y = currDate.getFullYear();
    let m = currDate.getMonth() + 1;
    let d = currDate.getDate();
    let formatDate = `${weekdays[currDate.getDay()]}, ${formatTime(d)}.${formatTime(m)}.${y}`;

    return formatDate;
  }
  const y = parseInt(date?.substr(0, 4));
  const m = parseInt(date?.substr(5, 2));
  const d = parseInt(date?.substr(8, 2));
  const year = y.toString().substr(-2);
  return `${weekdays[new Date(`${d}/${m}/${y}`).getDay()]}  ${d}, ${months[m - 1]} '${y}`;
}

export const formatTime = time => {
  return time < 10 ? `0${time}` : time;
};

export const IMG_MAP = new Map();

export function getImageUrl(timeOfDay, code) {
  const obj = IMG_MAP.get(code);
  if (!obj) {
    return `/images/${timeOfDay}/bright.jpeg`;
  }
  return `/images/${timeOfDay}/${IMG_MAP.get(code).src}`;
}

addToMap([1000], { src: "clear.jpeg", day: "#163400e3", night: "#050c16" });
addToMap([1003, 1006, 1009, 1030, 1069, 1087, 1137, 1135, 1273, 1276, 1279, 1282], {
  src: "cloudy.jpeg",
  day: "#00152e",
  night: "#050c16",
});
addToMap([1009, 1030], {
  src: "mist.jpeg",
  day: "#fe6c32e0",
  night: "#f66932ce",
});
addToMap([1087, 1273, 1276], {
  src: "stormy.jpeg",
  day: "#012d34",
  night: "#343434e6",
});
addToMap([1114, 1117, 1135, 1147, 1168], {
  src: "snowy.jpeg",
  day: "#363d43",
  night: "#363d43",
});
addToMap(
  [
    1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246,
    1249, 1252,
  ],
  { src: "rainy.jpeg", day: "#647d75", night: "#363d43" }
);

function addToMap(values, imageUrl) {
  values.forEach(val => {
    IMG_MAP.set(val, imageUrl);
  });
}
