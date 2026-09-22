import { View, ImageBackground, Text, Image } from "react-native";
import Botao from "@/components/botao/botao";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import { router } from "expo-router";
export default function Inicial() {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/fotofundo2.png")}
        resizeMode="cover"
        className="flex-1 justify-start items-start opacity-85"
      >
        <View className="flex flex-row justify-around items-center mt-6 w-full">
          <Image
            source={require("@/assets/images/logoTech.png")}
            resizeMode="contain"
            className="w-[120px] h-[120px] "
          />
          <Ionicons
            name="information-circle-outline"
            size={38}
            color="white"
            onPress={() => router.push("/Sobrenos")}
          />
        </View>
        <View className="p-5 ">
          <Text className="text-7xl text-white">TECH</Text>

          <MaskedView maskElement={<Text className="text-7xl">COMPANY</Text>}>
            <LinearGradient
              colors={["#9658F5", "#4B9BFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-7xl opacity-0">COMPANY</Text>
            </LinearGradient>
          </MaskedView>

         <View className="w-20 h-0.5 bg-[#A855F7] mt-8" />

          <Text className=" text-white mt-6">
            Inovação, qualidade e tecnologia em produtos que transformam o seu dia
            a dia.
          </Text>
        </View>
        <View className="flex-row mt-96 gap-16 w-full justify-center">
          <Botao
            className="w-36 h-14 bg-[#010b6b] "
            onPress={() => router.push("/Login")}
          >
            <View className="justify-center items-center flex-row gap-2">
              <Ionicons name="log-in-outline" size={24} color="white" />
              <Text className="text-white text-xl">Entrar</Text>
            </View>
          </Botao>
          <Botao
            className="w-36 h-14 bg-transparent border-2 border-white p-2"
            onPress={() => router.push("/Cadastro")}
          >
            <View className="justify-center items-center flex-row gap-1">
              <Ionicons name="person-outline" size={20} color="white" />
              <Text className="text-white text-xl">Cadastrar</Text>
            </View>
          </Botao>
        </View>
      </ImageBackground>
    </View>
  );
}