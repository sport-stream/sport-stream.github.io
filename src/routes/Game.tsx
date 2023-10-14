import { useNavigate } from "react-router-dom";
import {
  Divider,
  Grid,
  Header,
  Label,
  Segment,
  Image,
  List,
} from "semantic-ui-react";
import Watch from "../static/img/watch.png";

export const Game = (props: any) => {
  const game = props.game;
  if (!game) return null;
  return (
    <Segment style={{ backgroundColor: "white" }}>
      <Header textAlign="center">
        {game.teams.homeTeam} <span> vs </span> {game.teams.awayTeam}
      </Header>
      <Divider />
      <p>
        <b>{game.time}</b>
      </p>
      <Label>{game.league}</Label>
      <Divider />
      <GameLinks {...{ links: game.links, setVideo: props.setVideo }} />
    </Segment>
  );
};

const GameLinks = ({ links, setVideo }: any) => {
  if (!links.length)
    return (
      <Segment>links will be ready 30-15 min before the game started</Segment>
    );
  return (
    <Segment>
      <Grid columns={2} doubling>
        {links?.map(({ link, rate }: any) => (
          <Grid.Column>
            <GameLink {...{ rate, link, setVideo }} />
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
};

const GameLink = ({ rate, link, setVideo }: any) => {
  const navigate = useNavigate();
  return (
    <Segment
      onClick={() => {
        setVideo({ rate, link });
        const encodedLink = btoa(link);
        navigate(`/Video?v=${encodedLink}`);
      }}
    >
      <List>
        <List.Item>
          <Image avatar src={Watch} />
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
    </Segment>
  );
};
