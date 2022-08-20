import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teams from "./components/Teams/Teams";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index={true} element={<Home />} />*/}

        {/* <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index={true} element={<LeagueStandings />} /> */}
      </Route>
      <Route path="teams" element={<Teams />}></Route>
    </Routes>
  </BrowserRouter>
);
