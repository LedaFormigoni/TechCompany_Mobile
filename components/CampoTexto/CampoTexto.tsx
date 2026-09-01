import React from "react";

import { cn } from "../../lib/cn";

import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type CampoTextoProps = TextInputProps & {
  label?: string;
  regex?: RegExp;
  errorMessage: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  textInputClassName?: string;
  icone?: React.ReactNode;
  isError: boolean;

  value: string;

  setValue: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const CampoTextoGenerico = ({
  label = "",
  errorMessage,
  className = "",
  labelClassName = "",
  textInputClassName = "",
  placeholder = "",
  isError,
  icone,
  value,
  setValue,
  ...rest
}: CampoTextoProps) => {
  return (
    <View className={cn("", className)}>
      {label !== "" && (
        <Text className={labelClassName}>
          {label}
        </Text>
      )}

      <View className="flex-row items-center rounded-lg px-4 w-72 p-4">
        {icone}

        <TextInput
          className={cn(
            "text-black flex-1 px-4 py-3",
            textInputClassName
          )}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          {...rest}
        />
      </View>

      {isError && (
        <Text className="text-red-600 mt-2">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default React.memo(CampoTextoGenerico);