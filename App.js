/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import type { Node } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder
} from 'react-native';

const Recipes = [
  { id: 1, name: 'Sketti' },
  { id: 2, name: 'Da chops' },
  { id: 3, name: 'Steak' },
  { id: 4, name: 'Pizz' }
]


const App: () => Node = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        console.log('Released: [x=%s]', pan.x);
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text>buttons go here</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>hello, moonker.</Text>
      </View>
      <Animated.View style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }]
      }}
        {...panResponder.panHandlers}>
        <View style={styles.card.container}>
          <Text style={styles.card.subtitle}>tink of sketti or somethin</Text>
          <Text style={styles.card.title}>dis a pic of grub</Text>
        </View>
      </Animated.View>
    </View>
  );
};


const RecipeCardTouchHandler = (event) => {
  // "nativeEvent": {
  //    "changedTouches": [[Circular]],
  //    "identifier": 1,
  //    "locationX": 163,
  //    "locationY": 207.33333587646484,
  //    "pageX": 196,
  //    "pageY": 380,
  //    "target": 4307,
  //    "timestamp": 1636411534156.8345,
  //    "touches": []
  // },
  console.log('Touched: [x=%s,y=%s]', event.nativeEvent.locationX, event.nativeEvent.locationY);
};

const RecipeCardLongPressHandler = (event) => {
  console.log('Pressed: [x=%s,y=%s]', event.nativeEvent.locationX, event.nativeEvent.locationY);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  center: {
    textAlign: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'dodgerblue',
    fontWeight: 'bold',
    fontSize: 33,
    marginTop: 33,
  },
  card: {
    container: {
      flexDirection: 'column-reverse',
      height: "77%",
      borderRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: 'dodgerblue',
      margin: 33,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 33,
      marginBottom: 11,
      textAlign: 'center',
    },
    subtitle: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 11,
      marginBottom: 33,
      textAlign: 'center',
    }
  },
});

export default App;
