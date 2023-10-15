import React from "react";
import { Routes, Route } from "react-router-dom";
import { Video } from "../routes/Video";
import { Game } from "../routes/Game";
import { Home } from "../routes/Home";

import { useFetch } from "../hooks/useFetch";
import { Dimmer, Loader } from "semantic-ui-react";

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
  return (
    <div style={{ marginTop: "7em" }}>
      {error ? <p>{JSON.stringify(error)} </p> : null}
      <Dimmer active={loading}>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      <Routes>
        <Route path="/" element={<Home {...{ data, setGame }} />} />
        <Route path="/Games" element={<Home {...{ data, setGame }} />} />
        <Route path="/Games/Game" element={<Game {...{ game, setVideo }} />} />
        <Route path="/Games/Video" element={<Video {...{ game, video }} />} />
      </Routes>
      <br />
      <br />
      <br />
    </div>
  );
};
export default Body;
