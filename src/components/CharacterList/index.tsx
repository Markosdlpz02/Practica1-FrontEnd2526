import type { CharacterType } from "../../types/character";
import { CharacterCard } from "../CharacterCard";
import "./styles.css";

type Props = {
  characters: CharacterType[];
};

export const CharacterList = ({ characters }: Props) => {
  return (
    <div className="listContainer">
      {characters.map((char) => (
        <CharacterCard key={char.url} character={char} />
      ))}
    </div>
  );
};