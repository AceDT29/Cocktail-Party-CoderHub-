import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router";
import { DailyRandomRecommended } from "./components/DailyRandomRecommended";
import { SearchByName } from "./components/SearchByName";
import { HolderComp } from "./components/cocktailPlaceHolder";
import { CocktailView } from "./components/CocktailView";
import holderDrinksIcon from "./assets/cocktail-holder.svg";

function getRandomUniqueLetters(n) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const result = [];
  while (result.length < n && alphabet.length > 0) {
    const idx = Math.floor(Math.random() * alphabet.length);
    result.push(alphabet[idx]);
    alphabet.splice(idx, 1);
  }
  return result;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="sticky z-20 inset-0 w-full h-auto p-4 mx-auto border bg-amber-200/10 backdrop-blur-md mb-16">
          <h2 className="text-2xl text-center font-semibold italic">Cocktail party🍸</h2>
        </header>
        <article className="w-full h-auto mx-auto h-min-[80vh] rounded-md">
          <Routes>
            <Route path="/"
              element={<DailyRandomRecommended
                randomValues={getRandomUniqueLetters}
                children={<HolderComp holders={3}
                message="Recuperando datos..."
                holderIcon={holderDrinksIcon}
                 />}
             />} 
            />
            <Route path="/search" 
            element={<SearchByName 
                children={<HolderComp 
                holders={1}
                message="Buscando cócteles..."
                holderIcon={holderDrinksIcon}
                  />} 
                />}
            />
            <Route path="/cocktail/:id" element={<CocktailView />} />
          </Routes>
        </article>
        <footer className="w-full h-auto p-4 mx-auto border bg-amber-200/10 backdrop-blur-md mt-12">
          <h2 className="text-2xl text-center font-semibold italic">Cocktail party🍸</h2>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App
