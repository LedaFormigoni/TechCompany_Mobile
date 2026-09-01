import api from "@/lib/axios.config";
import { isAxiosError } from "axios";

export async function BasicSignin(email: string, senha: string) {
  const { status } = await api.post("/usuarios/login", { email, senha });
  return status;
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