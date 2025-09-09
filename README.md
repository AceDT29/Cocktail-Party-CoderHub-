# Cocktail party / Ejemplo de consumo de api

Este es un proyecto construido para mostrar y constatar el correcto uso y consumo de API's,
useEffect y useState para comunicarse con servicios externos y generar una vista accesible de esos datos a nuestros posibles usuarios.

## API de cocteles

el sitio www.thecocktaildb.com/api.php provee una api a la cual lo podemos sacar provecho para obtener una amplia coleccion/recopilacion de cocteles, con los cuales generar una ui con todos los datos que no sean relevantes.

Aunque la api tiene algunas limitaciones como la cantidad de datos que retorna por peticion, siendo estas caraterizticas de pago, para sortear dichas limitaciones me valido de ciertos customHooks que manejan las peticiones de manera personalizada:

```javascript

export const useRandomQuery = (letters) => {
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    if (!letters || letters.length === 0) return;
    const fetchData = async () => {
      try {
        const requests = letters.map(l =>
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${l}`)
            .then(res => res.json())
            .then(data => {
              if (data.drinks && data.drinks.length > 0) {
                return data.drinks[Math.floor(Math.random() * data.drinks.length)];
              }
              return null;
            })
        );
        const results = await Promise.all(requests);
        setRandomList(results.filter(Boolean));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [letters]);

  return randomList;
}

```

El hook useRandomQuery recibe una serie de caracteres aleatorios y permite hacer varias peticiones en paralelo, una vez listas todas estas peticiones el hook retorna todas las peticones englobas en una unica lista la cual sirve para inicializar el estado de randomList asegurando que los elementos dentro de ella sean validos (truty) con .filter(Boolean)

## Navegacion 

Para la navegacion se utilizo react-Router anidando los principales componentes de la vista en un unico contenedor principal, haciendo de la misma una SPA con controles de navegacion usables para el usuario


```javascript

<Routes>
    <Route path="/"
        element={<DailyRandomRecommended
            randomValues={getRandomUniqueLetters}
            placeHolder={<HolderComp holders={3}
            message="Recuperando datos..."
             holderIcon={holderDrinksIcon}
             />}
        />} 
    />
    <Route path="/search" 
        element={<SearchByName 
            placeHolder={<HolderComp 
            holders={1}
            message="Buscando cócteles..."
            holderIcon={holderDrinksIcon}
            />} 
        />}
    />
    <Route path="/cocktail/:id" element={<CocktailView />} />
</Routes>

```
