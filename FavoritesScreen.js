import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavoritesScreen({ route, navigation }) {

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
  })
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <FlatList
      data={favoritesArray}
      keyExtractor={(item) => (item.id).toString()}
      renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
          </View>
      )}
    />
    </View>
  );
}

export default FavoritesScreen
