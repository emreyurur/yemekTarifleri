import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const MealComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{ uri: item.strMealThumb, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.strMeal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECEFF1",
    marginVertical: 8,
    padding: 5,
    borderRadius: 10,
  },
  image: {
    height: 200,
    borderRadius: 10,
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MealComponent;
