import React, { useState, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Animated,
	Pressable,
	Modal,
	Linking,
} from "react-native";
import { colors, fontSizes } from "../styles/theme";
import * as Haptics from "expo-haptics";

export const TeamScreen = ({ route }: any) => {
	const { game } = route.params;

	const players = [
		{
			name: "FalleN",
			fullName: "Gabriel Toledo",
			age: 33,
			country: "🇧🇷",
			prizeMoney: "$1,228,871",
			team: "FURIA",
			image: require("../assets/falleN.webp"),
			socials: {
				twitch: "https://www.twitch.tv/gafallen",
				instagram: "https://www.instagram.com/fallen/",
			},
		},
		{
			name: "yuurih",
			fullName: "Yuri Santos",
			age: 25,
			country: "🇧🇷",
			prizeMoney: "$409,270",
			team: "FURIA",
			image: require("../assets/yuurih.webp"),
			socials: {
				instagram: "https://www.instagram.com/yuurihfps/",
			},
		},
		{
			name: "YEKINDAR",
			fullName: "Mareks Gaļinskis",
			age: 25,
			country: "🇱🇻",
			prizeMoney: "$475,292",
			team: "FURIA",
			image: require("../assets/yekindar.webp"),
			socials: {
				twitch: "https://www.twitch.tv/yekindar",
				instagram: "https://www.instagram.com/yek1ndar/",
			},
		},
		{
			name: "KSCERATO",
			fullName: "Kaike Cerato",
			age: 25,
			country: "🇧🇷",
			prizeMoney: "$405,656",
			team: "FURIA",
			image: require("../assets/kscerato.webp"),
			socials: {
				instagram: "https://www.instagram.com/kscerato/",
			},
		},
		{
			name: "molodoy",
			fullName: "Danil Golubenko",
			age: 20,
			country: "🇦🇷",
			prizeMoney: "$2,114",
			team: "FURIA",
			image: require("../assets/molodoy.webp"),
			socials: {
				instagram: "https://www.instagram.com/danil.molodoy_/",
			},
		},
	];

	const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState(false);

	// Animações do Modal
	const opacityAnim = useRef(new Animated.Value(0)).current;
	const scaleAnimModal = useRef(new Animated.Value(0.8)).current;

	const openModal = (player: any) => {
		setSelectedPlayer(player);
		setModalVisible(true);

		Animated.parallel([
			Animated.timing(opacityAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnimModal, {
				toValue: 1,
				friction: 6,
				useNativeDriver: true,
			}),
		]).start();
	};

	const closeModal = () => {
		setModalVisible(false);
		opacityAnim.setValue(0);
		scaleAnimModal.setValue(0.8);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>{game.title} - Conheça o Time</Text>

			<View style={styles.playersContainer}>
				{players.map((player, index) => {
					const scaleAnim = useRef(new Animated.Value(1)).current;

					const handlePressIn = () => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						Animated.spring(scaleAnim, {
							toValue: 0.95,
							useNativeDriver: true,
						}).start();
					};

					const handlePressOut = () => {
						Animated.sequence([
							Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }),
							Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
						]).start();

						openModal(player);
					};

					return (
						<Pressable
							key={index}
							onPressIn={handlePressIn}
							onPressOut={handlePressOut}
							style={({ pressed }) => [
								styles.playerCard,
								pressed && styles.playerCardPressed,
							]}
						>
							<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
								<Image
									source={player.image}
									style={styles.playerImage}
									resizeMode="contain"
								/>
								<Text style={styles.playerName}>
									{player.country} {player.name}
								</Text>
							</Animated.View>
						</Pressable>
					);
				})}
			</View>

			{/* Modal com animação */}
			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<View style={styles.modalOverlay}>
					<Animated.View
						style={[
							styles.modalContent,
							{
								opacity: opacityAnim,
								transform: [{ scale: scaleAnimModal }],
							},
						]}
					>
						{selectedPlayer && (
							<>
								<Image
									source={selectedPlayer.image}
									style={styles.modalImage}
									resizeMode="contain"
								/>
								<Text style={styles.modalName}>
									{selectedPlayer.country} {selectedPlayer.name}
								</Text>
								<Text style={styles.modalFullName}>{selectedPlayer.fullName}</Text>
								<Text style={styles.modalInfo}>Idade: {selectedPlayer.age} anos</Text>
								<Text style={styles.modalInfo}>Time atual: {selectedPlayer.team}</Text>
								<Text style={styles.modalInfo}>
									Premiação: {selectedPlayer.prizeMoney}
								</Text>

								{/* Botões sociais */}
								{selectedPlayer.socials && (
									<View style={styles.socialsContainer}>
										{selectedPlayer.socials.twitch && (
											<Pressable
												onPress={() => Linking.openURL(selectedPlayer.socials.twitch)}
												style={styles.socialButton}
											>
												<Text style={styles.socialButtonText}>Twitch</Text>
											</Pressable>
										)}
										{selectedPlayer.socials.instagram && (
											<Pressable
												onPress={() => Linking.openURL(selectedPlayer.socials.instagram)}
												style={styles.socialButton}
											>
												<Text style={styles.socialButtonText}>Instagram</Text>
											</Pressable>
										)}
									</View>
								)}

								<Pressable style={styles.closeButton} onPress={closeModal}>
									<Text style={styles.closeButtonText}>Fechar</Text>
								</Pressable>
							</>
						)}
					</Animated.View>
				</View>
			</Modal>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: colors.background,
		alignItems: "center",
		padding: 24,
		paddingTop: 60,
	},
	title: {
		fontSize: fontSizes.h2,
		color: colors.gold2,
		fontFamily: "Saira_700Bold",
		textAlign: "center",
		marginBottom: 24,
	},
	playersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	playerCard: {
		backgroundColor: "#2C3E50",
		borderRadius: 12,
		padding: 12,
		margin: 8,
		alignItems: "center",
		width: 140,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	playerCardPressed: {
		transform: [{ scale: 0.95 }],
		backgroundColor: "#34495E",
		shadowOpacity: 0.6,
		shadowRadius: 8,
		elevation: 10,
	},
	playerImage: {
		width: 110,
		height: 100,
		borderRadius: 12,
		marginBottom: 8,
		backgroundColor: "#121212",
	},
	playerName: {
		color: colors.gold2,
		fontSize: fontSizes.p - 2,
		fontFamily: "Saira_700Bold",
		textAlign: "center",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "#2C3E50",
		borderRadius: 16,
		padding: 24,
		alignItems: "center",
		width: "80%",
	},
	modalImage: {
		width: 150,
		height: 150,
		borderRadius: 12,
		marginBottom: 16,
	},
	modalName: {
		fontSize: fontSizes.h3,
		color: colors.gold2,
		fontFamily: "Saira_700Bold",
		textAlign: "center",
		marginBottom: 8,
	},
	modalFullName: {
		fontSize: fontSizes.p,
		color: colors.white,
		fontFamily: "Nunito_400Regular",
		marginTop: 4,
		marginBottom: 12,
		textAlign: "center",
	},
	modalInfo: {
		fontSize: fontSizes.p - 2,
		color: colors.gray1,
		fontFamily: "Nunito_400Regular",
		marginBottom: 4,
		textAlign: "center",
	},
	socialsContainer: {
		flexDirection: "row",
		gap: 12,
		marginTop: 16,
	},
	socialButton: {
		backgroundColor: colors.gold2,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	socialButtonText: {
		color: colors.black,
		fontFamily: "Saira_700Bold",
		fontSize: fontSizes.p,
	},
	closeButton: {
		backgroundColor: colors.gold2,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		marginTop: 24,
	},
	closeButtonText: {
		color: colors.black,
		fontFamily: "Saira_700Bold",
		fontSize: fontSizes.p,
	},
});
