import { GameContainer } from "../GameContainer";

export function Game() {
  return (
    <div className="flex flex-col gap-8 w-full p-8 bg-slate-50 rounded-xl relative">
      <GameContainer />
    </div>
  );
}
