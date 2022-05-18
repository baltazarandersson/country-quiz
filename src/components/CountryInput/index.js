import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export function CountryInput({ sumbit }) {
  const [keyword, setKeyword] = useState();
  const inputRef = useRef();
  const lives = useSelector((state) => state.user.remainingLives);

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  return (
    <div className="w-full flex gap-4 items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sumbit(keyword);
          e.target.value = "";
          inputRef.current.value = "";
          setKeyword("");
        }}
        className="grow"
      >
        <input
          ref={inputRef}
          onChange={handleChange}
          placeholder=". . ."
          className="w-full flex items-center justify-between px-4 py-2 text-xl gap-4 rounded-xl text-slate-700 bg-slate-300"
        ></input>
      </form>
      <div className="px-4 py-2 bg-red-500 text-red-100 w-fit rounded-xl font-semibold">
        Lives : {lives}
      </div>
    </div>
  );
}
