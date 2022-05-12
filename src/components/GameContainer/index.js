import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/getAllCountries";
import { LooseContainer } from "../LooseContainer";
import svg from "../../assets/icons/globe.svg";
import { OptionsContainer } from "../OptionsContainer";
import { useSelector } from "react-redux";
import { useText } from "../../hooks/useText";

const INTIAL_POINTS = 0;

export function GameContainer() {
  const [userPoints, setUserPoints] = useState(INTIAL_POINTS);
  const [userAnswer, setUserAnswered] = useState({});
  const [answer, setAnswer] = useState();
  const [options, setOptions] = useState([]);
  const countriesData = useSelector((state) => state.countries.list);
  const [gameLoose, setLoose] = useState(false);
  const text = useText();

  useEffect(() => {
    setAnswer(randomCountry());
  }, [countriesData]);

  useEffect(() => {
    if (answer) {
      generateOptions();
    }
  }, [answer]);

  function nextRound() {
    setAnswer(randomCountry());
  }

  function generateOptions() {
    let newOptions = new Array(4);
    const answerPosition = Math.floor(Math.random() * 4);
    newOptions[answerPosition] = answer;
    for (let i = 0; i < 4; i++) {
      if (i === answerPosition) {
        continue;
      }
      newOptions[i] = randomCountry();
    }
    setOptions(newOptions);
  }

  function randomCountry() {
    const country =
      countriesData[Math.floor(Math.random() * countriesData.length)];
    return country;
  }

  function resetGame() {
    setUserAnswered({
      answered: false,
      answeredCorrectly: undefined,
      answeredCountry: undefined,
    });
    setUserPoints(INTIAL_POINTS);
    nextRound();
    setLoose(false);
  }

  function handleNextRound() {
    nextRound();
    setUserAnswered({
      answered: false,
      answeredCorrectly: undefined,
      answeredCountry: undefined,
    });
  }

  function handleClick(option) {
    setUserAnswered({
      answered: true,
      answeredCorrectly: option === answer,
      answeredCountry: option,
    });
    option === answer ? setUserPoints((points) => points + 1) : setLoose(true);
  }

  if (gameLoose) {
    return <LooseContainer score={userPoints} onClick={resetGame} />;
  }

  if (answer) {
    return (
      <>
        <img
          className="w-1/3 absolute right-0 top-0 -translate-y-1/2"
          src={svg}
          alt="icon"
        />
        <div className="flex flex-col gap-2">
          <img
            className="h-16 w-fit shadow-lg"
            src={answer.flags.png}
            alt="flag"
          />
          <div className="w-full flex justify-between items-end">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-700">
              {text.gameContainer.title}
            </h2>
            <p className="text-md sm:text-lg font-semibold text-slate-400">
              {text.gameContainer.points} {userPoints}
            </p>
          </div>
        </div>
        <section className="flex flex-col gap-4">
          <OptionsContainer
            handleClick={handleClick}
            options={options}
            answer={answer}
            userAnswer={userAnswer}
          />
        </section>
        <button
          className={`px-4 py-2 font-bold bg-green-500 text-green-100 border-2 border-green-500 rounded transition-transform absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${
            userAnswer.answered ? "scale-100" : "scale-0"
          }`}
          onClick={handleNextRound}
        >
          {text.gameContainer.button}
        </button>
      </>
    );
  }
}
