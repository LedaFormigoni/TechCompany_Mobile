import { bytesToBase64 } from "@/lib/base64";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

export type Postagem = {
  id_pedido: number;
  id_usuarios: number;
  nome: string;
  descricao: string;
  tipoeletronico: string;
  modelo: string;
  telefone: string;
  nome_imagem: string;
  data: {
    type: "Buffer";
    data: number[];
  };
  mimetype: string;
  valor: number;
  comentario?: string;
};

type CartaoDePostagemProps = {
  postagem: Postagem;
};

const CartaoDePostagem = ({ postagem }: CartaoDePostagemProps) => {
  const imagemUri = `data:${postagem.mimetype};base64,${bytesToBase64(
    postagem.data.data,
  )}`;

  return (
    <View className="overflow-hidden rounded-[18px] border border-gray-200 bg-white">
      {/* IMAGEM DO APARELHO */}
      <Image
        source={{ uri: imagemUri }}
        style={{
          width: "100%",
          height: 210,
        }}
        contentFit="cover"
        accessibilityLabel={`Imagem do aparelho de ${postagem.nome}`}
      />

      {/* CONTEÚDO */}
      <View className="p-5">
        {/* TIPO DE ELETRÔNICO */}
        <View className="mb-3 self-start rounded-full bg-[#e3e8ff] px-3 py-1.5">
          <Text className="text-xs font-bold text-[#0d1aa6]">
            {postagem.tipoeletronico}
          </Text>
        </View>

        {/* NOME */}
        <Text className="mb-1 text-xl font-bold text-[#222]" numberOfLines={2}>
          {postagem.nome}
        </Text>

        {/* TELEFONE */}
        <Text className="mb-4 text-sm text-gray-500">{postagem.telefone}</Text>

        {/* MODELO */}
        <View className="mb-4 border-t border-gray-100 pt-3">
          <Text className="text-base font-semibold text-[#444]">Modelo</Text>

          <Text className="mt-1 text-base text-gray-600">
            {postagem.modelo}
          </Text>
        </View>

        {/* DESCRIÇÃO */}
        <View>
          <Text className="mb-1 text-base font-semibold text-[#444]">
            Problema
          </Text>

          <Text className="text-base leading-6 text-gray-600" numberOfLines={5}>
            {postagem.descricao}
          </Text>
        </View>

        {/* LINHA */}
        <View className="my-4 h-px bg-gray-200" />

        {/* VALOR */}
        <Text className="text-lg font-bold text-[#0d1aa6]">
          Valor:{" "}
          {postagem.valor && Number(postagem.valor) > 0
            ? `R$ ${Number(postagem.valor).toFixed(2)}`
            : "A combinar"}
        </Text>

        {/* COMENTÁRIO */}
        {postagem.comentario ? (
          <View className="mt-4 rounded-xl bg-gray-50 p-3">
            <Text className="mb-1 text-sm font-bold text-gray-700">
              Comentário
            </Text>

            <Text className="text-sm leading-5 text-gray-600">
              {postagem.comentario}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CartaoDePostagem;
