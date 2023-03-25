import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';


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
      <Text style = {styles.locationText}>Location</Text>
      <TextInput style = {styles.input} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5372F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: { 
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
