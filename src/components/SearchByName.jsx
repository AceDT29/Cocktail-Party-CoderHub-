import { useState } from "react";
import { useSearchByName } from "../customHooks/anyCustomHooks";

export function SearchByName() {
  const [entries, setEntries] = useState('');
  const dataResults = [];

  const handleInputEntries = (inputValue) => {
    setTimeout(() => {
      setEntries(inputValue);
    }, 900);
  };

  const searchResults = useSearchByName(entries);
  dataResults.push(searchResults);
    return (
        <div className="ChooseCard">
            <h3 className="text-lg text-center font-bold">By name:</h3>
            <div className="flex flex-col justify-center gap-y-1 items-center">
                <label className="text-lg text-center font-semibold" htmlFor="search">Search drinks:</label>
                <input className="w-32 h-8 border rounded-md p-2" type="text" id="search" onInput={(e) => handleInputEntries(e.target.value)} />
            </div>
            {dataResults.length === 0 ? <p>No drinks available</p> : (
                <ul className="flex flex-col gap-4 p-4 items-center ">
                    {dataResults.map(item => (
                        <li className="w-full h-full flex flex-col items-center" key={item?.idDrink}>
                            <p className="font-extralight text-lg">{item?.strDrink}</p>
                            <figure className='w-[90%] h-[90%] rounded-md'>
                                <img className='w-full h-full object-cover rounded-md' src={item?.strDrinkThumb} alt={item.strDrink} />
                            </figure>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
            