import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Divider,
  Dropdown,
  Image,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";
import Watch from "../static/img/watch.png";
import { formatDateTime } from "../utils/date";
import { Ads } from "../ads";
import React from "react";

const defaultLeagueOption = {
  key: "empty",
  text: "Select League",
  value: "Select League",
};

const SearchGames = ({
  leagues,
  setLeague,
  setSearch,
}: {
  leagues: unknown[];
  setLeague: any;
  setSearch: any;
}) => (
  <Container textAlign="center">
    <Segment>
      <Input
        onChange={(_e, { value }) => setSearch(value)}
        action={
          <Dropdown
            button
            basic
            floating
            onChange={(_e, { value }) => setLeague(value)}
            options={[
              defaultLeagueOption,
              ...(leagues as string[]).map((league: string) => ({
                key: league,
                text: league,
                value: league,
              })),
            ]}
            defaultValue="Select League"
          />
        }
        icon="search"
        iconPosition="left"
        placeholder="Search Game or League..."
      />
    </Segment>
  </Container>
);

export const Home = (props: { data: any; setGame: any }) => {
  const allGames = props.data?.values?.[0].map(JSON.parse);
  const leagues = Array.from(
    new Set(allGames?.map((game: any) => game.league)) || []
  ).sort();
  const [league, setLeague] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string | null>(null);

  const games = allGames
    ?.filter((game: any) => !league || game.league === league)
    .filter(
      (game: any) =>
        !search ||
        game.teams.homeTeam.includes(search) ||
        game.teams.awayTeam.includes(search) ||
        game.league.includes(search)
    );
  return (
    <>
      <Ads />
      <Divider />
      <SearchGames {...{ leagues, setLeague, setSearch }} />
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
