import React from "react";
import { Text, View } from "react-native";
import CampoTextoGenerico from "@/components/CampoTexto/CampoTexto";
import Header from "@/components/Header/Header";
import Botao from "@/components/botao/botao";
import Footer from "@/components/Footer/footer";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function Login() {
  const regexUsuario = /^[a-zA-Z0-9_]+$/;

  return (
    <SafeAreaView className="flex-1 bg-[#0007a0]">
      <Header />
      <View className="flex-1 justify-center items-center">
        <View className="justify-center items-center mt-8">
          <Text className=" text-white text-xl">
            Entrar
          </Text>
          <Text className=" text-white">
           Entre com sua conta
          </Text>
        </View>
        <View className="flex w-72 gap-6 rounded-xl">
          <CampoTextoGenerico
            errorMessage="seu nome de usuario esta incorreto"
            placeholder="nome"
            regex={regexUsuario}
          />
          <CampoTextoGenerico
            className=""
            errorMessage="digite uma senha valida"
            placeholder="senha"
            regex={regexUsuario}
          />
        </View>
        <Botao children={<Text>Entrar</Text>} className=" bg-white w-10 h-8 rounded-lg" />
        <Text className="text-white justify-center items-center" >Não possui cadastro? Cadastrar</Text>
      </View>
      <Footer />
    </SafeAreaView>

  );
}

export default Login;
