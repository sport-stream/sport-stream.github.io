import { Route, Routes } from "react-router-dom";
import { Video } from "../routes/Video";
import { Game } from "../routes/Game";
import { Home } from "../routes/Home";

import { useFetch } from "../hooks/useFetch";
import { Dimmer, Loader } from "semantic-ui-react";
import { GameStory } from "../routes/GameStory";

const SHEET_ID = "15dkqaVpI8xbAOP7pQfQlHRfqV-l_jQVPt-ni8nMw62Y";
const PUBLIC_API_KEY = "AIzaSyCqYJKdcZo3j6wI6HLmJrUnCP92L-iuE7I";

const getTodaySheet = (sport = "soccer") => {
  const todayDate = new Date();
  todayDate.setMinutes(todayDate.getMinutes() - 15);

  const newFormat = `${todayDate.getFullYear()}-${todayDate.getDate()}-${
    todayDate.getMonth() + 1
  }`;
  return `${newFormat}-${sport === "soccer" ? "Games" : sport}`;
};

const Body = () => {
  const sheetUrlSoccer = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${getTodaySheet()}!1:1?key=${PUBLIC_API_KEY}`;
  const sheetUrlBasketball = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${getTodaySheet(
    "basketball"
  )}!1:1?key=${PUBLIC_API_KEY}`;
  const {
    data: soccerData,
    error: soccerError,
    loading: soccerLoading,
  } = useFetch(sheetUrlSoccer);

  const {
    data: basketballData,
    error: basketballError,
    loading: basketballLoading,
  } = useFetch(sheetUrlBasketball);

  return (
    <div
      style={{
        marginTop: "2%",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "92vh",
      }}
    >
      {soccerError || basketballError ? (
        <p>{JSON.stringify(soccerError || basketballError)} </p>
      ) : null}
      <Dimmer active={soccerLoading || basketballLoading}>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      <Routes>
        <Route
          index
          element={<Home {...{ data: soccerData, sport: "soccer" }} />}
        />
        <Route
          path="/Soccer"
          element={<Home {...{ data: soccerData, sport: "soccer" }} />}
        />
        <Route
          path="/Basketball"
          element={<Home {...{ data: basketballData, sport: "basketball" }} />}
        />
        <Route path="/Game" element={<Game />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/GameStory" element={<GameStory />} />
      </Routes>
      <br />
      <br />
      <br />
    </div>
  );
};
export default Body;
