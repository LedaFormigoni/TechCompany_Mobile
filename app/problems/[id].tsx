import { Postagem } from "@/components/CartaoDePostagem/CartaoDePostagem";
import api from "@/lib/axios.config";
import { bytesToBase64 } from "@/lib/base64";
import { Image } from "expo-image";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

type PostagemDetail = Postagem & {
  descricao: string;
  nome_imagem: string;
  data: {
    type: "Buffer";
    data: number[];
  };
  mimetype: string;
};

const PostDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [postagem, setPostagem] = useState<PostagemDetail | null>(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      api
        .get<PostagemDetail>(`/pedidos/${id}`)
        .then(({ data }) => {
          if (ativo) setPostagem(data);
        })
        .finally(() => {
          if (ativo) setCarregando(false);
        });

      return () => {
        ativo = false;
      };
    }, [id]),
  );

  if (carregando) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F7FA]">
        <ActivityIndicator size="large" color="#0d1aa6" />
      </View>
    );
  }

  if (!postagem) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F7FA] px-6">
        <Text className="text-center text-lg font-semibold text-gray-800">
          Não foi possível encontrar essa postagem.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#F5F7FA]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      {/* IMAGEM — METADE DA TELA */}
      <View className="h-[50vh] w-full overflow-hidden bg-gray-200">
        <Image
          source={{
            uri: `data:${postagem.mimetype};base64,${bytesToBase64(
              postagem.data.data,
            )}`,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
          accessibilityLabel={`Imagem do aparelho de ${postagem.nome}`}
        />

        {/* GRADIENTE VISUAL */}
        <View className="absolute bottom-0 left-0 right-0 h-24 bg-black/20" />
      </View>

      {/* ÁREA DE INFORMAÇÕES */}
      <View className="-mt-5 rounded-t-[28px] bg-white px-6 pt-7">
        {/* USUÁRIO */}
        <View className="mb-6 flex-row items-center">
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#0d1aa6]">
            <Text className="text-lg font-bold text-white">
              {postagem.nome?.charAt(0)?.toUpperCase()}
            </Text>
          </View>

          <View>
            <Text className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Publicado por
            </Text>

            <Text className="text-base font-bold text-gray-900">
              {postagem.nome}
            </Text>
          </View>
        </View>

        {/* TÍTULO */}
        <View className="mb-3">
          <Text className="text-2xl font-bold text-gray-900">
            Problema do aparelho
          </Text>

          <View className="mt-2 h-1 w-12 rounded-full bg-[#0d1aa6]" />
        </View>

        {/* DESCRIÇÃO */}
        <View className="mb-6 rounded-2xl bg-[#F5F7FA] p-5">
          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0d1aa6]">
            Descrição
          </Text>

          <Text className="text-base leading-7 text-gray-700">
            {postagem.descricao}
          </Text>
        </View>

        {/* INFORMAÇÕES DO APARELHO */}
        <View className="mb-5">
          <Text className="mb-4 text-lg font-bold text-gray-900">
            Informações do aparelho
          </Text>

          <View className="flex-row gap-3">
            {/* TIPO */}
            <View className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <Text className="mb-1 text-xs text-gray-400">Tipo</Text>

              <Text className="text-sm font-semibold text-gray-800">
                {postagem.tipoeletronico}
              </Text>
            </View>

            {/* MODELO */}
            <View className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <Text className="mb-1 text-xs text-gray-400">Modelo</Text>

              <Text className="text-sm font-semibold text-gray-800">
                {postagem.modelo}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDetailsPage;
