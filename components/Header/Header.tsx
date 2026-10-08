import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Image, Pressable, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { removerUserId } from "@/lib/secureStore";

const Header = (props: NativeStackHeaderProps) => {
  const podeVoltar = props.navigation.canGoBack();

  const [menuAberto, setMenuAberto] = useState(false);

  const pathname = usePathname();

  async function logout() {
    await removerUserId();

    router.replace("/Login");
  }

  // Verifica se está no Login ou Cadastro
  const esconderMenu = pathname === "/Login" || pathname === "/Cadastro";

  return (
    <View>
      {/* HEADER */}
      <SafeAreaView className="px-6 pt-2 bg-[#00007a] flex-row items-center justify-between">
        {/* SETA DE VOLTAR */}
        {podeVoltar &&
        pathname !== "/Home" &&
        pathname !== "/Login" &&
        pathname !== "/Cadastro" ? (
          <Pressable onPress={() => props.navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="white" />
          </Pressable>
        ) : (
          <View className="w-6" />
        )}

        {/* LOGO */}
        <View className="pt-2">
          <Image
            className="h-10 w-28"
            source={require("@/assets/images/logoTech.png")}
            style={{ resizeMode: "cover" }}
          />
        </View>

        {/* MENU HAMBÚRGUER */}
        {!esconderMenu && (
          <Pressable onPress={() => setMenuAberto(!menuAberto)} className="p-2">
            <Feather name={menuAberto ? "x" : "menu"} size={28} color="white" />
          </Pressable>
        )}

        {/* Espaço para manter a logo centralizada */}
        {esconderMenu && <View className="w-10" />}
      </SafeAreaView>

      {/* MENU */}
      {menuAberto && !esconderMenu && (
        <View className="absolute right-0 top-24 w-64 bg-white rounded-bl-2xl shadow-lg z-50">
          {/* PERFIL */}
          <Pressable
            onPress={() => {
              setMenuAberto(false);
              router.push("/Perfil");
            }}
            className="flex-row items-center p-5 border-b border-gray-200"
          >
            <Feather name="user" size={22} color="#00007a" />

            <Text className="ml-4 text-lg text-gray-800">Perfil</Text>
          </Pressable>

          {/* SOBRE NÓS */}
          {pathname !== "/Sobrenos" && (
            <Pressable
              onPress={() => {
                setMenuAberto(false);
                router.push("/Sobrenos");
              }}
              className="flex-row items-center p-5 border-b border-gray-200"
            >
              <Feather name="info" size={22} color="#00007a" />

              <Text className="ml-4 text-lg text-gray-800">Sobre nós</Text>
            </Pressable>
          )}

          {/* SAIR */}
          <Pressable
            onPress={() => logout()}
            className="flex-row items-center p-5"
          >
            <Feather name="log-out" size={22} color="red" />

            <Text className="ml-4 text-lg text-red-600">Sair</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Header;
