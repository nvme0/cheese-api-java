import { Cheese } from "@api/generated";
import { cheeseApi } from "@api/api";

export const listCheeses = async () => {
  const { data } = await cheeseApi.list();
  return data;
};

export interface GetCheeseProps {
  id: number;
}

export const getCheese = async ({ id }: GetCheeseProps) => {
  const { data } = await cheeseApi.get({ id });
  return data;
};

export interface CreateSkillProps {
  cheese: Cheese;
}

export const createCheese = async ({ cheese }: CreateSkillProps) => {
  const { data } = await cheeseApi.create({ cheese });
  return data;
};

export interface UpdateSkillProps {
  id: number;
  cheese: Cheese;
}

export const updateCheese = async ({ id, cheese }: UpdateSkillProps) => {
  const { data } = await cheeseApi.update({ id, cheese });
  return data;
};

export const deleteCheese = async (id: number) => {
  const { data } = await cheeseApi._delete({
    id,
  });
  return data;
};
