import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Header = (props: NativeStackHeaderProps) => {
  const podeVoltar = props.navigation.canGoBack();
  return (
    <SafeAreaView
      className={`px-6 pt-2 bg-[#00007a] flex-row items-center gap-6 ${podeVoltar == false && "justify-center"}`}
    >
      {podeVoltar == true ? (
        <Pressable onPress={() => props.navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
      ) : null}
      <View className="pt-2">
      <Image
        className={`h-10 w-28  ${podeVoltar == true && "ml-[75px]"}`}
        source={require("@/assets/images/logoTech.png")}
        style={{ resizeMode: "cover" }}
      />
      </View>
    </SafeAreaView>
  );
};
export default Header;
