import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { colors, fontSizes } from "../styles/theme";

interface GameCardProps {
  title: string;
  logo: any;
  onPress: () => void;
}

export const GameCard = ({ title, logo, onPress }: GameCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.inner}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  inner: {
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  text: {
    color: colors.gold2,
    fontSize: fontSizes.h4,
    fontFamily: "Saira_700Bold",
  },
});
