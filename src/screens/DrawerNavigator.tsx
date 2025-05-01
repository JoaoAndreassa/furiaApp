import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./HomeScreen";
import { EditProfileScreen } from "./EditProfileScreen";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, fontSizes } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

const Drawer = createDrawerNavigator();

// Componente customizado para o conteúdo do Drawer
function CustomDrawerContent() {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<{ name: string; avatarUrl: string | null }>({
    name: "Fã",
    avatarUrl: null,
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = await AsyncStorage.getItem("@furiafans:token");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({
          name: response.data.name || "Fã",
          avatarUrl: response.data.avatarUrl || null,
        });
      } catch (err) {
        console.error("Erro ao carregar usuário no menu:", err);
      }
    }

    fetchUser();
  }, []);

  async function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("@furiafans:token");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.drawerContent}>
      <View style={styles.profileBox}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>
              {user.name?.[0]?.toUpperCase() || "?"}
            </Text>
          </View>
        )}
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.drawerText}>🏠 Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.drawerText}>📝 Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.drawerItem, { marginTop: 24 }]}
        onPress={handleLogout}
      >
        <Text style={[styles.drawerText, { color: "#EF4444" }]}>🚪 Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={() => <CustomDrawerContent />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 64,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarInitial: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    fontSize: fontSizes.p,
    color: colors.gold2,
    fontFamily: "Saira_700Bold",
  },
  drawerItem: {
    paddingVertical: 14,
  },
  drawerText: {
    fontSize: fontSizes.h4,
    fontFamily: "Saira_700Bold",
    color: colors.gold2,
  },
});
