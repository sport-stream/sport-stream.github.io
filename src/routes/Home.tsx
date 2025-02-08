import {
  Card,
  Container,
  Divider,
  Dropdown,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Popup,
  Segment,
} from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import Watch from "../static/img/watch.png";
import { formatDateTime } from "../utils/date";
import { Ads } from "../ads";
import React, { useEffect } from "react";
import { transliterate } from "../utils/lang";
import ReactGA from "react-ga";
import { useFavorites } from "../hooks/useFavorites";

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
  search: string;
}) => (
  <Container textAlign="center" style={{ marginTop: "20px" }}>
    <Segment raised>
      <Input
        fluid
        size="large"
        icon="search"
        iconPosition="left"
        placeholder="Search Game or League..."
        value={search}
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
        style={{
          borderRadius: "25px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Segment>
  </Container>
);

export const Home = (props: { data: any }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const location = useLocation();
  const [search, setSearch] = React.useState<string>("");
  useEffect(() => {
    const parameters = new URLSearchParams(location.search);
    const sQuery = parameters.get("s");
    setSearch(sQuery || "");
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
      if (!search?.length) return true;
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
      <HomeGames {...{ games }} />
      <Ads />
    </>
  );
};

const HomeGames = ({ games }: any) => {
  const { favorites } = useFavorites();
  const favoriteGames = games?.filter((game: any) => {
    const isLeagueFavorite = favorites.includes(game.league);
    const isHomeTeamFavorite = favorites.includes(game.teams.homeTeam);
    const isAwayTeamFavorite = favorites.includes(game.teams.awayTeam);
    return isLeagueFavorite || isHomeTeamFavorite || isAwayTeamFavorite;
  });

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
      <Container>
        <Segment inverted color="yellow" textAlign="center">
          <Header as="h2" icon>
            <Icon name="star" circular />
            <Header.Content>Favorites Games</Header.Content>
          </Header>
          {!favoriteGames?.length && (
            <Container color="yellow" textAlign="center">
              <Header inverted as="h4" icon>
                <Header.Content>
                  To add favorite games click on the star icon
                </Header.Content>
              </Header>
            </Container>
          )}
        </Segment>
      </Container>
      <Divider />
      <Card.Group centered>
        {favoriteGames?.map((game: any, i: number) => (
          <HomeGame key={i} {...{ game }} />
        ))}
      </Card.Group>
      <Divider />
      <Container textAlign="center">
        <Segment inverted color="green" textAlign="center">
          <Header as="h2" icon>
            <Icon name="soccer" circular />
            <Header.Content>All Games</Header.Content>
          </Header>
        </Segment>
      </Container>
      <Divider />
      {chunkedGames?.map((chunk: any, x: number) => (
        <Card.Group key={x} centered>
          {chunk.map((game: any, i: number) => (
            <HomeGame key={i} {...{ game }} />
          ))}
          <Ads />
        </Card.Group>
      ))}
    </>
  );
};

const HomeGame = ({ game }: any) => {
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isLeagueFavorite = favorites.includes(game.league);
  const isHomeTeamFavorite = favorites.includes(game.teams.homeTeam);
  const isAwayTeamFavorite = favorites.includes(game.teams.awayTeam);
  const isFavorite =
    isLeagueFavorite || isHomeTeamFavorite || isAwayTeamFavorite;
  const formattedDate = formatDateTime(game.time);

  return (
    <Card
      onClick={() => {
        const gameHashed = btoa(transliterate(JSON.stringify(game)));
        navigate(`/Game?g=${gameHashed}`);
      }}
      color={isFavorite ? "yellow" : "green"}
      style={{
        width: 300,
        margin: 10,
        backgroundColor: isFavorite ? "#FFFACD" : "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        borderRadius: "15px",
      }}
      onMouseEnter={(e: any) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e: any) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <Card.Content>
        <Popup
          inverted
          trigger={
            <Icon
              style={{
                zIndex: 2,
                position: "absolute",
                top: 5,
                left: 5,
                backgroundColor: "black",
              }}
              circular
              color="yellow"
              name={isHomeTeamFavorite ? "star" : "star outline"}
              onClick={(e: any) => {
                e.stopPropagation();
                if (isHomeTeamFavorite) {
                  removeFavorite(game.teams.homeTeam);
                } else {
                  addFavorite(game.teams.homeTeam);
                }
              }}
            />
          }
          content={
            isHomeTeamFavorite
              ? `Remove ${game.teams.homeTeam} from favorites teams`
              : `Add ${game.teams.homeTeam} to favorites teams`
          }
          position="top left"
        />
        <Popup
          inverted
          trigger={
            <Icon
              style={{
                zIndex: 2,
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "black",
              }}
              circular
              color="yellow"
              name={isAwayTeamFavorite ? "star" : "star outline"}
              onClick={(e: any) => {
                e.stopPropagation();
                if (isAwayTeamFavorite) {
                  removeFavorite(game.teams.awayTeam);
                } else {
                  addFavorite(game.teams.awayTeam);
                }
              }}
            />
          }
          content={
            isAwayTeamFavorite
              ? `Remove ${game.teams.awayTeam} from favorites teams`
              : `Add ${game.teams.awayTeam} to favorites teams`
          }
          position="top right"
        />
        <Card.Header
          textAlign="center"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 16,
            fontWeight: "bold",
            width: "82%",
            margin: "auto",
            marginTop: -5,
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
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
      >
        <Popup
          inverted
          trigger={
            <Icon
              style={{ zIndex: 2 }}
              color="yellow"
              name={isLeagueFavorite ? "star" : "star outline"}
              onClick={(e: any) => {
                e.stopPropagation();
                if (isLeagueFavorite) {
                  removeFavorite(game.league);
                } else {
                  addFavorite(game.league);
                }
              }}
            />
          }
          content={
            isLeagueFavorite
              ? `Remove ${game.league} from favorites leagues`
              : `Add ${game.league} to favorites leagues`
          }
          position="bottom left"
        />
        {game.league}
      </Label>
    </Card>
  );
};
