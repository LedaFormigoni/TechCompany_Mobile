import React from "react";

import { View, Text } from "react-native";

export default function Sobrenos() {
  return (
    <View className="flex-1 bg-[#eee]">
      <View className="h-[100px] bg-[#1726b7] flex-row justify-around items-center">
        <Text className="text-white text-[22px]">
          Logo
        </Text>

        <Text className="text-white text-[20px]">
          Conserto de Celular
        </Text>

        <Text className="text-white text-[20px]">
          Voltar
        </Text>
      </View>

      <Text className="text-[#1726b7] text-[40px] font-bold text-center mt-[60px]">
        QUEM SOMOS NÓS?
      </Text>

      <Text className="text-[#1726b7] text-[20px] text-center m-5">
        Somos especializados em reparos de alta qualidade em computadores,
        celulares e videogames, atendendo diversos modelos e marcas do
        mercado atual. Nosso trabalho é baseado em conhecimento técnico,
        engenharia e tecnologia.
      </Text>

      <Text className="text-[#1726b7] text-[32px] font-bold text-center mt-[80px]">
        NOSSO DIFERENCIAL
      </Text>

      <View className="flex-row justify-around mt-[50px]">
        <View className="w-[28%] items-center">
          <Text className="text-[#1726b7] text-[20px] font-bold text-center">
            Atendimento Inteligente
          </Text>

          <Text className="text-[#1726b7] text-[18px] text-center mt-[5px]">
            Processos claros, comunicação rápida e zero enrolação.
          </Text>
        </View>

        <View className="w-[28%] items-center">
          <Text className="text-[#1726b7] text-[20px] font-bold text-center">
            Segurança Garantida
          </Text>

          <Text className="text-[#1726b7] text-[18px] text-center mt-[5px]">
            Pagamentos e dados protegidos em ambiente seguro.
          </Text>
        </View>

        <View className="w-[28%] items-center">
          <Text className="text-[#1726b7] text-[20px] font-bold text-center">
            Segurança Garantida
          </Text>

          <Text className="text-[#1726b7] text-[18px] text-center mt-[5px]">
            Pagamentos e dados protegidos em ambiente seguro.
          </Text>
        </View>

        <View className="w-[28%] items-center">
          <Text className="text-[#1726b7] text-[20px] font-bold text-center">
            Agilidade com Qualidade
          </Text>

          <Text className="text-[#1726b7] text-[18px] text-center mt-[5px]">
            Fluxo otimizado para reduzir prazos sem perder qualidade.
          </Text>
        </View>
      </View>
    </View>
  );
}