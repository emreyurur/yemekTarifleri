import React from "react";
import { SafeAreaView,View,Text,StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack=createNativeStackNavigator();

import CategoriesScreen from "./src/screens/CategoriesScreen";
import MealScreen from "./src/screens/MealScreen";
import MealDetailScreen from "./src/screens/MealDetailScreen";

const App=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="MealScreen" component={MealScreen} />
        <Stack.Screen name="MealDetailScreen" component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;