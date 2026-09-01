import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import CampoTextoGenerico from "@/components/CampoTexto/CampoTexto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import Botao from "@/components/botao/botao";
import { useRouter } from "expo-router";
import { CreateAccount } from "@/service/user.service";


const Cadastro = () => {
    const router = useRouter();
    // Estados dos campos
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [endereco, setEndereco] = useState<string>("");
  
    // Regex do e-mail
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Estado de erro do e-mail
    const [isErrorInEmail, setIsErrorInEmail] = useState<boolean>(false);
  
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
    const regex_senha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
    // Estado de erro da senha
    const [isErrorInSenha, setIsErrorInSenha] = useState<boolean>(false);
  
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
  
    const regex_nome = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;
  const [isErrorInNome, setIsErrorInNome] = useState<boolean>(false);

  useEffect(() => {
    if (nome == "") {
      setIsErrorInNome(false);
    } else {
      if (!regex_nome.test(nome)) {
        setIsErrorInNome(true);
      } else {
        setIsErrorInNome(false);
      }
    }
  }, [nome]);
  const [isErrorInEndereco, setIsErrorInEndereco] = useState<boolean>(false);

  useEffect(() => {
    if (endereco == "") {
      setIsErrorInEmail(false);
    } else {
        setIsErrorInEndereco(false);
    }
  }, [endereco]);


    // Função de cadastro
    const onSubmit = async (nome: string, email: string, senha: string, endereco: string) => {
      try {
        const resposta = await CreateAccount(nome, email, senha, endereco);
        console.log("Nome:", nome);
        console.log("Email:", email);
        console.log("Senha:", senha);
        console.log("Endereco:", endereco);
        console.log(resposta);
        if (resposta == 201) {
          router.navigate("/Home");
        } else {
          Alert.alert("Erro ao cadastrar");
        }
      } catch (error) {
        console.error("Erro ao realizar o cadastro:", error);
      }
    };
  
  return (
    <View className="p-5 ">

      <Text className="text-2xl text-center">Criar Conta</Text>
      <Text className="flex-roe  text-center">Preencha os dados abaixo </Text>
      {/* Campos */}
        <View className="gap-6">
          {/* Nome */}
          <CampoTextoGenerico
            className="bg-white rounded-lg"
            icone={<FontAwesome name="user-circle" color="#321abf" size={24} />}
            value={nome}
            setValue={setNome}
            errorMessage="Seu nome está inválido"
            placeholder="Nome"
            regex={regex_nome}
            isError={isErrorInNome}
            />
            {/* E-mail */}
          <CampoTextoGenerico
            className="bg-white rounded-lg"
            icone={<FontAwesome name="user-circle" color="#321abf" size={24} />}
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
            icone={<Ionicons name="lock-closed" color="#321abf" size={24} />}
            value={senha}
            setValue={setSenha}
            errorMessage="Digite uma senha válida"
            placeholder="Senha"
            regex={regex_senha}
            isError={isErrorInSenha}
            secureTextEntry={true}
          />
          {/* Endereco */}
          <CampoTextoGenerico
            className="bg-white rounded-lg"
            icone={<Ionicons name="lock-closed" color="#321abf" size={24} />}
            value={endereco}
            setValue={setEndereco}
            errorMessage="Digite um endereço válido"
            placeholder="Endereço"
            isError={isErrorInEndereco}
          />
        </View>

        {/* Botão */}
        <View className="items-center mt-8">
          <Botao
            className="w-28 h-14"
            disabled={
              isErrorInEmail || isErrorInSenha || email === "" || senha === ""
            }
            onPress={() => onSubmit(nome, email, senha, endereco)}
          >
            <View className="justify-center items-center">
              <Text className="text-white text-xl">Cadastrar</Text>
            </View>
          </Botao>
        </View>
    </View>
  );
};

export default Cadastro;