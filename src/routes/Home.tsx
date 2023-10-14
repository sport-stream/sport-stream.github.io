import { useNavigate } from "react-router-dom";
import { Card, Divider, Image, Label } from "semantic-ui-react";
import Watch from "../static/img/watch.png";
import { formatDateTime } from "../utils/date";
import { Ads } from "../ads";

export const Home = (props: { data: any; setGame: any }) => {
  const games = props.data?.values?.[0].map(JSON.parse);
  return (
    <>
      <Ads />
      <Divider />
      <HomeGames {...{ games, setGame: props.setGame }} />;
      <Ads />
    </>
  );
};

const HomeGames = ({ games, setGame }: any) => {
  const chunkedGames = games?.reduce(
    (acc: any, game: any) => {
      const lastChunk = acc[acc.length - 1];
      if (lastChunk.length === 24) {
        acc.push([game]);
      } else {
        lastChunk.push(game);
      }
      return acc;
    },
    [[]]
  );
  return (
    <>
      {chunkedGames?.map((chunk: any) => (
        <>
          <Card.Group centered>
            {chunk.map((game: any) => (
              <HomeGame {...{ game, setGame }} />
            ))}
          </Card.Group>
          <Ads />
        </>
      ))}
    </>
  );
};

const HomeGame = ({ game, setGame }: any) => {
  const navigate = useNavigate();
  const formattedDate = formatDateTime(game.time);

  return (
    <Card
      onClick={() => {
        setGame(game);
        navigate("/Game");
      }}
      color="yellow"
    >
      <Card.Content>
        <Card.Header
          textAlign="center"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 16,
          }}
        >
          <u>
            {game.teams.homeTeam} - {game.teams.awayTeam}
          </u>
        </Card.Header>
        <Image
          style={{ paddingTop: 20 }}
          floated="right"
          size="mini"
          src={Watch}
        />
        <Divider />
        <Card.Meta style={{ paddingLeft: 10, marginBottom: 30 }}>
          {formattedDate}
        </Card.Meta>
      </Card.Content>
      <Label
        attached="bottom"
        color="black"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {game.league}
      </Label>
    </Card>
  );
};
