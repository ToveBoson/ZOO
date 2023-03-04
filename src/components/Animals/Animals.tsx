import { useEffect, useState } from "react";
import { IAnimalResponse } from "../../models/IAnimalResponse";
import { IAnimalSmallResponse } from "../../models/IAnimalSmallResponse";
import { getAnimals } from "../../services/animalService";
import { getFromLs, saveToLs } from "../../services/LocalServices";
import { Animal } from "../Animal/Animal";
import "../Animals/Animals.scss";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimalResponse[]>(getFromLs());

  useEffect(() => {
    const getData = async () => {
      let animalsFromApi = await getAnimals();
      setAnimals(animalsFromApi);
      saveToLs(animalsFromApi);
    };

    let animalFromLs: IAnimalSmallResponse[] =
      getFromLs<IAnimalSmallResponse>();
    if (animalFromLs.length !== 0) return;

    getData();
  });

  let notice = "";

  let animalsHtml = animals.map((animal) => {
    let lastFedTime = localStorage.getItem(`animal-${animal.id}`);

    if (lastFedTime) {
      let lastFed = new Date(lastFedTime).getTime();

      let now = new Date().getTime();
      const timeDiff = (now - lastFed) / 1000 / 60 / 60;

      if (timeDiff > 4) {
        notice += `${animal.name} behöver matas. `;
      }
    } else {
      notice += `${animal.name} behöver matas. `;
    }
    return <Animal animal={animal} key={animal.id}></Animal>;
  });

  return (
    <div className="containerAnimals">
      {animalsHtml}
      <div className="containerAnimals__needFood">
        <p>{notice} </p>
      </div>
    </div>
  );
};
