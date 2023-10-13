import { useNavigate } from "react-router-dom";
import { Card, Divider, Grid, Image } from "semantic-ui-react";
import Watch from "../static/img/watch.png";

export const Home = (props: { data: any; setGame: any }) => {
  const games = props.data?.values?.[0].map(JSON.parse);
  return <HomeGames {...{ games, setGame: props.setGame }} />;
};
const HomeGames = ({ games, setGame }: any) => {
  return (
    <Grid columns={4} doubling>
      {games?.map((game: any) => (
        <Grid.Column>
          <HomeGame {...{ game, setGame }} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

const HomeGame = ({ game, setGame }: any) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        setGame(game);
        navigate("/Game");
      }}
    >
      <Card.Content>
        <Card.Header textAlign="center">
          {game.teams.homeTeam} vs {game.teams.awayTeam}
        </Card.Header>
        <Divider />
        <Image floated="right" size="mini" src={Watch} />
        <Card.Meta style={{ paddingLeft: 10 }}>{game.time}</Card.Meta>
        <Card.Meta style={{ paddingLeft: 10 }}>
          <b>{game.league}</b>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};
