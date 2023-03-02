import { useNavigate } from "react-router-dom";
import { IAnimalResponse } from "../../models/IAnimalResponse";
import errorImg from "../../assets/brokenimg.png";
import "../Animal/Animal.scss";

interface IAnimalProps {
  animal: IAnimalResponse;
}

export const Animal = (props: IAnimalProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animal/${props.animal.id}`);
  };

  const imageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = errorImg;
  };

  return (
    <div className="animalsHtml">
      <div className="animalsHtml__container">
        <h3 className="animalsHtml__container__name">{props.animal.name}</h3>
        <img
          className="animalsHtml__container__img"
          onClick={handleClick}
          src={props.animal.imageUrl}
          alt={props.animal.name}
          onError={imageError}
        />
        <p>{props.animal.shortDescription}</p>
      </div>
    </div>
  );
};
