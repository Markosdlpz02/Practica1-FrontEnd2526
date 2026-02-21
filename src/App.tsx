import { useEffect, useState } from 'react';
import { api } from './api/api';
import type { CharacterType} from './types/character';
import { CharacterList } from './components/CharacterList';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/Error';
import './App.css';

const App = () => {

  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>('/people/');

  const fetchCharacters = async (url: string) => {
    
    setLoading(true);

    await api.get(url)
      .then((e) => {
        setCharacters((prev) => [...prev, ...e.data.results]);
        setNextUrl(e.data.next);
      })
      .catch((e) => {
        setError(`Error al obtener los datos: ${e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters("/people/");
  }, []);

  return (
    <div className="appContainer">
      <h1>Buscador de Personajes Star Wars</h1>

      {error && <ErrorMessage message={error} />}

      {characters.length > 0 && <CharacterList characters={characters} />}

      {loading && <Loader />}

      {!loading && nextUrl && (
        <button 
            className="buttonNextPage" 
            onClick={() => fetchCharacters(nextUrl)}
        >
            Siguiente Página
        </button>
      )}
    </div>
  );
};

export default App;