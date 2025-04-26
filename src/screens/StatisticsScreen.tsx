import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors, fontSizes } from "../styles/theme";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Ícones aqui

export const StatisticsScreen = ({ route }: any) => {
  const { game } = route.params;

  const stats = [
    { label: "Maps played", value: 1355, icon: "map" },
    { label: "W/D/L", value: "806 / 2 / 547", icon: "trophy" },
    { label: "Total kills", value: 116894, icon: "crosshairs" },
    { label: "Total deaths", value: 109262, icon: "skull" },
    { label: "Rounds played", value: 34181, icon: "circle" },
    { label: "K/D Ratio", value: 1.07, icon: "chart-line" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.title} - Estatísticas</Text>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <FontAwesome5
              name={stat.icon}
              size={24}
              color={colors.gold2}
              style={{ marginBottom: 8 }}
            />
            <AnimatedNumber value={stat.value} />
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Componente de contagem animada
const AnimatedNumber = ({ value }: { value: number | string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const isNumber = typeof value === "number";

  const isDecimal = isNumber && !Number.isInteger(value);

  useEffect(() => {
    if (isNumber) {
      const listenerId = animatedValue.addListener(({ value }) => {
        setDisplayValue(value);
      });

      Animated.timing(animatedValue, {
        toValue: Number(value),
        duration: 2000,
        useNativeDriver: false,
      }).start();

      return () => {
        animatedValue.removeListener(listenerId);
      };
    }
  }, [animatedValue, value, isNumber]);

  return (
    <Text style={styles.statValue}>
      {isNumber
        ? isDecimal
          ? Number(displayValue).toFixed(2) // 2 casas decimais (ex: 1.07)
          : Math.floor(displayValue) // inteiro normal (ex: 1355)
        : value}
    </Text>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop:50,
  },
  title: {
    fontSize: fontSizes.h2,
    color: colors.gold2,
    fontFamily: "Saira_700Bold",
    textAlign: "center",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#2C3E50",
    width: "48%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: fontSizes.h2,
    color: colors.gold2,
    fontFamily: "Saira_700Bold",
  },
  statLabel: {
    fontSize: fontSizes.p,
    color: colors.white,
    marginTop: 8,
    fontFamily: "Nunito_400Regular",
    textAlign: "center",
  },
});
