import { useState } from "react";
import { useSearchQuery } from "../customHooks/useSearchQuery";
import { Link } from "react-router";
import searchBg from "../assets/search-bg.jpg";
import likeIcon from "../assets/like-svgrepo-com.svg";
import searchIcon from "../assets/search-alt-2-svgrepo-com.svg";

export function SearchByName({ placeholder }) {
  const [entries, setEntries] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const searchResults = useSearchQuery(entries);
  const dataResults = []

  const handleInputEntries = (inputValue) => {
    setIsTyping(true);
    setTimeout(() => {
      setEntries(inputValue);
      setIsTyping(false);
    }, 1000);
  };

  dataResults.push(searchResults);

  return (
      <section className="mainContainer">
            <figure className="absolute top-0 left-0 w-full h-full -z-10">
                <img loading="lazy" className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
            </figure>
            <div className="currentTab -top-14">
                Busqueda
                <img className="block w-7 h-7" src={searchIcon} alt="" />
            </div>
        <Link to={"/"}>
            <div className="navTab w-auto -top-12 hover:-top-16">
                Recomendados
                <img className="block w-7 h-7" src={likeIcon} alt="" />
            </div>
        </Link>
           <div className="flex justify-start items-center gap-4 mb-4">
                <h2 className="text-3xl my-4 italic font-semibold">Busqueda por nombre:</h2>
                <div className="flex flex-col justify-center gap-y-1 items-center">
                    <label className="text-lg text-center font-semibold" htmlFor="search"></label>
                        <input
                            className="w-40 md:w-60 h-10 px-4 py-2 border-2 border-pink-200 focus:border-pink-400 bg-pink-50/60 rounded-lg shadow-sm focus:outline-none transition-all duration-200 text-gray-700 placeholder:text-pink-300 font-lexend font-light text-base"
                            type="text"
                            id="search"
                            placeholder="Ej, Mojito, Vodka..."
                            onInput={(e) => handleInputEntries(e.target.value)}
                        />
                </div>
           </div>
           {isTyping ? placeholder : (
                <ul className="flex flex-col justify-center p-4 items-center transition-all">
                    {dataResults.map(item => (
                    <Link to={`/cocktail/${item?.strDrink}`}>
                        <li className={`${item?.strDrink ? 'CardsItemSearch' : 'hidden'}`} key={item?.idDrink}>
                            <figure className='CardsItem-figure'>
                                <img className='w-full h-full block rounded-md' loading="lazy" src={item?.strDrinkThumb} alt={item.strDrink} />
                            </figure>
                            <p className="font-extralight self-center text-lg inner-shadow lg:text-2xl">{item?.strDrink}</p>
                        </li>
                    </Link>
                    ))}
                </ul>
            )}
        </section>
    )
}
            