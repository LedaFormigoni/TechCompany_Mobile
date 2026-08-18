import { View, Text } from "react-native";
// import logo from "../../assets/images/logoTech.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function Header() {
  return (
    <>
      <View className="w-full h-[100px] bg-[#00007a] flex-row items-center justify-between p-5 pt-10">
        <Entypo name="home" size={35} color="white" />
        {/* <Image source={logo} className="w-[200px] h-[100px]" /> */}
        <Ionicons name="menu" size={35} color="white" />
      </View>
      <View className="h-8 w-50 bg-[#110991]">
        <Text></Text>
      </View>
    </>
  );
}
