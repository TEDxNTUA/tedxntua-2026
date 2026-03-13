import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import EventNavProvider from "./components/EventNavProvider";
import Nav from "./components/Nav";
import PageTransition from "./components/PageTransition";
import HomePage from "./pages/HomePage";
import SponsorsPage from "./pages/SponsorsPage";
import TeamPage from "./team/TeamPage";
import TeamDetailPage from "./team/TeamDetailPage";
import EventLayout from "./event/EventLayout";
import ProgramPage from "./event/ProgramPage";
import MorePage from "./event/MorePage";

function Shell() {
  const location = useLocation();

  return (
    <div className="site-shell bg-blue-100 text-gray-900">
      <Nav />
      <main className="site-main">
        <PageTransition pathname={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:slug" element={<TeamDetailPage />} />

            <Route path="/event" element={<EventLayout />}>
              <Route index element={<Navigate to="/event/program" replace />} />
              <Route path="program" element={<ProgramPage />} />
              <Route path="more" element={<MorePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </main>
      <footer className="site-footer bg-black text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base sm:text-lg">© 2026 TEDxNTUA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <EventNavProvider>
        <Shell />
      </EventNavProvider>
    </BrowserRouter>
  );
}
