import { SearchByName } from "./components/SearchByName";
import { ShowByRandomList } from "./components/ShowByRandomList";

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
      <header className="w-full h-auto p-4 mx-auto border bg-amber-200/50 mb-12">
        <h2 className="text-2xl text-center font-bold">Cocktail party🍸</h2>
      </header>
      <article className="w-full h-auto flex justify-around p-3 mx-auto h-min-96 border rounded-md">
        <SearchByName />
        <ShowByRandomList randomValues={getRandomUniqueLetters} />
      </article>
    </>
  );
}

export default App
