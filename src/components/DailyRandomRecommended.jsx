import { useState, useEffect } from "react";
import { useGenerateList } from "../customHooks/anyCustomHooks";
import { Link } from "react-router";
import likeIcon from "../assets/like-svgrepo-com.svg";
import searchIcon from "../assets/search-alt-2-svgrepo-com.svg";
import searchBg from "../assets/search-bg.jpg";

export function DailyRandomRecommended({ randomValues, children }) {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const drinks = useGenerateList(letters);

  function handleShowRandomDrink() {
    setLetters(randomValues(8));
  }

  useEffect(() => {
    handleShowRandomDrink();
  }, []);

  useEffect(() => {
    if (drinks && drinks.length > 0) {
      setLoading(false);
    }
  }, [drinks]);

  return (
    <>
        <section className="mainContainer">
          <figure className="absolute top-0 left-0 w-full h-full -z-10">
              <img className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
          </figure>
          <div className="currentTab">
            Recomendados
            <img className="block w-7 h-7" src={likeIcon} alt="" />
          </div>
        <Link to={"/search"}>
          <div className="navTab">
            Busqueda
            <img className="block w-7 h-7" src={searchIcon} alt="" />
          </div>
        </Link>
          <h2 className="text-3xl my-4 italic font-semibold">Recomendados de hoy</h2>
          <div>
          </div>
          <ul className="flex flex-wrap justify-center gap-8 p-4 items-center ">
            {loading ? children :
              drinks.map(item => (
            <Link to={`/cocktail/${item?.strDrink}`} key={item?.idDrink}>
              <li className="CardsItem">
                <figure className='w-[90%] h-[90%] flex justify-center items-center rounded-md border-yellow-900/50 border-2'>
                  <img className='w-[90%] h-[90%] object-cover rounded-md' loading="lazy" src={item?.strDrinkThumb} alt={item.strDrink} />
                </figure>
                <p className="font-extralight text-lg">{item?.strDrink}</p>
              </li>
            </Link>
            ))}
          </ul>
        </section>
    </>
  );
}
