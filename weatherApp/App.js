import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown'

import UmbrellaIcon from './assets/Icons/WeatherAppIcons/Umbrella.png';
import SunglassesIcon from './assets/Icons/WeatherAppIcons/Sunglasses.png';
import SunIcon from './assets/Icons/Sun.png'
import ChillIcon from './assets/Icons/WeatherAppIcons/Coat.png';
import MoonIcon from './assets/Icons/Moon.png';
import HotIcon from './assets/Icons/WeatherAppIcons/Melted Face.png';
import SnowIcon from './assets/Icons/WeatherAppIcons/Mittens.png';
import ColdIcon from './assets/Icons/WeatherAppIcons/Scarf.png';
import smileyFaceIcon from './assets/Icons/WeatherAppIcons/Smiling Face.png';
import MildIcon from './assets/Icons/WeatherAppIcons/TShirt.png';
import WarmIcon from './assets/Icons/WeatherAppIcons/RunningShirt.png';


const cities = ["Vancouver", "Beijing", "Yukon"]
// let date;
// let currTime;

export default function App() {
  // weatherData holds the weather data of the current location
  // processWeatherData is a function that updates weatherData
  // const [weatherData, processWeatherData] = useState(0); // initialize to 0 degrees 
  const [currentTemperature, setCurrentTemperature] = useState(""); // initialize to empty string
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dailyPrecipitationProbabilityMax, setDailyPrecipitationProbabilityMax] = useState("");
  const VancouverWeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=-123.12&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=America%2FLos_Angeles";
  const [hourlyTemperatures, setHourlyTemperatures] = useState([]);
  const BeijingWeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=39.91&longitude=116.40&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=Asia%2FTokyo";
  const YukonWeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=60.72&longitude=-135.05&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&current_weather=true&timezone=America%2FLos_Angeles";

  let currentCity = "Vancouver";

  const getWeatherDataFromApi = () => {
    let weatherURL;
    if (currentCity === "Vancouver") {
        weatherURL = VancouverWeatherURL;
      } else if (currentCity === "Beijing") {
        weatherURL = BeijingWeatherURL;
      } else if (currentCity === "Yukon") {
        weatherURL = YukonWeatherURL;
      }
    fetch(weatherURL)
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
      let time = result.current_weather.time;
      setDate(time.split("T")[0]);
      setTime(time.split("T")[1]);
      // currTime = time.split("T")[1];
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
    getWeatherDataFromApi();
  }, [])

  const chooseOutfit = ((temperature) => {
    console.log(temperature);
    if (temperature <= 0) return SnowIcon;
    else if (temperature > 0 && temperature <=7) return ChillIcon;
    else if (temperature > 7 && temperature <=14) return ColdIcon;
    else if (temperature > 14 && temperature <=21 ) return MildIcon;
    else if (temperature > 21 && temperature <= 29) return WarmIcon;
    else if (temperature > 29) return HotIcon;
  }) 
  
  console.log(chooseOutfit(currentTemperature));

  const chooseAccessories = (precipitation) => {
    if (precipitation <= 50) return SunglassesIcon;
    else return UmbrellaIcon;
  }

  const chooseDayNight = (time) => {
  time = time.split(":")[0];
  if (Number(time) >= 7 && Number(time) < 18) return SunIcon;
  else if (Number(time) >= 19 && Number(time) < 6) return MoonIcon;
  }

  return (
    <View style={styles.container}>

    <Text style = {styles.locationText}> {date} {time} </Text>
    

    <Image style = {styles.moonIcon} source = {chooseDayNight(time)} />
   
 

    <Text style = {styles.locationText}> {currentTemperature + "\u00B0" + "C" + "      "+ "Rain: " + dailyPrecipitationProbabilityMax + "\%"} </Text>
    
  
    <Image style = {styles.umbrellaLogo} source = {chooseOutfit(currentTemperature)} />
    
    <Image style = {styles.umbrellaLogo} source = {chooseAccessories(dailyPrecipitationProbabilityMax)} />
    <Text style = {styles.whiteSpace}> {" "} </Text>
   


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
    currentCity = cities[index];
	  getWeatherDataFromApi();
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
    width: 80,
    height: 80,
  },
  tShirtLogo: {
    width: 80,
    height: 80,
  },
  sunglassesLogo: {
    width: 80,
    height: 80,
  },
  dropdown: {
    maxHeight: 100,
    color: '#FFFFFF',
    backgroundColor: 'white'
  },
  button: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 20
  },
  buttonText: {
    fontFamily: 'helvetica',
    fontWeight: 'bold',
    fontSize: 20
  },
  whiteSpace: {
    width: 25,
    height: 25,
    }
});
