import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IAnimalResponse } from "../../models/IAnimalResponse";
import { getAnimalById } from "../../services/animalService";
import { saveToLs } from "../../services/LocalServices";
import "../AnimalDetails/AnimalDetails.scss";

// interface IDetailProps {
//   detail: IAnimalResponse;
// }

// props: IDetailProps

export const AnimalDetails = () => {
  const [animal, setAnimal] = useState<IAnimalResponse>();
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        let response = await getAnimalById(+id);

        if (response.animal) {
          setAnimal(response.animal);
        } else {
          setError(response.error);
        }
      }
    };
    if (animal) return;

    getData();
  });

  //   const [fedTime, setFeedTime] = useState("");
  const [disabled, setDisabled] = useState(false);
  //   const rightnow = JSON.stringify(new Date());

  const handlesubmit = () => {
    // setFeedTime(JSON.stringify(new Date()));
    setDisabled(true);
    setTimeout(setDisabled, 10800000);
    saveToLs(animal);
  };
  console.log(handlesubmit);

  return (
    <div className="">
      {error !== "" ? (
        <div>
          <h2>{error}</h2>
        </div>
      ) : (
        <div className="details">
          <div className="details__container">
            <h3 className="details__name">{animal?.name}</h3>
            <img
              className="details__img"
              src={animal?.imageUrl}
              alt={animal?.name}
            />
            <p className="details__desc">{animal?.longDescription}</p>
            <button
              type="submit"
              disabled={disabled}
              onClick={handlesubmit}
              className="details__button"
              id="submitButton"
            >
              Mata djur
            </button>
            <span className="details__fedOrNot">
              {/* Djuret är matat: {fedTime} */}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
