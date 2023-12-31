import { useLocation, useNavigate } from "react-router-dom";
import {
  Divider,
  Header,
  Label,
  Segment,
  Image,
  List,
  Card,
} from "semantic-ui-react";
import Watch from "../static/img/watch.png";
import { formatDateTime } from "../utils/date";
import { Ads } from "../ads";
// import CopyLinkIcon from "../static/img/copyLink.png";

export const Game = (props: any) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const gameHashed = parameters.get("g");
  const game = JSON.parse(atob(gameHashed || "{}"));

  const formattedDate = formatDateTime(game?.time);
  if (!game) return null;
  return (
    <Segment style={{ backgroundColor: "white" }}>
      <Header textAlign="center">
        {game.teams.homeTeam} <span> vs </span> {game.teams.awayTeam}
      </Header>
      <Divider />
      <Ads />
      <Divider />
      <p
        onClick={() => {
          navigate(`/GameStory?g=${gameHashed}`);
        }}
      >
        <b>{formattedDate}</b>
      </p>
      <Label>{game.league}</Label>
      <Divider />
      <GameLinks {...{ links: game.links }} />
      <Divider />
      <Ads />
    </Segment>
  );
};

const GameLinks = ({ links }: any) => {
  if (!links.length)
    return (
      <Segment>links will be ready 30-15 min before the game started</Segment>
    );
  return (
    <Card.Group centered>
      {links?.map(({ link, rate, svg }: any, i: number) => (
        <GameLink key={i} {...{ rate, link, svg }} />
      ))}
    </Card.Group>
  );
};

const GameLink = ({ rate, link, svg }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        color="yellow"
        style={{ backgroundColor: "#FFFACD" }}
        onClick={() => {
          const encodedLink = btoa(link);
          navigate(`/Video?v=${encodedLink}`);
        }}
      >
        <Card.Content>
          <List>
            <List.Item>
              <Image avatar src={Watch} />
              {svg && <Image floated="right" size="mini" src={svg} />}
              <List.Content>
                <List.Header as="a">
                  <b>Watch Now</b>
                </List.Header>
                <List.Description>
                  <b>Web - Rate: {rate}</b>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    </>
  );
};
