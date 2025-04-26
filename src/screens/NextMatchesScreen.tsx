import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { colors, fontSizes } from "../styles/theme";
import mockMatches from "../assets/matches.json"; 


export const NextMatchesScreen = ({ route, navigation }: any) => {
	interface Match {
		id: number;
		opponent: string;
		date: string;
		event: string;
	  }
	  

	const { game } = route.params;
	const [matches, setMatches] = useState<Match[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchMatches = async () => {
		try {
			// Aqui pegamos os dados falsos (mockados)
			let furiaMatches = mockMatches;

			// Simula um pequeno carregamento de 1 segundo (opcional, só pra UX ficar suave)
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setMatches(furiaMatches);
		} catch (error) {
			console.error("Erro ao buscar partidas:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMatches();
	}, []);

	const renderItem = ({ item }: any) => {
		try {
			return (
				<View style={styles.card}>
					<Text style={styles.opponent}>
						Vs {item.opponent}
					</Text>
					<Text style={styles.date}>
						{item.date
							? new Date(item.date).toLocaleString()
							: "Data não definida"}
					</Text>
					<Text style={styles.event}>
						{item.event || "Evento não definido"}
					</Text>
				</View>
			);
		} catch (error) {
			console.error("Erro ao renderizar partida:", error);
			return <Text style={{ color: "red" }}>Erro ao exibir partida</Text>;
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{game.title} - Próximos Jogos</Text>

			{loading ? (
				<ActivityIndicator
					size="large"
					color={colors.gold2}
					style={{ marginTop: 20 }}
				/>
			) : matches.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>Nenhuma partida futura encontrada.</Text>

					<TouchableOpacity
						style={styles.historyButton}
						onPress={() => navigation.navigate("PastMatches", { game })}
					>
						<Text style={styles.historyButtonText}>Ver Histórico de Partidas</Text>
					</TouchableOpacity>
				</View>
			) : (
				<FlatList
					data={matches}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					contentContainerStyle={{ paddingTop: 24 }}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 24,
	},
	title: {
		fontSize: fontSizes.h2,
		color: colors.gold2,
		fontFamily: "Saira_700Bold",
		textAlign: "center",
		marginBottom: 16,
	},
	card: {
		backgroundColor: "#1a1a1a",
		borderRadius: 10,
		padding: 16,
		marginBottom: 12,
	},
	opponent: {
		fontSize: fontSizes.h4,
		color: colors.gold3,
		fontFamily: "Saira_700Bold",
	},
	date: {
		fontSize: fontSizes.p,
		color: colors.gray1,
		marginTop: 4,
		fontFamily: "Nunito_400Regular",
	},
	event: {
		fontSize: fontSizes.p,
		color: colors.gray2,
		fontStyle: "italic",
		marginTop: 2,
	},
	emptyContainer: {
		alignItems: "center",
		marginTop: 50,
	},
	emptyText: {
		color: colors.white,
		fontSize: fontSizes.p,
		fontFamily: "Nunito_400Regular",
		marginBottom: 16,
	},
	historyButton: {
		backgroundColor: colors.gold2,
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	historyButtonText: {
		color: colors.black,
		fontFamily: "Saira_700Bold",
		fontSize: fontSizes.p,
	},
});
