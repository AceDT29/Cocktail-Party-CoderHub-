
import { useState } from "react";
import { useGenerateList } from "../customHooks/anyCustomHooks";

export function ShowByRandomList({ randomValues }) {
  const [letters, setLetters] = useState([]);
  const drinks = useGenerateList(letters);

  const handleShowRandomDrink = () => {
    setLetters(randomValues(7));
  };

  console.log(letters);

  return (
    <div className="ChooseCard">
      <h2>Random Drink</h2>
      <div>
        <button
          onClick={handleShowRandomDrink}
          className="bg-blue-500 text-white p-2 cursor-pointer rounded-md active:scale-95 transition-all"
        >
          Show random drink
        </button>
      </div>
      <ul className="flex flex-col gap-4 p-4 items-center ">
        {drinks.map(item => (
          <li className="w-full h-full flex flex-col items-center" key={item?.idDrink}>
            <p className="font-extralight text-lg">{item?.strDrink}</p>
            <figure className='w-[90%] h-[90%] rounded-md'>
              <img className='w-full h-full object-cover rounded-md' src={item?.strDrinkThumb} alt={item.strDrink} />
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
