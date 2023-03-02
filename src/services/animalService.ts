import axios from "axios";
import { IAnimalResponse } from "../models/IAnimalResponse";
import { IApiResponse } from "../models/IApiResponse";

export async function getAnimals() {
  let getAnimals = await axios.get<IAnimalResponse[]>(
    "https://animals.azurewebsites.net/api/animals"
  );
  return getAnimals.data;
}

export const getAnimalById = async (id: number): Promise<IApiResponse> => {
  try {
    let response = await axios.get<IAnimalResponse>(
      "https://animals.azurewebsites.net/api/animals/" + id
    );

    return { animal: response.data, error: "" };
  } catch {
    return { error: "Ett fel har inträffat" };
  }
};
