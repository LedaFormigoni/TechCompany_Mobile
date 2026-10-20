import Header from "@/components/Header/Header";
import React from "react";
import { View, Text } from "react-native";

export default function Sobrenos() {
  return (
    <View className="flex-1 bg-[#eee]">
      
      <Text className="text-[#1726b7] text-[26px] font-bold text-center mt-[30px]">
        QUEM SOMOS NÓS?
      </Text>

      <Text className="text-[#1726b7] text-[15px] text-center mx-5 mt-5 leading-[22px]">
        Somos especializados em reparos de alta qualidade em computadores,
        celulares e videogames, atendendo diversos modelos e marcas do
        mercado atual. Nosso trabalho é baseado em conhecimento técnico,
        engenharia e tecnologia.
      </Text>

      <Text className="text-[#1726b7] text-[22px] font-bold text-center mt-[30px]">
        NOSSO DIFERENCIAL
      </Text>

      <View className="flex-row justify-around mt-[30px] px-[10px]">

        <View className="w-[30%] bg-white p-[15px] rounded-[10px] items-center">
          <Text className="text-[#1726b7] text-[15px] font-bold text-center">
            Atendimento Rapido
          </Text>

          <Text className="text-[#1726b7] text-[13px] text-center mt-[5px] leading-[18px]">
            Processos claros, comunicação rápida e zero enrolação.
          </Text>
        </View>

        <View className="w-[30%] bg-white p-[15px] rounded-[10px] items-center">
          <Text className="text-[#1726b7] text-[15px] font-bold text-center">
            Segurança Garantida
          </Text>

          <Text className="text-[#1726b7] text-[13px] text-center mt-[5px] leading-[18px]">
            Pagamentos e dados protegidos em ambiente seguro.
          </Text>
        </View>

        <View className="w-[30%] bg-white p-[15px] rounded-[10px] items-center">
          <Text className="text-[#1726b7] text-[15px] font-bold text-center">
            Agilidade com Qualidade
          </Text>

          <Text className="text-[#1726b7] text-[13px] text-center mt-[5px] leading-[18px]">
            Fluxo otimizado para reduzir prazos sem perder qualidade.
          </Text>
        </View>

      </View>
    </View>
  );
}