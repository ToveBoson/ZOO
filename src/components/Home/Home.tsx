import zooImg from "../../assets/zoopic.jpg";

import "../Home/Home.scss";

export const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <h1 className="home__container__welcome">Välkommen till mitt Zoo!</h1>
        <p className="home__container__welcome__info">
          Här hittar du allt i från vandrande pinnar till exotiska papegojor!{" "}
        </p>
        <img
          className="home__container__welcome__img"
          src={zooImg}
          alt="Animals at the zoo"
        />
      </div>
    </div>
  );
};
