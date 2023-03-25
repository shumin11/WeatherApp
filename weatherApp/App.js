import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useState, useEffect} from 'react';

export default function App() {
  const [quote, setQuote] = useState("")

  const randomQuote = () => {
    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(result => {
      console.log(result)
      setQuote(result.content)
    })
  }

  useEffect = (()=> {
    randomQuote()
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.quoteContainer}>
       <Text style = {styles.titleText}>Quote of the day</Text>
       <Text style = {styles.quoteText}>{quote}</Text>
       <TouchableOpacity onPress = {randomQuote} style= {styles.buttonStyle}>
         <Text style = {styles.buttonText}>New Quote</Text>
       </TouchableOpacity>
      </View>
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
  quoteContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20
  },
  titleText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 20
  },
  quoteText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 1.1,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#5372F0',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: 'center'
  }
});
