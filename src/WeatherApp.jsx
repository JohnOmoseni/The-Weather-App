import { useEffect, useRef, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherPanel from "./WeatherPanel";
import { getImageUrl, IMG_MAP } from "./utilities";
import Loading from "./Loading";

const currentUrl = "https://api.weatherapi.com/v1/current.json";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cityInput, setCityInput] = useState("");
  const [cityTitle, setCityTitle] = useState("Lagos");
  const [timeOfDay, setTimeOfDay] = useState("day");

  const btnRef = useRef();

  useEffect(() => {
    console.log("fetching data");
    const fetchWeatherData = async () => {
      const url = `${currentUrl}?key=5cc1d7ab52834234a2e24846232702&q=${cityTitle}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data?.current;
        if (!current.is_day) {
          setTimeOfDay("night");
        }
        setWeatherData(data);
        localStorage.setItem("weather-data", JSON.stringify(data));
        console.log(data);
      } catch (error) {
        const storedData = localStorage.getItem("weather-data");

        if (!storedData) {
          console.log(error);
          alert("Something went wrong fam 😢. Please try again");
        } else {
          setWeatherData(storedData);
        }
      }
      setIsLoading(false);
    };

    fetchWeatherData();
  }, [cityTitle]);

  useEffect(() => {
    if (weatherData) {
      const code = weatherData?.current?.condition?.code;
      const imgSrc = getImageUrl(timeOfDay, code);
      let obj = IMG_MAP.get(code);

      let btnClr = obj ? IMG_MAP.get(code)[timeOfDay] : "#f73a21";

      console.log(getImageUrl(timeOfDay, code), code, btnClr, IMG_MAP.get(code));
      document.body.style.backgroundImage = `url(${imgSrc})`;
      if (btnRef.current) {
        btnRef.current.style.background = btnClr;
      }
    }
  }, [cityTitle, weatherData, btnRef.current]);

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="column">
            <h2 className="title">the weather app</h2>
            <WeatherInfo cityTitle={cityTitle} weatherData={weatherData} />
          </div>

          <WeatherPanel
            cityInput={cityInput}
            setCityInput={setCityInput}
            setCityTitle={setCityTitle}
            weatherData={weatherData}
            btnRef={btnRef}
          />
        </>
      )}
    </div>
  );
}

export default WeatherApp;
