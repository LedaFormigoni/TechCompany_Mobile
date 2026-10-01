import CartaoDePostagem, {
  Postagem,
} from "@/components/CartaoDePostagem/CartaoDePostagem";
import ModalPublicarProblema from "@/components/Modal/Modal";
import api from "@/lib/axios.config";
import "@/global.css";

import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { removerUserId } from "@/lib/secureStore";
import Botao from "@/components/botao/botao";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Home = () => {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarPostagens = useCallback(async () => {
    try {
      const { data } = await api.get<Postagem[]>("/pedidos");
      console.log("Postagens:", data);
      setPostagens(data);
    } catch (error) {
      console.log("Erro ao buscar pedidos:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      buscarPostagens();
    }, [buscarPostagens]),
  );
  async function logout() {
    await removerUserId();

    router.replace("/Login");
  }
  return (
    <View className="flex-1 bg-[#f4f7f9]">
      <View className="w-full flex-1 self-center px-4 py-6">
        <Text className="mb-6 text-center text-2xl font-semibold text-[#0d1aa6]">
          Conserto de Eletrônicos
        </Text>
        <Botao
          className="w-20"

          onPress={() => logout()}
        >
          <View className="justify-center items-center">
            <SimpleLineIcons name="logout" size={24} color="black" />
          </View>
        </Botao>

        {carregando ? (
          <ActivityIndicator size="large" color="#0d1aa6" />
        ) : (
          <FlatList
            data={postagens}
            keyExtractor={(item) => String(item.id_pedido)}
            contentContainerStyle={{
              gap: 16,
              paddingBottom: 30,
            }}
            renderItem={({ item }) => <CartaoDePostagem postagem={item} />}
            ListEmptyComponent={
              <Text className="mt-10 text-center text-gray-500">
                Nenhuma postagem ainda.
              </Text>
            }
          />
        )}
      </View>
      <View className="mb-5 absolute right-6 bottom-1">
        <ModalPublicarProblema />
      </View>
    </View>
  );
};

export default Home;
