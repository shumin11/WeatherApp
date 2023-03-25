import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown'

import UmbrellaIcon from './assets/Icons/WeatherApp Icons/Umbrella.png';
import SunglassesIcon from './assets/Icons/WeatherApp Icons/Sunglasses.png';

import ChillIcon from './assets/Icons/WeatherApp Icons/Coat.png';
import moonIcon from './assets/Icons/Moon.png';
import HotIcon from './assets/Icons/WeatherApp Icons/Melted Face.png';
import SnowIcon from './assets/Icons/WeatherApp Icons/Mittens.png';
import ColdIcon from './assets/Icons/WeatherApp Icons/Scarf.png';
import smileyFaceIcon from './assets/Icons/WeatherApp Icons/Smiling Face.png';
import MildIcon from './assets/Icons/WeatherApp Icons/TShirt.png';
import WarmIcon from './assets/Icons/WeatherApp Icons/RunningShirt.png';


const cities = ["Vancouver", "Beijing", "Yukon"]


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
      setCurrentTemperature(result.current_weather.temperature);
      setDailyPrecipitationProbabilityMax(result.daily.precipitation_probability_max[0]);
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

  const chooseOutfit = ((temperature) => {
    console.log(temperature);
    if (temperature <= 0) return SnowIcon;
    else if (temperature > 0 && temperature <=7) return ColdIcon;
    else if (temperature > 7 && temperature <=14) return ChillIcon;
    else if (temperature > 14 && temperature <=21 ) return MildIcon;
    else if (temperature > 21 && temperature <= 29) return WarmIcon;
    else if (temperature > 29) return HotIcon;
  }) 
  
  console.log(chooseOutfit(currentTemperature));

  const chooseAccessories = (precipitation) => {
    if (precipitation <= 50) return <img style = {styles.SunglassesIcon} src = {SunglassesIcon} />;
    else return <img style = {styles.UmbrellaIcon} src = {UmbrellaIcon} />;
  }

  const chooseDayNight = (time) => {
  if (time >= 0700 && time < 1859) return daySky;
  else if (time >= 1900 && time < 0659) return nightSky;
  }

  return (

    <View style={styles.container}>
    <img style = {styles.moonIcon} src = {chooseDayNight(time)} />
    <Text style = {styles.locationText}> {"current time"} </Text>

    <Text style = {styles.locationText}> {currentTemperature + "\u00B0" + "C" + "      " + dailyPrecipitationProbabilityMax + "\%"} </Text>
  
    <img style = {styles.umbrellaLogo} src = {chooseOutfit(currentTemperature)} />
    <img style = {styles.umbrellaLogo} src = {chooseAccessories(dailyPrecipitationProbabilityMax)} />


   <View style={{flexDirection: 'row', alignItems: 'center'}}>
   <Text style = {styles.locationText}>Location:  </Text>
   {/* <TextInput style = {styles.input} /> */}
   <SelectDropdown
   dropdownStyle={styles.dropdown}
   buttonStyle = {styles.button}
   defaultButtonText = 'select a city'
	data={cities}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}

/>

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
  },
  dropdown: {
    maxHeight: 100,
    color: '#FFFFFF',
    backgroundColor: '#DBE4C6'
  },
  button: {
    width: 200,
    backgroundColor: '#DBE4C6',
    borderRadius: 20
  },
  buttonText: {
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    fontSize: 20
  }
});
