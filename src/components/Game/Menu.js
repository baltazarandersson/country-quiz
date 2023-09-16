import { useDispatch, useSelector } from "react-redux";
import { useText } from "../../hooks/useText";
import { toggleInGame } from "../../slices/ui";
import { setDifficulty, setLanguage } from "../../slices/user";
import { Switch } from "./Switch";

export function Menu() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.user.language);
  const difficulty = useSelector((state) => state.user.difficulty);
  const text = useText();

  function changeLanguage(payload) {
    dispatch(setLanguage(payload));
  }
  function changeDifficulty(payload) {
    dispatch(setDifficulty(payload));
  }

  function handleStart() {
    dispatch(toggleInGame());
  }

  return (
    <>
      <h2 className="text-lg font-bold sm:text-2xl text-slate-700">
        {text.menu.title}
      </h2>
      <Switch
        setter={changeLanguage}
        selected={language}
        optionA={{
          name: "English",
          payload: "EN",
        }}
        optionB={{
          name: "Español",
          payload: "ES",
        }}
      />
      <Switch
        setter={changeDifficulty}
        selected={difficulty}
        optionA={{
          name: "Normal",
          payload: 1,
        }}
        optionB={{
          name: "Hard",
          payload: 2,
        }}
      />
      <button
        className={`w-full px-4 py-2 cursor-pointer font-semibold text-xl rounded-xl border-2 bg-green-500 border-green-500 text-green-100 hover:bg-green-400 hover:border-green-400 duration-300`}
        onClick={() => handleStart()}
      >
        {text.menu.button}
      </button>
    </>
  );
}
