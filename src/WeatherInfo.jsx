import { dayOfTheWeek, formatTime } from "./utilities";

function WeatherInfo({ cityTitle, weatherData }) {
  console.log(weatherData);
  const currDate = new Date();
  const hours = currDate.getHours();
  const mins = currDate.getMinutes();

  const data = weatherData?.current;
  const loc = weatherData?.location;
  const temp = data?.temp_c;
  const country = loc?.country;
  const continent = loc?.tz_id?.split("/")[0];
  const condition = data?.condition?.text;

  const date = loc?.localtime;
  const time = date?.substr(11).padStart(5, 0);
  const getTime = `${formatTime(hours)}:${formatTime(mins)}`;

  const iconId = data?.condition?.icon?.substr("//cdn.weatherapi.com/weather/64x64/".length);
  const iconSrc = `/icons/${data ? iconId : "113.png"}`;

  return (
    <div className="weather-info">
      <h1 className="temp">{temp ? temp : "25"} &deg;</h1>
      <div className="city-date">
        <h1 className="city" title={cityTitle}>
          {cityTitle}
        </h1>
        <div className="region-date">
          <p className="region">{`${country ? country : "Nigeria"}, ${
            continent ? continent : "Africa"
          }`}</p>
          <br />
          <span className="time">{`${dayOfTheWeek(date)} ~ ${time ? time : getTime}`}</span>
        </div>
      </div>
      <div className="weather">
        <div className="weather-icon">
          <img src={iconSrc} alt="" />
        </div>
        <span className="condition fw-bold">{condition}</span>
      </div>
    </div>
  );
}

export default WeatherInfo;
