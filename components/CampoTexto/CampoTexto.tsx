import React, { useState } from "react";
import { cn } from "../../lib/cn";
import { Text, TextInput, TextInputProps, View } from "react-native";
type CampoTextoProps = TextInputProps & {
  label?: string,
  regex: RegExp;
  errorMessage: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  textInputClassName?: string;
};

const CampoTextoGenerico = ({
  label = "",
  regex,
  errorMessage,
  className = "",
  labelClassName = "",
  textInputClassName = "",
  placeholder = "",
}: CampoTextoProps) => {
  const [campo, setCampo] = useState<string>("");
  const [error, setError] = useState("");

  const handleChange = (text: string) => {
    setCampo(text);
    if (text === "") {
      setError("");
    } else if (!regex.test(text)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <View className={cn("bg-white items-center", className)}>
      <TextInput
        className={cn("text-black w-72 px-4 ", textInputClassName)}
        placeholder={placeholder}
        value={campo}
        onChangeText={handleChange}
        autoCapitalize="none"
      />
      {error !== "" && (
        <Text className="text-red-600 font-sans">{error}</Text>
      )}
    </View>
  );
};

export default React.memo(CampoTextoGenerico);