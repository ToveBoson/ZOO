import { IAnimalSmallResponse } from "./IAnimalSmallResponse";

export class Animal {
  constructor(public animal: IAnimalSmallResponse, public fed: boolean) {}
}
