import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import coatIcon from './assets/Icons/WeatherApp Icons/Coat.png';
import meltedFaceIcon from './assets/Icons/WeatherApp Icons/Melted Face.png';
import mittensIcon from './assets/Icons/WeatherApp Icons/Mittens.png';
import scarfIcon from './assets/Icons/WeatherApp Icons/Scarf.png';
import smileyFaceIcon from './assets/Icons/WeatherApp Icons/Smiling Face.png';
import sunglassesIcon from './assets/Icons/WeatherApp Icons/Sunglasses.png';
import tShirtIcon from './assets/Icons/WeatherApp Icons/TShirt.png';
import umbrellaIcon from './assets/Icons/WeatherApp Icons/Umbrella.png';

export default function App() {
  // weatherData holds the weather data of the current location
  // processWeatherData is a function that updates weatherData
  const [weatherData, processWeatherData] = useState(0); // initialize to 0 degrees 

  const getweatherDataFromApi = () => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=-123.12&hourly=weatherData_2m,precipitation")
    .then(response => {
      if (!response.ok) {
        throw response; // check the http response code and if isn't ok then throw the response as an error
      }
      return response.json(); // parse the result as JSON
    }).then(result => {
      console.log(result)
      processWeatherData(result.content)
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
    <img style={styles.umbrellaIcon}
    source={require{uri:'./assets/Icons/WeatherApp Icons/umbrella.png'}}/>

      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coatIcon: {
  width: 50,
  height: 50,
  },
  meltedFaceIcon: {
  width: 50,
    height: 50,
    },
    mittensIcon: {
    width: 50,
    height: 50,
    },
    scarfIcon: {
    width: 50,
      height: 50,
      },
    smileyFaceIcon: {
    width: 50,
      height: 50,
      },
    sunglassesIcon: {
    width: 50,
      height: 50,
      },
    tShirtIcon: {
    width: 50,
      height: 50,
      },
    umbrellaIcon: {
    width: 50,
      height: 50,
      },

});
