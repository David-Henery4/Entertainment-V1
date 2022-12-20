import "./styles/index.scss";
import {  Route, Routes } from "react-router-dom";
import { Home, Bookmarked, Movies, TvSeries, Dashboard } from "./pages";

function App() {
  //
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv" element={<TvSeries />} />
        <Route path="bookmarked" element={<Bookmarked />} />
      </Route>
    </Routes>
  );
}

export default App;
