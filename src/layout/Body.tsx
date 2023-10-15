import React from "react";
import { Video } from "../routes/Video";
import { Game } from "../routes/Game";
import { Home } from "../routes/Home";

import { useFetch } from "../hooks/useFetch";
import { Dimmer, Loader } from "semantic-ui-react";
import { getUrlParameter } from "../utils/url";

const SHEET_ID = "15dkqaVpI8xbAOP7pQfQlHRfqV-l_jQVPt-ni8nMw62Y";
const PUBLIC_API_KEY = "AIzaSyCqYJKdcZo3j6wI6HLmJrUnCP92L-iuE7I";

const getTodaySheet = () => {
  // subtract 5 minutes to avoid timezone issues
  const todayDate = new Date();
  todayDate.setMinutes(todayDate.getMinutes() - 15);

  const newFormat = `${todayDate.getFullYear()}-${todayDate.getDate()}-${
    todayDate.getMonth() + 1
  }`;
  return `${newFormat}-Games`;
};

const Body = (props: any) => {
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${getTodaySheet()}!1:1?key=${PUBLIC_API_KEY}`;
  const { data, error, loading } = useFetch(sheetUrl);

  const [game, setGame] = React.useState<any>(null);
  const [video, setVideo] = React.useState<any>(null);

  const page = getUrlParameter("page");
  let BodyPage = <Home {...{ data, setGame }} />;

  switch (page) {
    case "Game":
      BodyPage = <Game {...{ game, setVideo }} />;
      break;
    case "Video":
      BodyPage = <Video {...{ game, video }} />;
      break;
    case "Home":
    default:
      break;
  }

  return (
    <div style={{ marginTop: "7em" }}>
      {error ? <p>{JSON.stringify(error)} </p> : null}
      <Dimmer active={loading}>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      {BodyPage}
      <br />
      <br />
      <br />
    </div>
  );
};
export default Body;
