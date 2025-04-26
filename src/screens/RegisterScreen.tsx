import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
    Alert,
} from "react-native";
import { colors, fontSizes } from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";

export const RegisterScreen = ({ navigation }: any) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register } = useAuth();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Criar Conta</Text>

			<TextInput
				placeholder="Nome"
				placeholderTextColor={colors.gray2}
				style={styles.input}
				value={name}
				onChangeText={setName}
			/>

			<TextInput
				placeholder="Email"
				placeholderTextColor={colors.gray2}
				style={styles.input}
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
			/>

			<TextInput
				placeholder="Senha"
				placeholderTextColor={colors.gray2}
				style={styles.input}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					register({ name, email, password });
					Alert.alert("Sucesso", "Conta criada com sucesso!");
					navigation.navigate("Login");
				}}
			>
				<Text style={styles.buttonText}>Registrar</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text style={styles.linkText}>Já tenho uma conta</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 24,
		justifyContent: "center",
	},
	title: {
		fontSize: fontSizes.h1,
		fontFamily: "Saira_700Bold",
		color: colors.gold2,
		marginBottom: 24,
		textAlign: "center",
	},
	input: {
		backgroundColor: "#1a1a1a",
		borderRadius: 8,
		padding: 16,
		fontSize: fontSizes.p,
		color: colors.white,
		marginBottom: 16,
		fontFamily: "Nunito_400Regular",
	},
	button: {
		backgroundColor: colors.gold3,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	buttonText: {
		color: colors.black,
		fontSize: fontSizes.h4,
		fontFamily: "Saira_700Bold",
	},
	linkText: {
		color: colors.gold2,
		fontSize: fontSizes.p,
		textAlign: "center",
		fontFamily: "Nunito_400Regular",
	},
});
