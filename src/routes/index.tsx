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
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { DrawerNavigator } from "../screens/DrawerNavigator";
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
				<Stack.Screen name="Main" component={DrawerNavigator} />
				<Stack.Screen name="GameMenu" component={GameMenuScreen} />
				<Stack.Screen name="NextMatches" component={NextMatchesScreen} />
				<Stack.Screen name="Statistics" component={StatisticsScreen} />
				<Stack.Screen name="Team" component={TeamScreen} />
				<Stack.Screen name="EditProfile" component={EditProfileScreen} />
				
			</Stack.Navigator>
		</NavigationContainer>
	);
};
