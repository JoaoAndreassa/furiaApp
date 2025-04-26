import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { colors, fontSizes } from "../styles/theme";

export const AnimatedSoonText = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.soonText,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      Em breve...
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  soonText: {
    marginTop: 8,
    fontSize: fontSizes.p,
    color: colors.gray2,
    fontFamily: "Nunito_400Regular",
    fontStyle: "italic",
  },
});
