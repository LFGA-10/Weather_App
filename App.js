import {useEffect, useState} from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import {getWeatherData} from "./services/weatherApi";
function App(){
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Kigali");
  const [error, setError] = useState(" ");

  useEffect(()=>{
    fetchWeather(city);
  }, []);

  async function fetchWeather(cityName){
    try{
      const data = await getWeatherData(cityName);
      setWeather(data);
      setError(" ");
    }catch{
      setError("City not found");
    }
  }

  return(
    <div style = {{padding: 30, fontFamily: "Arial"}}>
      <SearchBar onSearch = {fetchWeather} />

      {error && <p style = {{color: "red"}}>{error}</p>}

      {weather && (
        <>
        <CurrentWeather data = {weather.current} city={weather.city} />
        <DailyForecast data = {weather.daily} />
        </>
      )}
    </div>
  )
}

export default App;

