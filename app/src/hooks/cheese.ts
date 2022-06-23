import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { Cheese } from "@api/generated";
import SnackbarUtils from "@utils/SnackbarUtils";
import { QueryKey } from "@app/types";
import { createCheese, deleteCheese, listCheeses, updateCheese } from "@api/cheese";

const factory = {
  all: () => [{ scope: QueryKey.Cheese }] as const,
  list: (ids?: string[]) => [{ ...factory.all()[0], ids: ids || [] }] as const,
  get: (id: string) => [{ ...factory.all()[0], id }] as const,
};

// Queries =================================================================================================================================

export const useCheeses = () =>
  useQuery({
    queryKey: factory.list(),
    queryFn: listCheeses,
    onSuccess: () => {
      SnackbarUtils.success("Fetched cheeses from Server");
    },
    onError: () => {
      SnackbarUtils.error("Unable to fetch cheeses. Please try again in a few minutes.");
    },
  });

// Mutations  ==============================================================================================================================

const onSuccess = (queryClient: QueryClient) =>
  Promise.all([
    queryClient.invalidateQueries({
      queryKey: factory.all(),
    }),
    queryClient.refetchQueries({
      queryKey: factory.list(),
    }),
  ]);

export const useCreateCheese = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cheese: Cheese) => createCheese({ cheese }),
    onSuccess: () => {
      SnackbarUtils.success("Successfully created cheese");
      return onSuccess(queryClient);
    },
    onError: () => {
      SnackbarUtils.error("Unable to create cheese. Please try again in a few minutes.");
    },
  });
};

export const useUpdateCheese = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cheese: Cheese) => updateCheese({ id: cheese.id, cheese }),
    onSuccess: () => {
      SnackbarUtils.success("Successfully updated cheese");
      return onSuccess(queryClient);
    },
    onError: () => {
      SnackbarUtils.error("Unable to update cheese. Please try again in a few minutes.");
    },
  });
};

export const useDeleteCheese = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCheese(id),
    onSuccess: () => {
      SnackbarUtils.success("Successfully deleted cheese");
      return onSuccess(queryClient);
    },
    onError: () => {
      SnackbarUtils.error("Unable to delete cheese. Please try again in a few minutes.");
    },
  });
};
