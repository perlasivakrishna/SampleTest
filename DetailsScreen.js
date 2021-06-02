import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function DetailsScreen({ route, navigation }) {
  const details = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>JobID: {details.id}</Text>
      <Text>Title: {details.title}</Text>
    </View>
  );
}

export default DetailsScreen
