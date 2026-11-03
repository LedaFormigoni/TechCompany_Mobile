import { Postagem } from "@/components/CartaoDePostagem/CartaoDePostagem";
import api from "./axios.config";

export async function FecthPostagens() {
  const { data } = await api.get<Postagem[]>("/pedidos");

  return data;
}
