import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import CategoriesComponent from "../components/CategoriesComponent";

const CategoriesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredData = data.filter((item) =>
    item.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCategory = ({ item }) => (
    <CategoriesComponent item={item} onPress={handleOnPressCategory} />
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
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
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius:8,
    padding:10
  },
});

export default CategoriesScreen;
