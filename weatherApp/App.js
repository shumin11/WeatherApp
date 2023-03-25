import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import coatIcon from './assets/Icons/WeatherApp Icons/Coat.png';
import moonIcon from './assets/Icons/Moon.png';
import meltedFaceIcon from './assets/Icons/WeatherApp Icons/Melted Face.png';
import mittensIcon from './assets/Icons/WeatherApp Icons/Mittens.png';
import scarfIcon from './assets/Icons/WeatherApp Icons/Scarf.png';
import smileyFaceIcon from './assets/Icons/WeatherApp Icons/Smiling Face.png';
import sunglassesIcon from './assets/Icons/WeatherApp Icons/Sunglasses.png';
import tShirtIcon from './assets/Icons/WeatherApp Icons/TShirt.png';
import umbrellaIcon from './assets/Icons/WeatherApp Icons/Umbrella.png';

const chooseOutfit = (temperature) => {
  if (temperature <= 0) return <img style = {styles.SnowIcon} src = {SnowICon} />;
  else if (temperature > 7 || temperature <=14) return <img style = {styles.ColdICon} src = {ColdICon} />;
  else if (temperature > 14 || temperature <=21 ) return <img style = {styles.MildICon} src = {MildICon} />;
  else if (temperature > 21 || temperature <= 29) return <img style = {styles.WarmICon} src = {WarmICon} />;
  else if (temperature > 29) return <img style = {styles.HotIcon} src = {HotIcon} />;
} 

const chooseAccessories = (precipitation) => {
  if (precipitation <= 50) return <img style = {styles.SunglassesICon} src = {SunglassesICon} />;
  else return <img style = {styles.UmbrellaIcon} src = {UmbrellaIcon} />;
} 

export default function App() {
  // weatherData holds the weather data of the current location
  // processWeatherData is a function that updates weatherData
  // const [weatherData, processWeatherData] = useState(0); // initialize to 0 degrees 
  const [currentTemperature, setCurrentTemperature] = useState(""); // initialize to empty string
  const [dailyPrecipitationProbabilityMax, setDailyPrecipitationProbabilityMax] = useState("");
  const WeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=-123.12&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=America%2FLos_Angeles";
  const [hourlyTemperatures, setHourlyTemperatures] = useState([]);

  const getweatherDataFromApi = () => {
    fetch(WeatherURL)
    .then(response => {
      if (!response.ok) {
        throw response; // check the http response code and if isn't ok then throw the response as an error
      }
      return response.json(); // parse the result as JSON
    }).then(result => {
      console.log(result)
      // processWeatherData(result.content)
      setCurrentTemperature(result.current_weather.temperature + "\u00B0");
      setDailyPrecipitationProbabilityMax(result.daily.precipitation_probability_max[0] + "\%");
      setHourlyTemperatures(result.hourly.apparent_temperature.slice(0, 7));
    }).catch((errorResponse) => {
      if (errorResponse.text) {
        errorResponse.text().then (errorMessage => {
          // errorMessage
        })
      } else {
        // no additional error information
      }
    });
  }

  useEffect(() => {
    getweatherDataFromApi();
  }, [])

  return (
    <View style={styles.container}>
    <img style = {styles.moonIcon} src = {require('./assets/Icons/Moon.png')} />

    <Text style = {styles.locationText}> {currentTemperature + "C" + "      " + dailyPrecipitationProbabilityMax} </Text>

    chooseOutfit(currentTemperature)
    chooseAccessories(precipitation_probability_max)

    {/* <img style = {styles.umbrellaLogo} src = {require('./assets/Icons/WeatherApp Icons/Umbrella.png')} />
    <img style = {styles.tShirtLogo} src = {require('./assets/Icons/WeatherApp Icons/TShirt.png')} />
    <img style = {styles.sunglassesLogo} src = {require('./assets/Icons/WeatherApp Icons/Sunglasses.png')} /> */}

   <View style={{flexDirection: 'row', alignItems: 'center'}}>
   <Text style = {styles.locationText}>Location:</Text>
   <TextInput style = {styles.input} />
  </View>

    <StatusBar style="auto" />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9FE2BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: { 
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: "white",
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  moonIcon: {
    width: 80,
    height: 80,
  },
  umbrellaLogo: {
    width: 50,
    height: 50,
  },
  tShirtLogo: {
    width: 50,
    height: 50,
  },
  sunglassesLogo: {
    width: 50,
    height: 50,
  }
});
