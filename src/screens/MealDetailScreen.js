import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, Button } from "react-native";
import axios from "axios";

const MealDetailScreen = ({ route }) => {
  const { mealId, mealName } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meal, setMeal] = useState(null);

  const fetchMealDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );

      const mealsArray = response.data.meals;

      if (mealsArray && mealsArray.length > 0) {
        setMeal(mealsArray[0]);
      } else {
        throw new Error("No meal details found");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal detail!", error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchMealDetail();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching meal detail!</Text>
      </View>
    );
  }

  const ingredientIds = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredientIds.push(i.toString());
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.subtitle}>{meal.strArea}</Text>

      {/* Displaying Meal Image */}
      <Image
        style={styles.image}
        source={{ uri: meal.strMealThumb }}
        resizeMode="cover"
      />

      <View style={styles.divider} />

      {/* Displaying Ingredients */}
      <Text style={styles.instruction_title}>Ingredients:</Text>
      {ingredientIds.map((id) => (
        <Text style={styles.ingredient} key={id}>
          - {meal[`strMeasure${id}`]} of {meal[`strIngredient${id}`]}
        </Text>
      ))}

      <View style={styles.divider} />

      {/* Displaying Instructions */}
      <Text style={[styles.instruction_title, { marginTop: 8 }]}>
        Instructions:
      </Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>

      {/* Add any other details you want to display */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 16,
  },
  instruction_title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 4,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MealDetailScreen;
