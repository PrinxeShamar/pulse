import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { prisma } from '@/utils/prisma/client';
import { getSchedule, getSchedules } from '@/api/schedules';
import { createOrganization, getOrganization, getOrganizations } from "@/api/organizations";

export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      return await getOrganizations();
    },
    staleTime: Infinity,
  });
};

export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: async () => {
      return await getOrganization(id);
    },
    staleTime: Infinity,
  });
}

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (error) => {
      console.log(`Error: ${error}`);
    },
  });
};



