import type { CharacterType } from "../../types/character";
import "./styles.css";

type Props = {
  character: CharacterType;
};

export const CharacterCard = ({ character }: Props) => {
  return (
    <div className="cardContainer">
      <div className="characterDataContainer">
        <h2>{character.name}</h2>
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Año Nacimiento:</strong> {character.birth_year}</p>
        <p><strong>Altura:</strong> {character.height} cm</p>
        <p><strong>Peso:</strong> {character.mass} kg</p>
        <p><strong>Color de pelo:</strong> {character.hair_color}</p>
        <p><strong>Color de piel:</strong> {character.skin_color}</p>
        <p><strong>Color de ojos:</strong> {character.eye_color}</p>
      </div>
    </div>
  );
};