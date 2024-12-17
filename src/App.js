import SubtitleTimeline from "./components/SubtitleTimeline/SubtitleTimeline";
import subtitleData from "./output_from_api.json";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <SubtitleTimeline data={subtitleData} />
    </>
  );
}

export default App;
