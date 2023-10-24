import { Route, Routes } from "react-router-dom";
import { Video } from "../routes/Video";
import { Game } from "../routes/Game";
import { Home } from "../routes/Home";

import { useFetch } from "../hooks/useFetch";
import { Dimmer, Loader } from "semantic-ui-react";

const SHEET_ID = "15dkqaVpI8xbAOP7pQfQlHRfqV-l_jQVPt-ni8nMw62Y";
const PUBLIC_API_KEY = "AIzaSyCqYJKdcZo3j6wI6HLmJrUnCP92L-iuE7I";

const getTodaySheet = () => {
  const todayDate = new Date();
  todayDate.setMinutes(todayDate.getMinutes() - 15);

  const newFormat = `${todayDate.getFullYear()}-${todayDate.getDate()}-${
    todayDate.getMonth() + 1
  }`;
  return `${newFormat}-Games`;
};

const Body = () => {
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${getTodaySheet()}!1:1?key=${PUBLIC_API_KEY}`;
  const { data, error, loading } = useFetch(sheetUrl);

  return (
    <div
      style={{
        marginTop: "2%",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "92vh",
      }}
    >
      {error ? <p>{JSON.stringify(error)} </p> : null}
      <Dimmer active={loading}>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      <Routes>
        <Route index element={<Home {...{ data }} />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Video" element={<Video />} />
      </Routes>
      <br />
      <br />
      <br />
    </div>
  );
};
export default Body;
