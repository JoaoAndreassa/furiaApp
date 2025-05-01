import React, { useEffect, useState, useRef } from "react";
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Animated,
	ActivityIndicator,
	KeyboardAvoidingView,
	SafeAreaView,
  Platform,
} from "react-native";
import { colors, fontSizes } from "../styles/theme";
import { AnimatedSoonText } from "../components/AnimatedSoonText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { StatusBar } from "expo-status-bar";

export const HomeScreen = ({ navigation }: any) => {
	const [name, setName] = useState("Fã");
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const fadeAnims = useRef<Animated.Value[]>([]).current;

	const games = [
		{
			title: "CS:GO",
			logo: require("../assets/cs-logo.png"),
			available: true,
		},
		{
			title: "League of Legends",
			logo: require("../assets/lol-logo.png"),
			available: false,
		},
		{
			title: "Rocket-League",
			logo: require("../assets/rl-logo.png"),
			available: false,
		},
	];

	useEffect(() => {
		async function fetchProfile() {
			try {
				const token = await AsyncStorage.getItem("@furiafans:token");
				const response = await api.get("/profile", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setName(response.data.name || "Fã");
				setAvatarUrl(response.data.avatarUrl || null);
			} catch (err) {
				console.error("Erro ao buscar dados do usuário:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchProfile();
	}, []);

	// animações dos cards
	useEffect(() => {
		games.forEach((_, i) => {
			fadeAnims[i] = new Animated.Value(0);
			Animated.timing(fadeAnims[i], {
				toValue: 1,
				duration: 500,
				delay: i * 150,
				useNativeDriver: true,
			}).start();
		});
	}, []);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.gold3} />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
			<StatusBar style="light" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView contentContainerStyle={styles.container}>
					{/* TOPO COM AVATAR, NOME E MENU */}
					<View style={styles.topBar}>
						<TouchableOpacity
							onPress={() => navigation.navigate("EditProfile")}
							style={styles.profileInfo}
						>
							{avatarUrl ? (
								<Image source={{ uri: avatarUrl }} style={styles.avatar} />
							) : (
								<View style={styles.avatarPlaceholder}>
									<Text style={styles.avatarInitial}>{name[0]}</Text>
								</View>
							)}
							<Text style={styles.helloText}>Olá, {name}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => navigation.openDrawer()}
							style={styles.menuButton}
						>
							<Text style={styles.menuText}>☰</Text>
						</TouchableOpacity>
					</View>

					<Image
						source={require("../assets/furia-logo2.png")}
						style={styles.logo}
						resizeMode="contain"
					/>
					<Text style={styles.title}>Escolha seu jogo</Text>

					{games.map((game, index) => (
						<Animated.View
							key={game.title}
							style={{
								opacity: fadeAnims[index] || 1,
								transform: [
									{
										scale: fadeAnims[index]
											? fadeAnims[index].interpolate({
													inputRange: [0, 1],
													outputRange: [0.9, 1],
											  })
											: 1,
									},
								],
							}}
						>
							<TouchableOpacity
								onPress={() => {
									if (game.available) {
										navigation.navigate("GameMenu", { game });
									}
								}}
								disabled={!game.available}
								style={[styles.gameCard, !game.available && styles.disabledCard]}
								activeOpacity={0.8}
							>
								<Image
									source={game.logo}
									style={styles.gameLogo}
									resizeMode="contain"
								/>
								<Text style={styles.gameTitle}>{game.title}</Text>
								{!game.available && <AnimatedSoonText />}
							</TouchableOpacity>
						</Animated.View>
					))}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		backgroundColor: colors.backgroundMenu,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flexGrow: 1,
		backgroundColor: colors.backgroundMenu,
		alignItems: "center",
		padding: 22,
		paddingBottom: 40,
	},
	topBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginBottom: 12,
		marginTop: 30,
	},
	profileInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 8,
	},
	avatarPlaceholder: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#333",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 8,
	},
	avatarInitial: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	helloText: {
		color: colors.gold2,
		fontSize: fontSizes.p,
		fontFamily: "Nunito_400Regular",
	},
	menuButton: {
		padding: 6,
		paddingHorizontal: 13,
		backgroundColor: colors.gold3,
		borderRadius: 6,
	},
	menuText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.black,
	},
	logo: {
		width: 180,
		height: 180,
		marginBottom: 24,
	},
	title: {
		fontSize: fontSizes.h2,
		fontFamily: "Saira_700Bold",
		color: colors.gold2,
		marginBottom: 32,
		textAlign: "center",
	},
	gameCard: {
		backgroundColor: "#1a1a1a",
		borderRadius: 10,
		padding: 16,
		alignItems: "center",
		marginBottom: 16,
		width: 300,
	},
	disabledCard: {
		opacity: 0.5,
	},
	gameLogo: {
		width: 80,
		height: 80,
		marginBottom: 12,
	},
	gameTitle: {
		fontSize: fontSizes.h4,
		fontFamily: "Saira_700Bold",
		color: colors.gold2,
	},
});
