import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, fontSizes } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Profile = {
  birthDate: Date | null;
  city: string;
  state: string;
  instagram: string;
  twitter: string;
  twitch: string;
  favoritePlayer: string;
  favoriteGame: string;
  avatarUrl?: string;
  name?: string;
};

export const EditProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<Profile>({
    birthDate: null,
    city: "",
    state: "",
    instagram: "",
    twitter: "",
    twitch: "",
    favoritePlayer: "",
    favoriteGame: "",
    avatarUrl: "",
    name: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = await AsyncStorage.getItem("@furiafans:token");
        if (!token) {
          navigation.navigate("Login");
          return;
        }

        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const {
          birthDate,
          city,
          state,
          instagram,
          twitter,
          twitch,
          favoritePlayer,
          favoriteGame,
          avatarUrl,
          name,
        } = response.data;

        setProfile({
          birthDate: birthDate ? new Date(birthDate) : null,
          city: city || "",
          state: state || "",
          instagram: instagram || "",
          twitter: twitter || "",
          twitch: twitch || "",
          favoritePlayer: favoritePlayer || "",
          favoriteGame: favoriteGame || "",
          avatarUrl: avatarUrl || "",
          name: name || "",
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível carregar o perfil.");
        navigation.navigate("Login");
      }
    }

    loadProfile();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const token = await AsyncStorage.getItem("@furiafans:token");

      await api.patch(
        "/profile",
        {
          birthDate: profile.birthDate?.toISOString(),
          city: profile.city,
          state: profile.state,
          instagram: profile.instagram,
          twitter: profile.twitter,
          twitch: profile.twitch,
          favoritePlayer: profile.favoritePlayer,
          favoriteGame: profile.favoriteGame,
          avatarUrl: profile.avatarUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.navigate("Main");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  function handleDateChange(event: any, selectedDate?: Date) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setProfile({ ...profile, birthDate: selectedDate });
    }
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // 👈 permite corte
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setProfile({ ...profile, avatarUrl: imageUri });
    }
  }

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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={handleSelectAvatar}>
                {profile.avatarUrl ? (
                  <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitial}>
                      {profile.name?.[0]?.toUpperCase() || "?"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Editar Perfil</Text>

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
              activeOpacity={0.7}
            >
              <View style={styles.dateWrapper}>
                <Text
                  style={[
                    styles.dateText,
                    { color: profile.birthDate ? colors.white : colors.gray2 },
                  ]}
                >
                  {profile.birthDate
                    ? new Date(profile.birthDate).toLocaleDateString("pt-BR")
                    : "Data de nascimento"}
                </Text>
                <Text style={styles.dateIcon}>📅</Text>
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={profile.birthDate ?? new Date(2000, 0, 1)}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            {[
              { label: "Cidade", key: "city" },
              { label: "Estado", key: "state" },
              { label: "Instagram", key: "instagram" },
              { label: "Twitter", key: "twitter" },
              { label: "Twitch", key: "twitch" },
              { label: "Player Favorito", key: "favoritePlayer" },
              { label: "Game Favorito", key: "favoriteGame" },
            ].map(({ label, key }) => (
              <TextInput
                key={key}
                placeholder={label}
                placeholderTextColor={colors.gray2}
                style={styles.input}
                value={(profile as any)[key]}
                onChangeText={(text) =>
                  setProfile((prev) => ({ ...prev, [key]: text }))
                }
              />
            ))}

            <TouchableOpacity
              style={[styles.button, saving && { opacity: 0.6 }]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.buttonText}>
                {saving ? "Salvando..." : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		padding: 24,
		backgroundColor: colors.background,
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center", // 👈 centralizado igual o register
	},
	avatarContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	avatarPlaceholder: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#333",
		alignItems: "center",
		justifyContent: "center",
	},
	avatarInitial: {
		color: "#fff",
		fontSize: 36,
		fontWeight: "bold",
	},
	title: {
		fontSize: fontSizes.h2,
		fontFamily: "Saira_700Bold",
		color: colors.gold2,
		marginBottom: 24,
		textAlign: "center",
	},
	dateWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	dateText: {
		fontSize: fontSizes.p,
		fontFamily: "Nunito_400Regular",
	},
	dateIcon: {
		fontSize: 18,
	},
	input: {
		width: "100%",
		backgroundColor: colors.backgroundMenu, // igual ao usado no login e registro
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: "#fff",
		fontFamily: "Nunito_400Regular",
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
	scrollContent: {
		flexGrow: 1,
	},
});
