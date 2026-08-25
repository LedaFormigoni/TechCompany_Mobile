import React, { useEffect, useState } from "react";

import { View, Text } from "react-native";

import "../global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import CampoTextoGenerico from "@/components/CampoTexto/CampoTexto";

import Header from "@/components/Header/Header";
import Botao from "@/components/botao/botao";
import Footer from "@/components/Footer/footer";

import { BasicSignin } from "@/service/user.service";

import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  // Estados dos campos
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  // Regex do e-mail
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Estado de erro do e-mail
  const [isErrorInEmail, setIsErrorInEmail] =
    useState<boolean>(false);

  // Validação do e-mail
  useEffect(() => {
    if (email === "") {
      setIsErrorInEmail(false);
    } else {
      if (!regex_email.test(email)) {
        setIsErrorInEmail(true);
      } else {
        setIsErrorInEmail(false);
      }
    }
  }, [email]);

  // Regex da senha
  const regex_senha =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // Estado de erro da senha
  const [isErrorInSenha, setIsErrorInSenha] =
    useState<boolean>(false);

  // Validação da senha
  useEffect(() => {
    if (senha === "") {
      setIsErrorInSenha(false);
    } else {
      if (!regex_senha.test(senha)) {
        setIsErrorInSenha(true);
      } else {
        setIsErrorInSenha(false);
      }
    }
  }, [senha]);

  // Função de login
  const onSubmit = async (
    email: string,
    senha: string
  ) => {
    try {
      const resposta = await BasicSignin(email, senha);

      if (resposta === 200) {
        console.log("Bem vindo");
      } else {
        console.error("E-mail ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0007a0]">
      <Header />

      <View className="flex-1 justify-center items-center bg-[#0007a0]">
        
        {/* Título */}
        <View className="justify-center items-center mt-8 mb-6">
          <Text className="text-4xl text-white">
            Entrar
          </Text>

          <Text className="text-xl text-white">
            Entre com sua conta
          </Text>
        </View>

        {/* Campos */}
        <View className="gap-6">
          {/* E-mail */}
          <CampoTextoGenerico
            className="bg-white rounded-lg"
            icone={
              <FontAwesome
                name="user-circle"
                color="#321abf"
                size={24}
              />
            }
            value={email}
            setValue={setEmail}
            errorMessage="Seu e-mail está inválido"
            placeholder="E-mail"
            regex={regex_email}
            isError={isErrorInEmail}
            keyboardType="email-address"
          />

          {/* Senha */}
          <CampoTextoGenerico
            className="bg-white rounded-lg"
            icone={
              <Ionicons
                name="lock-closed"
                color="#321abf"
                size={24}
              />
            }
            value={senha}
            setValue={setSenha}
            errorMessage="Digite uma senha válida"
            placeholder="Senha"
            regex={regex_senha}
            isError={isErrorInSenha}
            secureTextEntry={true}
          />
        </View>

        {/* Botão */}
        <View className="items-center mt-8">
          <Botao
            className="w-20"
            disabled={
              isErrorInEmail ||
              isErrorInSenha ||
              email === "" ||
              senha === ""
            }
            onPress={() => onSubmit(email, senha)}
          >
            <View className="justify-center items-center">
              <Text className="text-white text-xl">
                Entrar
              </Text>
            </View>
          </Botao>
        </View>

        {/* Cadastro */}
        <Text className="text-white text-base mt-4">
          Não possui cadastro? Cadastrar
        </Text>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default App;