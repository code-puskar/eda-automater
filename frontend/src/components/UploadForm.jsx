import { useState } from 'react';
import axios from 'axios';
import NullsChart from './NullChart';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [dropNulls, setDropNulls] = useState(false);
  const [fillMean, setFillMean] = useState(false);
  const [encode, setEncode] = useState(false);
  const [scale, setScale] = useState(false);
  const [returnCSV, setReturnCSV] = useState(false);
  const [selectedCols, setSelectedCols] = useState([]);
  const [trainSplit, setTrainSplit] = useState(false);
  const [testSize, setTestSize] = useState(0.2);
  const [targetColumn, setTargetColumn] = useState('');
  const [removeOutliers, setRemoveOutliers] = useState(false);
  const [outlierMethod, setOutlierMethod] = useState("IQR");
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('drop_nulls', dropNulls);
    formData.append('fill_mean', fillMean);
    formData.append('encode', encode);
    formData.append('scale', scale);
    formData.append('return_csv', returnCSV);
    formData.append('train_test_split_enabled', trainSplit);
    formData.append('test_size', testSize);
    formData.append('target_column', targetColumn);
    formData.append('remove_outliers', removeOutliers);
    formData.append('outlier_method', outlierMethod);

    if (selectedCols.length > 0) {
      formData.append('include_cols', selectedCols.join(','));
    }

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        responseType: returnCSV ? 'blob' : 'json',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (returnCSV) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'cleaned.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setSummary(res.data);
        setSelectedCols([]);
      }
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

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="checkbox"
            checked={dropNulls}
            onChange={() => setDropNulls(!dropNulls)}
            className="mr-1"
          />
          Drop Nulls
        </label>
        <label>
          <input
            type="checkbox"
            checked={fillMean}
            onChange={() => setFillMean(!fillMean)}
            className="mr-1"
          />
          Fill Nulls with Mean
        </label>
      </div>

      <div className="mb-4">
        <label className="mr-4">
          <input type="checkbox" checked={encode} onChange={() => setEncode(!encode)} />
          Encode Categorical
        </label>
        <label className="mr-4">
          <input type="checkbox" checked={scale} onChange={() => setScale(!scale)} />
          Scale Numeric
        </label>
        <label className="mr-4">
          <input type="checkbox" checked={returnCSV} onChange={() => setReturnCSV(!returnCSV)} />
          Return Cleaned CSV
        </label>
      </div>

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="checkbox"
            checked={trainSplit}
            onChange={() => setTrainSplit(!trainSplit)}
          />
          Enable Train/Test Split
        </label>
        <label className="mr-4">
          Test Size:
          <input
            type="number"
            step="0.01"
            min="0.1"
            max="0.5"
            value={testSize}
            onChange={(e) => setTestSize(parseFloat(e.target.value))}
            className="ml-2"
          />
        </label>
        <label>
          Target Column:
          <select
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            className="ml-2"
          >
            <option value="">Select</option>
            {summary?.columns?.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </label>
      </div>
     <div className="mb-4">
  <label className="mr-4">
    <input
      type="checkbox"
      checked={removeOutliers}
      onChange={() => setRemoveOutliers(!removeOutliers)}
    />
    Remove Outliers
  </label>
  <label className="ml-4">
    Method:
    <select
      value={outlierMethod}
      onChange={(e) => setOutlierMethod(e.target.value)}
      className="ml-2"
    >
      <option value="IQR">IQR</option>
      <option value="Z-score">Z-score</option>
    </select>
  </label>
</div>
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload & Analyze
      </button>

      {summary && <NullsChart nulls={summary.nulls} />}

      {summary && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Columns for Encoding/Scaling:</h3>
          {summary.columns.map((col) => (
            <label key={col} className="block mb-1">
              <input
                type="checkbox"
                checked={selectedCols.includes(col)}
                onChange={() => {
                  setSelectedCols((prev) =>
                    prev.includes(col)
                      ? prev.filter((c) => c !== col)
                      : [...prev, col]
                  );
                }}
              />
              <span className="ml-2">{col}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadForm;