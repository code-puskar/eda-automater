import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NullsChart from "./NullChart";

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
  const [targetColumn, setTargetColumn] = useState("");
  const [removeOutliers, setRemoveOutliers] = useState(false);
  const [outlierMethod, setOutlierMethod] = useState("IQR");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("drop_nulls", dropNulls);
    formData.append("fill_mean", fillMean);
    formData.append("encode", encode);
    formData.append("scale", scale);
    formData.append("return_csv", returnCSV);
    formData.append("train_test_split_enabled", trainSplit);
    formData.append("test_size", testSize);
    formData.append("target_column", targetColumn);
    formData.append("remove_outliers", removeOutliers);
    formData.append("outlier_method", outlierMethod);

    if (selectedCols.length > 0) {
      formData.append("include_cols", selectedCols.join(","));
    }

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        responseType: returnCSV ? "blob" : "json",
      });

      if (returnCSV) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "cleaned.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setSummary(res.data);
        setSelectedCols([]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // 🎨 Reusable Card component
  const Card = ({ title, subtitle, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        background: "linear-gradient(135deg, #22c55e33, #0ea5e933)",
        boxShadow: "0px 0px 25px rgba(34,197,94,0.3)",
      }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-lg 
                 hover:border-green-400 transition-all ease-in-out duration-300
                 hover:shadow-green-500/20"
    >
      <h2 className="text-xl font-semibold mb-1 text-green-400">{title}</h2>
      <p className="text-gray-400 mb-4">{subtitle}</p>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold mb-10 text-transparent bg-clip-text 
                   bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400"
      >
        ⚙️ OPERATION ZONE
      </motion.h1>

      {/* 🧱 Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Upload Card */}
        <Card title="📁 Upload Dataset" subtitle="Start by uploading your CSV file">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-300 file:bg-gray-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-4 bg-gray-800 border border-green-500 text-green-300 px-4 py-2 rounded-lg shadow-md"
            >
              ✅ File Selected: <span className="font-semibold">{file.name}</span>
            </motion.div>
          )}
        </Card>

        {/* Data Cleaning */}
        <Card title="🧹 Data Cleaning" subtitle="Handle missing values with precision">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={dropNulls} onChange={() => setDropNulls(!dropNulls)} />
              <span>Drop Nulls</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={fillMean} onChange={() => setFillMean(!fillMean)} />
              <span>Fill Nulls with Mean</span>
            </label>
          </div>
        </Card>

        {/* Encode & Scale */}
        <Card title="🔠 Encode & Scale" subtitle="Transform your data for modeling">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={encode} onChange={() => setEncode(!encode)} />
              <span>Encode Categorical</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={scale} onChange={() => setScale(!scale)} />
              <span>Scale Numeric</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={returnCSV} onChange={() => setReturnCSV(!returnCSV)} />
              <span>Return Cleaned CSV</span>
            </label>
          </div>
        </Card>

        {/* Train/Test Split */}
        <Card title="📊 Train/Test Split" subtitle="Prepare your dataset for training">
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={trainSplit} onChange={() => setTrainSplit(!trainSplit)} />
              <span>Enable Train/Test Split</span>
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <span>Test Size:</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="0.5"
                  value={testSize}
                  onChange={(e) => setTestSize(parseFloat(e.target.value))}
                  className="bg-gray-800 text-white px-2 py-1 rounded w-20"
                />
              </label>
              <label className="flex items-center space-x-2">
                <span>Target Column:</span>
                <select
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                  className="bg-gray-800 text-white px-2 py-1 rounded"
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
          </div>
        </Card>

        {/* Outlier Detection */}
        <Card title="🚨 Outlier Detection" subtitle="Filter anomalies using IQR or Z-score">
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={removeOutliers} onChange={() => setRemoveOutliers(!removeOutliers)} />
              <span>Remove Outliers</span>
            </label>
            <label className="flex items-center space-x-2">
              <span>Method:</span>
              <select
                value={outlierMethod}
                onChange={(e) => setOutlierMethod(e.target.value)}
                className="bg-gray-800 text-white px-2 py-1 rounded"
              >
                <option value="IQR">IQR</option>
                <option value="Z-score">Z-score</option>
              </select>
            </label>
          </div>
        </Card>

        {/* Upload & Analyze */}
        <Card title="📤 Final Step" subtitle="Run EDA Automater and get results">
          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 
                     transition-all duration-300 text-white font-semibold py-3 rounded-lg text-lg tracking-wide"
          >
            Upload & Analyze
          </button>
        </Card>
      </div>

      {/* Summary Section */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mt-16"
        >
          <div className="mt-10">
            <NullsChart nulls={summary.nulls} />
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Select Columns for Encoding/Scaling:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {summary.columns.map((col) => (
                <label key={col} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCols.includes(col)}
                    onChange={() => {
                      setSelectedCols((prev) =>
                        prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
                      );
                    }}
                  />
                  <span>{col}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UploadForm;
