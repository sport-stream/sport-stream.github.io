import { useNavigate } from "react-router-dom";
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
  const game = props.game;
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
      <p>
        <b>{formattedDate}</b>
      </p>
      <Label>{game.league}</Label>
      <Divider />
      <GameLinks {...{ links: game.links, setVideo: props.setVideo }} />
      <Divider />
      <Ads />
    </Segment>
  );
};

const GameLinks = ({ links, setVideo }: any) => {
  if (!links.length)
    return (
      <Segment>links will be ready 30-15 min before the game started</Segment>
    );
  return (
    <Card.Group centered>
      {links?.map(({ link, rate }: any) => (
        <GameLink {...{ rate, link, setVideo }} />
      ))}
    </Card.Group>
  );
};

const GameLink = ({ rate, link, setVideo }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        color="green"
        onClick={() => {
          setVideo({ rate, link });
          const encodedLink = btoa(link);
          navigate(`?page=Video&v=${encodedLink}`);
        }}
      >
        <Card.Content>
          <List>
            <List.Item>
              <Image avatar src={Watch} />
              {/* <Image size="mini" floated="right" src={CopyLinkIcon} /> */}
              <List.Content>
                <List.Header as="a">
                  <b>Watch Now</b>
                </List.Header>
                <List.Description>
                  <b>
                    Web - <a>Rate: {rate}</a>
                  </b>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
      </Card>
    </>
  );
};
