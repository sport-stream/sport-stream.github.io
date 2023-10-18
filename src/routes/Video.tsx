import React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { Ads } from "../ads";
import { useLocation } from "react-router-dom";

export const Video = () => {
  const { search } = useLocation();
  const parameters = new URLSearchParams(search);
  const videoHashed = parameters.get("v");
  const video = atob(videoHashed || "");
  const [loading, setLoading] = React.useState(true);

  // TODO loading timeout navigate back
  if (!video) return null;
  return (
    <Container>
      <Container>
        <Dimmer active={loading}>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
        <Ads />
        <iframe
          onLoad={() => setLoading(false)}
          title="sports streams, football, soccer, nfl, nhl, nba"
          width="100%"
          height="650"
          style={{
            border: "none",
            overflow: "hidden",
          }}
          src={video}
        ></iframe>
        <Ads />
      </Container>
    </Container>
  );
};
