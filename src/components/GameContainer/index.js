import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/getAllCountries";
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
  const [userAnswer, setUserAnswered] = useState({});
  const [answer, setAnswer] = useState();
  const [options, setOptions] = useState([]);
  const [gameLoose, setLoose] = useState(false);
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
  }

  function generateOptions() {
    let newOptions = new Array(4);
    const answerPosition = Math.floor(Math.random() * 4);
    newOptions[answerPosition] = answer;
    for (let i = 0; i <= 3; i++) {
      if (i === answerPosition) {
        continue;
      }
      let generatedCountry = randomCountry();
      while (generatedCountry.name.common === answer.name.common) {
        generatedCountry = randomCountry();
      }
      newOptions[i] = generatedCountry;
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
    dispatch(resetPoints());
    dispatch(resetLives());
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

  function handleSumbit(option) {
    const result = option === answer;
    setUserAnswered({
      answered: true,
      answeredCorrectly: result,
      answeredCountry: option,
    });
    result ? dispatch(increasePoints()) : setLoose(true);
  }

  function handleInputSumbit(keyword) {
    if (userAnswer.answered) return;
    const result =
      keyword.toLowerCase() === answer.name.common.toLowerCase() ||
      keyword.toLowerCase() === answer.translations.spa.common.toLowerCase();
    setUserAnswered({
      answered: true,
      answeredCorrectly: result,
      answeredCountry: keyword,
    });
    if (result) {
      dispatch(increasePoints());
    } else if (lives - 1 > 0) {
      dispatch(decreaseLives());
    } else {
      setLoose(true);
    }
  }

  if (gameLoose) {
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
              userAnswer={userAnswer}
            />
          </section>
        )}
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
