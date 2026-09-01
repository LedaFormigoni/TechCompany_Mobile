import api from "@/lib/axios.config";
import { isAxiosError } from "axios";

export async function BasicSignin(email: string, senha: string) {
  try {
    const resposta = await api.post("/usuarios/login", { email, senha });
    return resposta; // retorna { status, data, ... } inteiro
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response; // erro também tem status e data (ex: 401 "Senha incorreta")
    }
    throw new Error();
  }
}

export async function CreateAccount(
  nome: string,
  email: string,
  senha: string,
  endereco: string
) {
  try {
    const { status } = await api.post("/cadastro/user", {
      nome,
      email,
      senha,
      endereco,
    });
    return status;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.status;
    }
    throw new Error();
  }
}