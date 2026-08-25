import React from "react";
import { Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import CampoTextoGenerico from "@/components/CampoTexto/CampoTexto";
import Header from "@/components/Header/Header";
import Botao from "@/components/botao/botao";
import Footer from "@/components/Footer/footer";

import { SafeAreaView } from "react-native-safe-area-context";

function Login() {
  const regexUsuario = /^[a-zA-Z0-9_]+$/;

  return (
    <SafeAreaView className="flex-1 bg-[#0007a0]">
      <Header />
      <View className="flex-1 justify-center items-center bg-[#0007a0]" >
        <View className="bg-black justify-center items-center mt-8 mb-6">
          <Text className="text-xl">
            Entrar
          </Text>
          <Text className="text-xl text-white">
            Entre com sua conta
          </Text>
        </View>
        <View className="bg-black">
          <CampoTextoGenerico
            icone={
              <FontAwesome
                name="user-circle"
                color="#321abf"
                size={24}
              />
            }
            errorMessage="seu nome de usuario esta incorreto"
            placeholder="nome"
            regex={regexUsuario}
          />

          <CampoTextoGenerico
            icone={
              <Ionicons
                name="lock-closed"
                color="#321abf"
                size={24}
              />
            }
            errorMessage="digite uma senha valida"
            placeholder="senha"
            regex={regexUsuario}
            className="border-0"
          />
        </View>
        <Botao
          children={
            <Text className="text-white text-xl">
              Entrar
            </Text>
          }
        />
        <Text className="text-white text-base mt-4">
          Não possui cadastro? Cadastrar
        </Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

export default Login;