import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import UploadForm from "./components/UploadForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadForm />} />
    </Routes>
  );
}

export default App;