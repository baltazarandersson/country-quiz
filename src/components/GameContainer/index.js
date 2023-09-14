import { useCallback, useEffect, useState } from "react";
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
    lostRound: false,
  });
  const [answer, setAnswer] = useState();
  const [options, setOptions] = useState([]);
  const text = useText();
  const dispatch = useDispatch();

  function nextRound() {
    setAnswer(randomCountry());
    setRoundState({
      answered: false,
      answeredCorrectly: undefined,
      answeredCountry: undefined,
      lostRound: false,
    });
  }

  const randomCountry = useCallback(
    (list = countriesData) => {
      const country = list[Math.floor(Math.random() * list.length)];
      return country;
    },
    [countriesData]
  );

  const generateOptions = useCallback(() => {
    const newOptions = [];
    const countryList = [...countriesData];

    const answerIdx = countryList.findIndex((country) => {
      return country.name.common === answer.name.common;
    });
    countryList.splice(answerIdx, 1);

    for (let index = 0; index < 4; index++) {
      let newCountry = randomCountry(countryList);
      const newCountryIdx = countryList.findIndex((country) => {
        return country.name.common === newCountry.name.common;
      });

      countryList.splice(newCountryIdx, 1);

      newOptions[index] = newCountry;
    }

    const answerPosition = Math.floor(Math.random() * 4);
    newOptions[answerPosition] = answer;
    setOptions(newOptions);
  }, [answer, countriesData, randomCountry]);

  function resetGame() {
    dispatch(resetPoints());
    dispatch(resetLives());
    nextRound();
  }

  useEffect(() => {
    setAnswer(randomCountry());
  }, [countriesData, randomCountry]);

  useEffect(() => {
    if (answer) {
      generateOptions();
    }
  }, [answer, generateOptions]);

  function handleNextRound() {
    if (roundState.answeredCorrectly) return nextRound();

    setRoundState((state) => ({ ...state, lostRound: true }));
  }

  function handleSumbit(option) {
    const answeredCorrectly = option === answer;

    setRoundState({
      ...roundState,
      answered: true,
      answeredCorrectly,
      answeredCountry: option,
    });
    dispatch(increasePoints());
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
        answeredCorrectly: true,
        answeredCountry: option,
      });
      dispatch(decreaseLives());
    } else {
      setRoundState({
        answered: true,
        answeredCorrectly: false,
        answeredCountry: option,
        lostRound: true,
      });
    }
  }

  if (roundState.lostRound) {
    return <LooseContainer onClick={resetGame} />;
  }

  if (answer) {
    return (
      <>
        <img
          className="absolute top-0 right-0 w-1/3 -translate-y-1/2"
          src={svg}
          alt="icon"
        />
        <div className="flex flex-col gap-2">
          <img
            className="h-16 shadow-lg w-fit"
            src={answer.flags.png}
            alt="flag"
          />
          <div className="flex items-end justify-between w-full">
            <h2 className="text-lg font-bold sm:text-2xl text-slate-700">
              {text.gameContainer.title}
            </h2>
            <p className="font-semibold text-md sm:text-lg text-slate-400">
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
          {roundState.answeredCorrectly
            ? text.gameContainer.button
            : "See results"}
        </button>
      </>
    );
  }
}
