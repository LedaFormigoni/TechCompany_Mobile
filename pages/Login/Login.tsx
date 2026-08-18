import React from "react";
import { Text, View } from "react-native";
import CampoTextoGenerico from "@/components/CampoTexto/CampoTexto";
import Header from "@/components/Header/Header";
import Botao from "@/components/botao/botao";
import { Link } from "expo-router";
import Footer from "@/components/Footer/footer";
function Login() {
  const regexUsuario = /^[a-zA-Z0-9_]+$/;

  return (
    <>
      <Header />
      <View className="flex-1">
        <Text className="flex justify-center items-center text-white">
          Login
        </Text>
        <Text className="flex justify-center items-center text-white">
          Preencha os dados abaixo para entrar na sua conta
        </Text>
        <View className=" justify-center items-center">
          <CampoTextoGenerico
            className=""
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
        <Botao children={"Entrar"} className="text-white" />
        <Text>Não possui cadastro? Cadastrar</Text>
      </View>
        <Footer />
    </>
  );
}

export default Login;
