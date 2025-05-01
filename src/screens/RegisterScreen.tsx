import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { api } from "../services/api";
import { colors, fontSizes } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha nome, email e senha obrigatoriamente.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      setLoading(false);
      Alert.alert("Sucesso", "Conta criada com sucesso! Faça login.");
      navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      const err = error as any;
      console.error(err.response?.data || err.message);
      Alert.alert(
        "Erro no cadastro",
        err.response?.data?.error?.message || "Tente novamente."
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Criar Conta</Text>

          <TextInput
            placeholder="Nome"
            placeholderTextColor={colors.gray2}
            style={[styles.input, styles.inputSpacing]}
            value={name}
            onChangeText={setName}
            textAlign="left"
            textAlignVertical="center"
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.gray2}
            style={[styles.input, styles.inputSpacing]}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            textAlign="left"
            textAlignVertical="center"
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor={colors.gray2}
            style={[styles.input, styles.inputSpacing]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            textAlign="left"
            textAlignVertical="center"
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Já tenho uma conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.background,
    flexGrow: 1,
    alignItems: "center",
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
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: fontSizes.p,
    color: colors.white,
    fontFamily: "Nunito_400Regular",
  },
  inputSpacing: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.gold3,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
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
