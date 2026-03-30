import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function usePortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServicePackages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["servicePackages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicePackages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAboutSection() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["aboutSection"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAboutSection();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, email, message);
    },
  });
}
