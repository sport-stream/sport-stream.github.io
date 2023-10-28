import { useEffect, useState } from "react";
import { Container, Transition } from "semantic-ui-react";
import Background from "../static/img/gameStoryBG.jpg";
import VS from "../static/img/vs.png";
import TeamLabel from "../static/img/teamNameLabel.png";
import { useClubIcon } from "../hooks/useClubIcon";
import { useLocation } from "react-router-dom";
import { formatDateTime } from "../utils/date";

export const GameStory = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(!visible);
    }, 5000);
  }, [visible]);

  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const gameHashed = parameters.get("g");
  const game = gameHashed && JSON.parse(atob(gameHashed));

  const leftClubName = game?.teams.homeTeam;
  const rightClubName = game?.teams.awayTeam;

  const leftClubIcon = useClubIcon(leftClubName);
  const rightClubIcon = useClubIcon(rightClubName);

  const league = game?.league;
  const formattedDate = formatDateTime(game?.time);

  if (!game) return null;
  return (
    <span id="gameStory">
      <Container
        textAlign="center"
        style={{
          backgroundColor: "black",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          aspectRatio: "16/9",
          position: "relative",
        }}
        onClick={() => setVisible(!visible)}
      >
        <Transition animation="fly up" duration={3000} visible={visible}>
          <img
            alt="team label"
            style={{
              position: "absolute",
              width: "100%",
              top: "68%",
            }}
            src={TeamLabel}
          />
        </Transition>
        <Transition animation="zoom" duration={5000} visible={visible}>
          <h1
            style={{
              fontFamily: "fantasy",
              position: "absolute",
              top: "65%",
              color: "white",
              width: "100%",
            }}
          >
            https://sport-stream.github.io/
          </h1>
        </Transition>

        <Transition animation="zoom" duration={5000} visible={visible}>
          <h1
            style={{
              fontFamily: "fantasy",
              position: "absolute",
              top: "75%",
              color: "white",
              width: "50%",
            }}
          >
            {leftClubName}
          </h1>
        </Transition>
        <Transition animation="zoom" duration={5000} visible={visible}>
          <h1
            style={{
              fontFamily: "fantasy",
              position: "absolute",
              color: "white",
              width: "50%",
              top: "75%",
              right: 0,
            }}
          >
            {rightClubName}
          </h1>
        </Transition>

        <Transition animation="zoom" duration={5000} visible={visible}>
          <h2
            style={{
              fontFamily: "fantasy",
              position: "absolute",
              color: "white",
              top: "85%",
              width: "100%",
            }}
          >
            {league} - {formattedDate}
          </h2>
        </Transition>
        <Transition animation="fly right" duration={3000} visible={visible}>
          <img
            alt="left club icon"
            src={leftClubIcon}
            style={{
              position: "absolute",
              maxWidth: "30%",
              minWidth: "25%",
              top: "20%",
              left: "18%",
            }}
          />
        </Transition>
        <Transition animation="zoom" duration={2000} visible={visible}>
          <img
            src={VS}
            alt="vs"
            style={{
              position: "absolute",
              maxWidth: "10%",
              top: "35%",
              left: "45%",
              color: "white",
            }}
          />
        </Transition>
        <Transition animation="fly left" duration={3000} visible={visible}>
          <img
            alt="right club icon"
            src={rightClubIcon}
            style={{
              position: "absolute",
              maxWidth: "30%",
              minWidth: "25%",
              top: "20%",
              right: "18%",
            }}
          />
        </Transition>
      </Container>
    </span>
  );
};
