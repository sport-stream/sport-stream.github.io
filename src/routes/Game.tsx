import { useNavigate } from "react-router-dom";

export const Game = (props: any) => {
  const navigate = useNavigate();

  const game = props.game;
  console.info(`📝 ~ file: Game.tsx:3 ~ Game ~ game:`, game);
  if (!game) return null;
  return (
    <div>
      <p>***********</p>
      <h3>League: {game.league}</h3>
      <p>Date: {game.time}</p>
      {/* <p>{g.link}</p>  not relevant */}
      {game.links.map(({ rate, link }: any) => (
        <div
          onClick={() => {
            props.setVideo({ rate, link });
            navigate("/Video");
          }}
        >
          <p>***********</p>
          <p>Rate:{rate}</p>
          <p>Link:{link}</p>
          <p>***********</p>
        </div>
      ))}
      <p>
        {game.teams.homeTeam} vs {game.teams.awayTeam}
      </p>
      <p>***********</p>
    </div>
  );
};
