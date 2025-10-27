import { useState } from 'react';
import axios from 'axios';
import NullsChart from './NullChart';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
      setSummary(res.data);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload & Analyze
      </button>

     {summary && <NullsChart nulls={summary.nulls} />}

    </div>
  );
}

export default UploadForm;