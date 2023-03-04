import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimalResponse } from "../../models/IAnimalResponse";
import { getFromLs, saveToLs } from "../../services/LocalServices";
import "../AnimalDetails/AnimalDetails.scss";
import errorImg from "../../assets/brokenimg.png";
import { getAnimalById } from "../../services/animalService";

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

  const { id } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    let lastFedTime = localStorage.getItem(`animal-${id}`);

    const getData = async () => {
      if (id) {
        let response = await getAnimalById(+id);
        console.log(response);

        if (response.animal) {
          if (lastFedTime) {
            // Ersätt default datumet från api anropet med värdet från ls
            response.animal.lastFed = lastFedTime;
            let lastFed = new Date(lastFedTime).getTime();

            let now = new Date().getTime();
            const timeDiff = (now - lastFed) / 1000 / 60 / 60;

            if (timeDiff > 3) {
              setDisabled(false);
              console.log(lastFed);
            } else {
              setDisabled(true);
            }
          }
          setAnimal(response.animal);
        } else {
          setError(response.error);
        }
      }
    };

    getData();
  }, []);

  const handleSubmit = () => {
    animal.isFed = true;
    let foodTime = new Date();
    animal.lastFed = foodTime.toLocaleString();
    setAnimal({ ...animal });
    setDisabled(true);
    setTimeout(setDisabled, 10000);
    localStorage.setItem(`animal-${id}`, foodTime.toString());

    let getAnimalListFromLs: IAnimalResponse[] = getFromLs();

    for (let i = 0; i < getAnimalListFromLs.length; i++) {
      if (animal.id === getAnimalListFromLs[i].id) {
        getAnimalListFromLs[i] = { ...animal };
      }
    }

    saveToLs(getAnimalListFromLs);
  };

  return (
    <div className="">
      {error !== "" ? (
        <div>
          <h2>{error}</h2>
        </div>
      ) : (
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
      )}
    </div>
  );
};
