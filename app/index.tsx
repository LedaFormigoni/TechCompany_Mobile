import React from "react";
import { View } from "react-native";
import "../global.css";
import Login from "@/pages/Login/Login";
const App = () => {
  return (
    <View className=" flex-1 bg-[#0007a0]">
      <Login />
    </View>
  );
};

export default App;
