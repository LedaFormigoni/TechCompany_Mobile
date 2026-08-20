import { View, ImageBackground, Text } from "react-native";

export default function Inicial() {
  return (
    <View className="flex-1">
          <ImageBackground
            source={require("@/assets/images/fotofundo.png")}
            resizeMode="cover"
            className="flex-1 justify-center opacity-85"
          >
            <View className="flex justify-start">
              <Image
                source={require("@/assets/images/logoTech.png")}
                className="w-[200px] h-[100px]"
              />
            </View>
            <Text>Teste</Text>
          </ImageBackground>
        </View>
  );
}
