import React from "react";
import { Pressable, Text } from "react-native";
import { BotaoProps } from "./botao.type";
import { cn } from "@/lib/cn";
const Botao = ({ className = "", children, ...props }: BotaoProps) => {
  return (
    <Pressable
      className={cn(
        "bg-indigo-500 rounded-2xl  h-10 w-20 flex justify-center items-center m-5",
        className
      )}
      {...props}
    >
    {children}
    </Pressable>
  );
};

export default Botao;
// items-center rounded-lg px-4 py-2 active:opacity-80