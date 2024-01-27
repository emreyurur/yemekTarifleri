import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import MealComponent from "../components/MealComponent";

const MealScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast");
      setData(response.data.meals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data!", error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnPressMeal = (mealId, mealName) => {
    navigation.navigate('MealDetailScreen', { mealId, mealName });
  };

  const renderMeal = ({ item }) => (
    <MealComponent item={item} onPress={() => handleOnPressMeal(item.idMeal, item.strMeal)} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error fetching data!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderMeal}
        keyExtractor={(item) => item.idMeal.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "primary",
    padding: 8,
  },
});

export default MealScreen;