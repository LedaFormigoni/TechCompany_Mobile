import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Footer() {
  return (
    <View className="text-white flex flex-row items-center justify-center gap-2 h-24 bg-[#110991]">
      <AntDesign name="copyright" size={12} color="#ffffff" />
      <Text className="text-white" >2026 - Todos os direitos reservados</Text>
    </View>
  );
}
