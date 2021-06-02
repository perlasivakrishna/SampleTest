import React, { useEffect, useState } from 'react';
import {Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Awesome app',
            headerRight: () => (
              <Button
                onPress={() => {
                  navigation.navigate('Favorites')
                }}
                title="See Favorites"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
