import React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";

const getUrlParameter = (name: string) => {
  return window.location.search.split(`${name}=`)[1].split("&")[0];
};

export const Video = (props: any) => {
  let video = props.video;
  if (!video) {
    video = { link: atob(getUrlParameter("v")) };
  }
  const [loading, setLoading] = React.useState(true);

  if (!video) return null;
  return (
    <Container>
      <Container>
        <Dimmer active={loading}>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
        <iframe
          onLoad={() => setLoading(false)}
          title="sports streams, football, soccer, nfl, nhl, nba"
          width="100%"
          height="650"
          style={{
            border: "none",
            overflow: "hidden",
          }}
          src={video?.link}
        ></iframe>
      </Container>
    </Container>
  );
};
