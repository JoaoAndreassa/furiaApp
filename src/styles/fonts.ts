import {
    useFonts as useSaira,
    Saira_700Bold,
    Saira_600SemiBold,
    Saira_400Regular,
  } from '@expo-google-fonts/saira';
  
  import {
    useFonts as useNunito,
    Nunito_400Regular,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito';
  
  export const useAppFonts = () => {
    const [sairaLoaded] = useSaira({
      Saira_400Regular,
      Saira_600SemiBold,
      Saira_700Bold,
    });
  
    const [nunitoLoaded] = useNunito({
      Nunito_400Regular,
      Nunito_700Bold,
    });
  
    return sairaLoaded && nunitoLoaded;
  };
  