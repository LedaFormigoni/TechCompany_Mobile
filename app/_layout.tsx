import { Stack } from "expo-router";
import Header from "../components/Header/Header"
export default function RootLayout() {
  return (
    <Stack screenOptions={{ header: Header }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="Cadastro" />
    </Stack>
  );
}
