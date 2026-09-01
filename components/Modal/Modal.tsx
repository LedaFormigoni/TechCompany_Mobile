import React, { useState, useEffect } from 'react';
import { Alert, Modal, Text, Pressable, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import api from '@/lib/axios.config';



type ImagemType = {
  uri: string;
  name: string;
  type: string;
};

const ModalPublicarProblema = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [imagem, setImagem] = useState<ImagemType | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modelo, setModelo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoEletronico, setTipoEletronico] = useState('smartphone');
  const [msg, setMsg] = useState('');
  const [openPedidoSucesso, setOpenPedidoSucesso] = useState(false);
  const [openPedidoErro, setOpenPedidoErro] = useState(false);
  const [idUsuario, setIdUsuario] = useState<string | null>(null);

  function limpar() {
  setModelo('');
  setDescricao('');
  setTipoEletronico('smartphone'); 
  setTelefone('');
  setMsg('');
  setNome('');
  setImagem(null); 
}

  useEffect(() => {
    async function carregarUsuario() {
      const id = await AsyncStorage.getItem('id');
      setIdUsuario(id);
    }
    carregarUsuario();
  }, []);

 async function escolherImagem() {
  const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissao.granted) {
    Alert.alert('Permissão negada para acessar a galeria.');
    return;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images', // Passa a string direta em vez de acessar o objeto
    quality: 0.7,
  });

  if (!resultado.canceled && resultado.assets[0]) {
    const asset = resultado.assets[0];
    const nomeArquivo = asset.fileName || asset.uri.split('/').pop() || 'foto.jpg';
    const tipoMime = asset.mimeType || 'image/jpeg';

    setImagem({
      uri: asset.uri,
      name: nomeArquivo,
      type: tipoMime,
    });
  }
}

async function validar() {
  const id = await AsyncStorage.getItem('id'); 

  if (!id) {
    setMsg('Usuario não cadastrado. Faça login novamente.');
    return;
  }

 
  
  if (
    !nome.trim() ||
    !descricao.trim() ||
    !tipoEletronico ||
    !modelo.trim() ||
    !telefone.trim() ||
    !imagem
  ) {
    setMsg('Preencha todos os campos e selecione uma imagem!');
    return;
  }

  cadastrar(id); 
}

async function cadastrar(idUsuario: string) {
  const formData = new FormData();
  formData.append('descricao', descricao);
  formData.append('id_usuario', idUsuario);
    formData.append('nome', nome);
    formData.append('tipoeletronico', tipoEletronico);
    formData.append('modelo', modelo);
    formData.append('telefone', telefone);

    if (imagem) {
      formData.append('imagem', {
        uri: imagem.uri,
        name: imagem.name,
        type: imagem.type,
      } as unknown as Blob);
    }

    try {
      
      const resposta = await api.post('/cad_pedidos', formData);

      if (resposta.status === 201 || resposta.status === 200) {
        setOpenPedidoSucesso(true);
        setModalVisible(false);
        limpar();
      } else {
        Alert.alert('Erro ao cadastrar pedido');
      }
    } catch (error) {
      setOpenPedidoErro(true);
      console.log('Erro ao cadastrar:', error);
    }
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="elevation-5 max-h-[85%] w-full max-w-md rounded-[20px] bg-white p-6 shadow-lg">
            <Text className="mb-4 text-center font-bold text-lg">Publicar Problema</Text>

            <Text className="mb-1 font-medium text-gray-700">Nome:</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#9ca3af"
              className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900"
            />

            <Text className="mb-1 font-medium text-gray-700">Descrição:</Text>
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva o problema"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
              className="textAlignVertical-top mb-4 h-20 w-full rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900"
            />

            <Text className="mb-1 font-medium text-gray-700">Modelo:</Text>
            <TextInput
              value={modelo}
              onChangeText={setModelo}
              placeholder="Digite o modelo do aparelho"
              placeholderTextColor="#9ca3af"
              className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900"
            />

            <Text className="mb-1 font-medium text-gray-700">Telefone:</Text>
            <TextInput
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Digite o número de telefone"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-base text-gray-900"
            />

            <Text className="mb-1 font-medium text-gray-700">Tipo de Eletrônicos:</Text>
            <Picker
              selectedValue={tipoEletronico}
              onValueChange={(itemValue) => setTipoEletronico(itemValue)}>
              <Picker.Item label="Smartphone" value="smartphone" />
              <Picker.Item label="Computador" value="computador" />
              <Picker.Item label="Console" value="console" />
            </Picker>

            <Pressable
              onPress={escolherImagem}
              className="mb-4 rounded-lg border border-gray-300 p-3">
              <Text className="text-center text-gray-700">
                {imagem ? 'Imagem selecionada ✓' : 'Selecionar imagem'}
              </Text>
            </Pressable>

            {msg !== '' && (
              <Text className="mb-2 text-center text-red-600 font-semibold">{msg}</Text>
            )}

            <View className="flex-row justify-center">
              <Pressable
                className="elevation-2 m-4 rounded-2xl bg-[#2196F3] p-5"
                onPress={validar}
                >
                <Text className="text-center font-bold text-white">Publicar</Text>
              </Pressable>
              <Pressable
                className="elevation-2 m-4 rounded-2xl bg-[#2196F3] p-5"
                onPress={() => setModalVisible(false)}>
                <Text className="text-center font-bold text-white">Fechar Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable
        onPress={() => setModalVisible(true)}
        className="mb-10 rounded-[10px] bg-[#0d1aa6] px-5 py-6">
        <Text className="font-semibold text-white"> + </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ModalPublicarProblema;