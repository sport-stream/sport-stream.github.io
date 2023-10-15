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
  const todayDate = new Date().toLocaleDateString("en-US");
  // change todayTate to format YYYY-MM-DD
  const newFormat = todayDate.split("/").reverse().join("-");
  return `${newFormat}-Games`;
};
const getYesterDaySheet = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterdayDate = date.toLocaleDateString("en-US");
  const newFormat = yesterdayDate.split("/").reverse().join("-");
  return `${newFormat}-Games`;
};

const Body = (props: any) => {
  const [sheet, setSheet] = React.useState<string>(getTodaySheet());
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet}!1:1?key=${PUBLIC_API_KEY}`;
  const { data, error, loading } = useFetch(sheetUrl);
  if ((error || !data?.length) && sheet === getTodaySheet()) {
    setSheet(getYesterDaySheet());
  }
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
