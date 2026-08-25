import api from "@/lib/axios.config";

export async function BasicSignin(email: string, senha: string) {
  const { status } = await api.post("/usuarios/login", { email, senha });
  return status;
}
