import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Image
} from "react-native";
import { colors, fontSizes } from "../styles/theme";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator } from "react-native";

export const LoginScreen = ({ navigation }: any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleLogin = () => {
		setLoading(true);
		setTimeout(() => {
			const success = login(email, password);
			setLoading(false);

			if (success) {
				navigation.navigate("Home"); // 👈 aqui estava "Dashboard"
			} else {
				Alert.alert("Erro", "Email ou senha inválidos.");
			}
		}, 1000);
	};
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/furia-logo2.png")} // substitui por seu logo
				style={styles.logo}
				resizeMode="contain"
			/>
			<Text style={styles.title}>FURIA</Text>

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
				style={[styles.button, loading && { opacity: 0.6 }]}
				onPress={handleLogin}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color={colors.black} />
				) : (
					<Text style={styles.buttonText}>Entrar</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Register")}>
				<Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	logo: {
		width: 180,
		height: 180,
		marginBottom: 24,
	},
	title: {
		fontSize: fontSizes.h1,
		color: colors.gold2,
		fontFamily: "Saira_700Bold",
		marginBottom: 40,
	},
	input: {
		width: "100%",
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
		paddingHorizontal: 40,
		borderRadius: 8,
		marginTop: 8,
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
		marginTop: 12,
	},
});
