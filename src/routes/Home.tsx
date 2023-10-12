import { useNavigate } from "react-router-dom";

export const Home = (props: { data: any; setGame: any }) => {
  const navigate = useNavigate();
  const games = props.data?.values?.[0].map(JSON.parse);
  return (
    <div>
      {games?.map((g: any, i: number) => (
        <div
          key={i}
          onClick={() => {
            props.setGame(g);
            navigate("/game");
          }}
        >
          <p>***********</p>
          <h3>League: {g.league}</h3>
          <p>Date: {g.time}</p>
          {/* <p>{g.link}</p>  not relevant */}
          <p>{g.links.toString()}</p>
          <p>
            {g.teams.homeTeam} vs {g.teams.awayTeam}
          </p>
          <p>***********</p>
        </div>
      ))}
    </div>
  );
  //   return <div>{JSON.stringify(games)}</div>;
};
