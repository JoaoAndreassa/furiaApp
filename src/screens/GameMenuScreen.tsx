import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors, fontSizes } from "../styles/theme";

export const GameMenuScreen = ({ route, navigation }: any) => {
  const { game } = route.params;

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen, { game });
  };

  return (
    <View style={styles.container}>
      <Image source={game.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>{game.title}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigate("NextMatches")}>
        <Text style={styles.buttonText}>Próximos Jogos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigate("Statistics")}>
        <Text style={styles.buttonText}>Estatísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigate("Team")}>
        <Text style={styles.buttonText}>Conheça o Time</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: 100,
  },
  title: {
    fontSize: fontSizes.h2,
    color: colors.gold2,
    fontFamily: "Saira_700Bold",
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.gold3,
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: colors.black,
    fontSize: fontSizes.h4,
    fontFamily: "Saira_700Bold",
  },
});
