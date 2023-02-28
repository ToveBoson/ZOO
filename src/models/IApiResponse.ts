import { IAnimalResponse } from "./IAnimalResponse";

export interface IApiResponse {
  animal?: IAnimalResponse;
  error: string;
}
