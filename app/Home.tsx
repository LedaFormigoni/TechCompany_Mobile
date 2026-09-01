import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import '@/global.css';
import ModalPublicarProblema from '@/components/Modal/Modal';

const App = () => {
 
  return (
    <>
      
      <View className="w-full max-w-[1280px] flex-1 self-center px-4 py-6">
        <Text className="mb-8 p-2 text-center text-2xl font-semibold text-[#0d1aa6]">
          Conserto de Eletronicos
        </Text>
        <View className="items-start">
          <ModalPublicarProblema />
        </View>
      </View>
    </>
  );
};

export default App;