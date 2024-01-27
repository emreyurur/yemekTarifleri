import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

const CategoriesComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <View style={styles.image_container}>
          <FastImage
            style={styles.image}
            source={{
              uri: item.strCategoryThumb,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.text}>{item.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECEFF1',
    marginVertical: 8,
    padding: 5,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#ECEFF1',
  },
  image_container: {
    borderColor: "primary",
    borderRadius: 50,
    borderWidth: 1,
  },
  text: {
    marginLeft: 16,
    fontSize: 24,
  },
});

export default CategoriesComponent;
