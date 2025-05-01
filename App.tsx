import React from 'react';
import { useAppFonts } from './src/styles/fonts';
import { AppRoutes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import "react-native-gesture-handler";

export default function App() {
  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
