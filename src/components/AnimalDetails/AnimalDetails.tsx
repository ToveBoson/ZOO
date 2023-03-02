import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimalResponse } from "../../models/IAnimalResponse";
import { getFromLs, saveToLs } from "../../services/LocalServices";
import "../AnimalDetails/AnimalDetails.scss";
import errorImg from "../../assets/brokenimg.png";

export const AnimalDetails = () => {
  const imageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = errorImg;
  };

  const [disabled, setDisabled] = useState(false);
  const [animal, setAnimal] = useState<IAnimalResponse>({
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    shortDescription: "",
    longDescription: "",
    imageUrl: "",
    medicine: "",
    isFed: false,
    lastFed: "",
  });

  // const { id } = useParams();
  let animalId = useParams() as { id: string };

  useEffect(() => {
    let staticDate = new Date().getTime();
    let listFromLs: IAnimalResponse[] = getFromLs();
    let hours = Math.floor(10800000);

    for (let i = 0; i < listFromLs.length; i++) {
      if (+staticDate - new Date(listFromLs[i].lastFed).getTime() > hours) {
        listFromLs[i].isFed = false;
      }
      if (+animalId.id === listFromLs[i].id) {
        setAnimal(listFromLs[i]);
      } else {
      }
    }
    saveToLs(listFromLs);
  }, [animalId.id]);

  const handleSubmit = () => {
    animal.isFed = false;
    let foodTime = new Date();
    animal.lastFed = foodTime.toLocaleString();
    setAnimal({ ...animal });
    setDisabled(true);
    setTimeout(setDisabled, 10000);

    let getAnimalListFromLs: IAnimalResponse[] = getFromLs();

    // for (let i = 0; i < getAnimalListFromLs.length; i++) {
    //   if (animal.id === getAnimalListFromLs[i].id) {
    //     getAnimalListFromLs[i] = { ...animal };
    //   }
    // }

    getAnimalListFromLs.map(() => {});

    saveToLs(getAnimalListFromLs);
  };

  return (
    <div className="details">
      <div className="details__container">
        <h3 className="details__name">{animal.name}</h3>
        <p>Född år {animal.yearOfBirth}</p>
        <img
          className="details__img"
          src={animal.imageUrl}
          alt={animal.name}
          onError={imageError}
        />
        <p className="details__desc">{animal.longDescription}</p>
        <div className="details__moreInfo">
          <p>Vetenskapligt namn: {animal.latinName}</p>
          <p>Mediciner: {animal.medicine}</p>
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="details__button"
          id="submitButton"
          onClick={handleSubmit}
        >
          Mata {animal?.name}
        </button>
        <p>
          <strong>Senast matad: </strong>
          {animal.lastFed}
        </p>
      </div>
    </div>
  );
};
