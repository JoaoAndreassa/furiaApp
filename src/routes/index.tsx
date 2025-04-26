import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { GameMenuScreen } from "../screens/GameMenuScreen";
import { NextMatchesScreen } from "../screens/NextMatchesScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { TeamScreen } from "../screens/TeamScreen";

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Login"
			>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="GameMenu" component={GameMenuScreen} />
				<Stack.Screen name="NextMatches" component={NextMatchesScreen} />
				<Stack.Screen name="Statistics" component={StatisticsScreen} />
				<Stack.Screen name="Team" component={TeamScreen} />


			</Stack.Navigator>
		</NavigationContainer>
	);
};
