import api from "@/lib/axios.config";

export async function BasicSignin(email: string, password: string) {
  const { status } = await api.post("/signin", { email, password });
  return status;
}
