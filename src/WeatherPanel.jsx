import { BiSearchAlt } from "react-icons/bi";

const cities = ["Lagos", "Ogun", "Abuja", "Sokoto", "Kano"];

const WeatherDetails = ({ title, value, className = title }) => {
  return (
    <li>
      <span>{title}</span>
      <span className={className}>{value}</span>
    </li>
  );
};

function WeatherPanel({ cityInput, setCityInput, setCityTitle, weatherData, btnRef }) {
  const data = weatherData?.current;
  const cloud = data?.cloud;
  const humidity = data?.humidity;
  const wind = data?.wind_kph;

  const handleInputChange = e => {
    setCityInput(e.target.value);
  };

  const handleListClick = city => {
    setCityInput(city);
    setCityTitle(city);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!cityInput) {
      alert("You need to enter a search value");
      return;
    }
    setCityTitle(cityInput);
    setCityInput("");
  };

  return (
    <div className="weather-panel">
      <form id="search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityInput}
          className="search-input"
          placeholder="Search Location"
          onChange={handleInputChange}
        />
        <button type="submit" ref={btnRef}>
          <span>
            <BiSearchAlt size={30} />
          </span>
        </button>
      </form>
      <div className="cities-details">
        <ul className="cities">
          {cities.map((city, idx) => {
            return (
              <li className="city" key={idx} onClick={() => handleListClick(city)}>
                {city}
              </li>
            );
          })}
        </ul>
        <ul className="weather-details">
          <h3>Weather Details</h3>
          <WeatherDetails
            title="Cloudy"
            className="cloudy"
            value={`${cloud ? cloud : cloud == 0 ? 0 : "_"}%`}
          />
          <WeatherDetails
            title="Humidity"
            className="humid"
            value={`${humidity ? humidity : "_"}%`}
          />
          <WeatherDetails title="Wind" className="wind" value={`${wind ? wind : "_"}km/h`} />
        </ul>
      </div>
    </div>
  );
}

export default WeatherPanel;
