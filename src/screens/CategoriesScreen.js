import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView,View,Text,StyleSheet,FlatList } from "react-native";
import MealScreen from "../screens/MealScreen";


const CategoriesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setData(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data!', error);
        setLoading(false);
        setError(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleOnPressCategory = (item) => {
      navigation.navigate("MealScreen", { category: item });
    };
  
    const renderCategory = ({ item }) => (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText} onPress={() => handleOnPressCategory(item)}>
          {item.strCategory}
        </Text>
      </View>
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
          renderItem={renderCategory}
          keyExtractor={(item) => item.idCategory.toString()}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#86B6F6",
      padding: 8,
      flex: 1
    },
    categoryContainer: {
      borderBottomWidth: 1,
      borderColor: "black",
      padding: 10,
    },
    categoryText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign:"center"
    },
  });
  
  export default CategoriesScreen;
  