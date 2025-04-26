import React from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors, fontSizes } from "../styles/theme";
import { AnimatedSoonText } from "../components/AnimatedSoonText";

export const HomeScreen = ({ navigation }: any) => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/furia-logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Escolha seu jogo</Text>

      {games.map((game) => (
        <TouchableOpacity
          key={game.title}
          onPress={() => {
            if (game.available) {
              navigation.navigate("GameMenu", { game });
            }
          }}
          disabled={!game.available}
          style={[styles.gameCard, !game.available && styles.disabledCard]}
        >
          <Image source={game.logo} style={styles.gameLogo} resizeMode="contain" />
          <Text style={styles.gameTitle}>{game.title}</Text>
          {!game.available && <AnimatedSoonText />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.backgroundMenu,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingBottom: 40, // um espacinho pra não cortar no final
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
  soonText: {
    marginTop: 8,
    fontSize: fontSizes.p,
    color: colors.gray2,
    fontFamily: "Nunito_400Regular",
    fontStyle: "italic",
  },
});
