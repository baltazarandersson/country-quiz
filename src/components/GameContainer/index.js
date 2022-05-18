import { useEffect, useState } from "react";
import { LooseContainer } from "../LooseContainer";
import svg from "../../assets/icons/globe.svg";
import { OptionsContainer } from "../OptionsContainer";
import { useDispatch, useSelector } from "react-redux";
import { useText } from "../../hooks/useText";
import {
  decreaseLives,
  increasePoints,
  resetLives,
  resetPoints,
} from "../../slices/user";
import { CountryInput } from "../CountryInput";

export function GameContainer() {
  const userPoints = useSelector((state) => state.user.points);
  const difficulty = useSelector((state) => state.user.difficulty);
  const countriesData = useSelector((state) => state.countries.list);
  const lives = useSelector((state) => state.user.remainingLives);
  const [roundState, setRoundState] = useState({
    answered: false,
    answeredCorrectly: undefined,
    answeredCountry: undefined,
    gameLoose: false,
  });
  const [answer, setAnswer] = useState();
  const [options, setOptions] = useState([]);
  const text = useText();
  const dispatch = useDispatch();

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
    setRoundState({
      answered: false,
      answeredCorrectly: undefined,
      answeredCountry: undefined,
      gameLoose: false,
    });
  }

  function generateOptions() {
    const newOptions = [];

    for (let index = 0; index < 4; index++) {
      let newCountry = randomCountry();
      if (
        newOptions.findIndex(
          (el) => el.name.common === newCountry.name.common
        ) === -1
      ) {
        newCountry = randomCountry();
      }
      newOptions[index] = newCountry;
    }

    const answerPosition = Math.floor(Math.random() * 4);
    newOptions[answerPosition] = answer;
    setOptions(newOptions);
  }

  function randomCountry() {
    const country =
      countriesData[Math.floor(Math.random() * countriesData.length)];
    return country;
  }

  function resetGame() {
    dispatch(resetPoints());
    dispatch(resetLives());
    nextRound();
  }

  function handleNextRound() {
    nextRound();
  }

  function handleSumbit(option) {
    const answeredCorrectly = option === answer;
    if (answeredCorrectly) {
      setRoundState({
        ...roundState,
        answered: true,
        answeredCorrectly: true,
        answeredCountry: option,
      });
      dispatch(increasePoints());
    } else {
      setRoundState({
        answered: true,
        answeredCorrectly: false,
        answeredCountry: option,
        gameLoose: true,
      });
    }
  }

  function handleInputSumbit(option) {
    if (roundState.answered) return;
    const result =
      option.toLowerCase() === answer.name.common.toLowerCase() ||
      option.toLowerCase() === answer.translations.spa.common.toLowerCase();

    if (result) {
      setRoundState({
        ...roundState,
        answered: true,
        answeredCorrectly: true,
        answeredCountry: option,
      });
      dispatch(increasePoints());
    } else if (lives - 1 > 0) {
      setRoundState({
        ...roundState,
        answered: true,
        answeredCorrectly: false,
        answeredCountry: option,
      });
      dispatch(decreaseLives());
    } else {
      setRoundState({
        answered: true,
        answeredCorrectly: false,
        answeredCountry: option,
        gameLoose: true,
      });
    }
  }

  if (roundState.gameLoose) {
    return <LooseContainer onClick={resetGame} />;
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
        {difficulty ? (
          <CountryInput sumbit={handleInputSumbit} />
        ) : (
          <section className="flex flex-col gap-4">
            <OptionsContainer
              handleClick={handleSumbit}
              options={options}
              answer={answer}
              roundState={roundState}
            />
          </section>
        )}
        <button
          className={`px-4 py-2 font-bold bg-green-500 text-green-100 border-2 border-green-500 rounded transition-transform absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${
            roundState.answered ? "scale-100" : "scale-0"
          }`}
          onClick={handleNextRound}
        >
          {text.gameContainer.button}
        </button>
      </>
    );
  }
}
