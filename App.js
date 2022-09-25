import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { Provider as PaperProvider, TextInput, Button } from 'react-native-paper';


export default function App() {

  let image = { uri: "https://w0.peakpx.com/wallpaper/224/496/HD-wallpaper-mountain-full-paisaje.jpg" };
  //let imageBackground = {uri: ""}

  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState('');
  const [search, setSearch] = React.useState("");
  const [infoApi, setInfoApi] = React.useState({});

 

  const key = '32b0f77e23b143fe87200104221809'

  const searchClick = async () => {
    //setInfoApi({});
    //setSearch('');
    
    try {

      const response = await fetch('https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' +search + '&aqi=no', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setInfoApi(result);
      await console.log(result)


     
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    

    <View style={styles.root}>

      <ImageBackground source={image}
      resizeMode="stretch"
      style={styles.image}>

      <View>
<TextInput theme={{ colors: { primary: '#', colors: {
    background: 'white'} } }}
     style={styles.TextInput} 
      label="City"
      value={search}
      onChangeText={search => setSearch(search)}
    />
  <Button icon="share" mode="contained" onPress={(searchClick)}>
    Search
  </Button>
</View>


{loading && <View>
<Text style={styles.cityName}>{ `${infoApi.location.name} , ${infoApi.location.region}`}</Text>
<Text style={styles.dateinfo}>{new Date().toDateString()   }</Text>
<Text style={styles.dateinfo} >{infoApi.current.last_updated.slice(-5)   }</Text>

<Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: infoApi.current.condition.icon.slice(2),
        }}
  />

<Text style={styles.temp}>{ `${infoApi.current.temp_c} C°`   }</Text>

<Text style={styles.cityName}>{ `${infoApi.current.condition.text}`   }</Text>

</View>}
</ImageBackground>

</View>
   
  );
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
  
    
  },

  image: {
    flex: 1,
    //flexDirection: 'column',
    //justifyContent: "center"
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextInput: {
    
    padding: 3,
    paddingVertical: 5,
    marginVertical: 50,
    marginHorizontal: 100,
    backgroundColor: '#fff',
    fontSize: 22,
    borderRadius: 16
  },
  
  cityName: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },

  dateinfo: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },

  temp: {
    color: '#fff',
    fontSize: 60,
    textAlign: 'center',
    marginTop: 20,
  }
});
