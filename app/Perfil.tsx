
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import  api  from "@/lib/axios.config";
import { obterUserId } from "@/lib/secureStore";

type UsuarioType = {
  nome: string;
  email: string;
  endereco: string;
};

export default function Perfil() {
  const [usuario, setUsuario] = useState<UsuarioType>({
    nome: "",
    email: "",
    endereco: "",
  });

  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function buscarUsuario() {
  try {
    const idUsuario = await obterUserId();

    if (!idUsuario) {
      Alert.alert("Erro", "Faça login novamente.");
      return;
    }

    const resposta = await api.get("/usuarios");

    const usuarioEncontrado = resposta.data.find(
      (item: any) =>
        String(item.id_usuario) === String(idUsuario)
    );

    if (!usuarioEncontrado) {
      Alert.alert("Erro", "Usuário não encontrado.");
      return;
    }

    setUsuario({
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email,
      endereco: usuarioEncontrado.endereco,
    });
  } catch (erro) {
    console.log("Erro ao buscar usuário:", erro);
    Alert.alert("Erro", "Não foi possível carregar o perfil.");
  } finally {
    setCarregando(false);
  }
}

  useEffect(() => {
    buscarUsuario();
  }, []);

  async function salvarPerfil() {
    if (!usuario.nome || !usuario.email || !usuario.endereco) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (usuario.nome.length < 5) {
      Alert.alert("Atenção", "O nome deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      setSalvando(true);

      const idUsuario = await obterUserId();

      if (!idUsuario) {
        Alert.alert("Erro", "Faça login novamente.");
        return;
      }

      await api.put(`/alt_user/${idUsuario}`, {
        nome: usuario.nome,
        email: usuario.email,
        endereco: usuario.endereco,
      });

      // Atualiza os dados exibidos na própria página.
      await buscarUsuario();

      setEditando(false);
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (erro) {
      console.log("Erro ao atualizar perfil:", erro);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#00007a" />
        <Text className="mt-3 text-gray-600">
          Carregando perfil...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f3f4f6" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Cabeçalho */}
      <View className="items-center bg-[#00007a] rounded-2xl p-6 mb-5">
        <View className="bg-white rounded-full p-5 mb-3">
          <Feather name="user" size={50} color="#00007a" />
        </View>

        <Text className="text-white text-2xl font-bold">
          {usuario.nome || "Meu perfil"}
        </Text>

        <Text className="text-blue-100 mt-1">
          Informações pessoais
        </Text>
      </View>

      {/* Informações e edição */}
      <View className="bg-white rounded-2xl p-5">
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-xl font-bold text-gray-800">
            Meus dados
          </Text>

          {!editando && (
            <Pressable
              onPress={() => setEditando(true)}
              className="flex-row items-center"
            >
              <Feather name="edit-2" size={18} color="#00007a" />
              <Text className="text-[#00007a] ml-2 font-semibold">
                Editar
              </Text>
            </Pressable>
          )}
        </View>

        <Text className="text-gray-600 mb-2">Nome</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-4 text-gray-800"
          value={usuario.nome}
          onChangeText={(nome) =>
            setUsuario({ ...usuario, nome })
          }
          editable={editando}
          placeholder="Nome completo"
        />

        <Text className="text-gray-600 mb-2">E-mail</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-4 text-gray-800"
          value={usuario.email}
          onChangeText={(email) =>
            setUsuario({ ...usuario, email })
          }
          editable={editando}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="E-mail"
        />

        <Text className="text-gray-600 mb-2">Endereço</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-5 text-gray-800"
          value={usuario.endereco}
          onChangeText={(endereco) =>
            setUsuario({ ...usuario, endereco })
          }
          editable={editando}
          placeholder="Endereço"
        />

        {editando && (
          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 border border-gray-300 rounded-xl p-4 items-center"
              onPress={() => {
                setEditando(false);
                buscarUsuario();
              }}
            >
              <Text className="text-gray-700 font-semibold">
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              className="flex-1 bg-[#00007a] rounded-xl p-4 items-center"
              onPress={salvarPerfil}
              disabled={salvando}
            >
              <Text className="text-white font-bold">
                {salvando ? "Salvando..." : "Salvar"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
