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
  if (!links.length) {
    const videos = [
      "https://www.youtube.com/embed/YvUKNMfPwwg",
      "https://www.youtube.com/embed/v5G4EaJBsA4",
      "https://www.youtube.com/embed/Uolw-G1kvZc",
      "https://www.youtube.com/embed/daE1IqYL3VA",
      "https://www.youtube.com/embed/NvTuadLHezI",
      // "https://www.youtube.com/embed/Uolw-G1kvZc",
      // "https://www.youtube.com/embed/Uolw-G1kvZc",
    ];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    return (
      <Segment textAlign="center">
        <Header as="h3" style={{ marginBottom: "1em" }}>
          Links will be available 30-15 minutes before the game starts.
        </Header>
        <p style={{ fontSize: "1.1em", color: "grey" }}>
          Until then, you can watch this video. Please refresh the page when the
          game starts.
        </p>
        <Divider />
        <iframe
          width="560"
          height="315"
          src={`${randomVideo}?autoplay=1&start=3`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Segment>
    );
  }
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
