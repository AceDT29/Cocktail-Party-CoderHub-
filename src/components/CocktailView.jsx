import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSearchQuery } from "../customHooks/useSearchQuery";
import { Link } from "react-router";
import homeIcon from "../assets/home.svg";
import searchBg from "../assets/search-bg.jpg";

export function CocktailView({ children }) {
  const { id } = useParams();
  const result = useSearchQuery(id);
  const { strDrink } = result
  const [cocktail, setCocktail] = useState([]);

  useEffect(() => {
    if (result && Object.keys(result).length > 0) {
      setCocktail([result]);
    }
  }, [result]);

  return (
    <div className="mainContainer mt-20">
      <figure className="absolute top-0 left-0 w-full h-full -z-10">
          <img loading="lazy" className="w-full h-full object-cover rounded-md" src={searchBg} alt="Search Background" />
      </figure>
       <Link to={"/"}>
          <div className="currentTab w-auto hover:h-16 hover:-top-16 -left-0 bg-slate-100 cursor-pointer transition-all">
            Inicio
            <img className="block w-7 h-7" src={homeIcon} alt="" />
          </div>
        </Link>
        <div className="w-auto h-auto my-3 inner-shadow">
          <h2 className="text-3xl my-4 italic font-light">{strDrink}</h2>
        </div>
      {cocktail.length === 0 ? children : (
        <ul className="">
          {cocktail.map(item => (
            <li className="w-full h-full flex flex-wrap justify-evenly" key={item.idDrink}>
              <figure className="w-80 h-80 rounded-md shadow-lg">
                <img className="block w-full h-full rounded-md shadow-lg" src={item.strDrinkThumb} alt={item.strDrink} />
              </figure>
              <div className="w-72 h-72 flex flex-col justify-between">
                <h4 className="font-lexend font-extralight text-2xl my-2">Ingredientes</h4>
                <ol>
                  <li>{item.strIngredient1}</li>
                  <li>{item.strIngredient2}</li>
                  <li>{item.strIngredient3}</li>
                  <li>{item.strIngredient4}</li>
                  <li>{item.strIngredient5}</li>
                  <li>{item.strIngredient6}</li>
                </ol>
                <h4 className="font-lexend text-lg font-extralight">Tipo de vaso: {item.strGlass}</h4>
              </div>
              {item.strInstructionsES ?
                <article className="flex flex-col">
                  <h4 className="italic font-extralight text-2xl my-2">Preparacion:</h4>
                  <p className="text-lg font-extralight">{item.strInstructionsES}</p>
                </article> : 
                <div className="mx-16 my-16 font-lexend font-extralight text-2xl">
                    <p>Sin datos de preparacion para este coctel</p>
                </div>
                }
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

