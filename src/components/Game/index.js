import { useSelector } from "react-redux";
import { GameContainer } from "../GameContainer";

export function Game() {
  const loading = useSelector((state) => state.ui.loading);

  return (
    <div className="flex flex-col gap-8 w-full p-8 bg-slate-50 rounded-xl relative">
      {loading ? (
        <h2 className="text-2xl font-bold text-slate-700">Loading...</h2>
      ) : (
        <GameContainer />
      )}
    </div>
  );
}
