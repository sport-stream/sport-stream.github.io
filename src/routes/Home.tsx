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
import { useLocation, useNavigate } from "react-router-dom";
import Watch from "../static/img/watch.png";
import { formatDateTime } from "../utils/date";
import { Ads } from "../ads";
import React, { useEffect } from "react";
import { transliterate } from "../utils/lang";
import ReactGA from "react-ga";

const defaultLeagueOption = {
  key: "empty",
  text: "Select League",
  value: "Select League",
};
const SearchGames = ({
  leagues,
  setLeague,
  setSearch,
  search,
}: {
  leagues: unknown[];
  setLeague: any;
  setSearch: any;
  search: string | null;
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
        value={search}
      />
    </Segment>
  </Container>
);

export const Home = (props: { data: any }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const location = useLocation();
  const [search, setSearch] = React.useState<string | null>(null);
  useEffect(() => {
    const parameters = new URLSearchParams(location.search);
    const sQuery = parameters.get("s");
    setSearch(sQuery);
  }, [location]);

  const allGames = props.data?.values?.[0].map(JSON.parse);
  const leagues = Array.from(
    new Set(allGames?.map((game: any) => game.league)) || []
  ).sort();

  // filters
  const [league, setLeague] = React.useState<string | null>(null);

  const games = allGames
    ?.filter(
      (game: any) =>
        !league || league === "Select League" || game.league === league
    )
    .filter((game: any) => {
      if (!search) return true;
      const searchLower: string = search.toLowerCase();
      const homeTeam: string = transliterate(game.teams.homeTeam).toLowerCase();
      const homeCondition = `${homeTeam}`.includes(searchLower);
      if (homeCondition) return true;
      const awayTeam: string = transliterate(game.teams.awayTeam).toLowerCase();
      const awayCondition = `${awayTeam}`.includes(searchLower);
      if (awayCondition) return true;
      const league: string = transliterate(game.league).toLowerCase();
      const leagueCondition = `${league}`.includes(searchLower);
      return leagueCondition;
    });

  return (
    <>
      <Ads />
      <Divider />
      <SearchGames {...{ leagues, setLeague, setSearch, search }} />
      <Divider />
      <HomeGames {...{ games }} />;
      <Ads />
    </>
  );
};

const HomeGames = ({ games }: any) => {
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
              <HomeGame {...{ game }} />
            ))}
          </Card.Group>
          <Ads />
        </>
      ))}
    </>
  );
};

const HomeGame = ({ game }: any) => {
  const navigate = useNavigate();
  const formattedDate = formatDateTime(game.time);

  return (
    <Card
      onClick={() => {
        const gameHashed = btoa(transliterate(JSON.stringify(game)));
        navigate(`/Game?g=${gameHashed}`);
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