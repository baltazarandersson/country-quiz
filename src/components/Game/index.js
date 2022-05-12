import { useSelector } from "react-redux";
import { GameContainer } from "../GameContainer";
import { Menu } from "./Menu";

export function Game() {
  const loading = useSelector((state) => state.ui.loading);
  const inGame = useSelector((state) => state.ui.inGame);

  return (
    <div className="flex flex-col gap-8 w-full p-8 bg-slate-50 rounded-xl relative">
      {!inGame ? (
        <Menu />
      ) : loading ? (
        <h2 className="text-2xl font-bold text-slate-700">Loading...</h2>
      ) : (
        <GameContainer />
      )}
    </div>
  );
}
