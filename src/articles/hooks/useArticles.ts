import { useQuery } from "@tanstack/react-query"
import { getArticles } from "../services/articles-service"

export const useArticles = () => {
  const query = useQuery({ queryKey: ['articles'], queryFn: getArticles, staleTime: 5 * 1000 * 60 })
  return { ...query }
}