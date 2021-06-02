
import 'react-native-gesture-handler';
import Moment from 'react-moment';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, Button, View, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [array, setArray] = useState([]);

  const [favoritesArray, setFavoritesArray] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@Favorites', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Favorites')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData().then(json =>{
      setFavoritesArray(json);
      console.log(favoritesArray);
    })
    setLoading(true);
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0)
          getDetailsForJobs(json)
      })
      .catch((error) => console.error(error)).finally(() => {
        setLoading(false);
      });
  }, []);


  const getDetailsForJobs = async (data) => {
    const detailsArray = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const itemData = await getJobDetails(item);
      detailsArray.push(itemData);
      setArray(array => [...array, itemData]);
    }
  }

  const getJobDetails = async (jobId) => {
    let response = await fetch('https://hacker-news.firebaseio.com/v0/item/' + jobId + '.json?print=pretty')
    try {
      response = response.json();
      return response
    } catch (error) {
      console.log(error);
    }
  }

  const checkFavorite = (item) => {
    if (isFavorite(item)) {
      const arr = favoritesArray.filter((eachitem) => eachitem.id !== item.id);
      setFavoritesArray(arr);
    } else {
      setFavoritesArray(favoritesArray => [...favoritesArray, item]);
    }
    storeData(favoritesArray)
  }

  const isFavorite = (item) => {
    if (favoritesArray.filter(function(e) { return e.id == item.id; }).length > 0) {
      return true
    }
    return false
  }

  return (
    <View style={{ flex: 1, padding: 24, }}>
      <FlatList
        data={array}
        keyExtractor={(item) => (item.id).toString()}
        renderItem={({ item }) => (
          <TouchableHighlight underlayColor="#DDDDDD"
            onPress={() => {
              navigation.navigate('Details', item)
            }}>
            <View style = {styles.itemContent}>
              <Text style = {{width: 200}} >{item.id} created at <Moment element={Text} format="YYYY/MM/DD HH:mm" unix>{item.time}</Moment></Text>
              <View style = {{width: 200, textAlign: 'center', flex: 1}}>
              <Button
                onPress={() => {
                  console.log('favorite');
                  checkFavorite(item);
                }}
                title= {isFavorite(item) ? "Un Favorite" : "Set as Favorite"}
                color= {isFavorite(item) ? "#000" : "#008000"}
              />
            </View>

            </View>
          </TouchableHighlight>
        )}
      />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color="black"
            style={{ margin: 15 }} size="large" />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );


}
export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    backgroundColor: "#00000080",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
});
