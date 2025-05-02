import { useState, useRef } from "react";
import { Upload, File, Check, XCircle } from "lucide-react";

export default function GraftSizePrediction() {
  const [file, setFile] = useState(null);
  const [params, setParams] = useState({
    age: "",
    height: "",
    gender: "",
    weight: "",
    bmi: "",
    activityLevel: "",
    previousSurgery: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomStats = () => ({
    abnormality: Math.floor(Math.random() * 101), // 0–100
    normality: Math.floor(Math.random() * 101), // 0–100
    graftSize: (Math.random() * 2 + 7).toFixed(2), // 7–9 cm
  });

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const stats = generateRandomStats();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setResults({ file, params, stats });
    }, 1000);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Graft Size Prediction
      </h1>

      <div className="space-y-6">
        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          {file ? (
            <div className="flex items-center space-x-4 w-full">
              <div className="bg-blue-100 p-3 rounded-full">
                <File className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Upload your file
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, PDF, or any other file up to 10MB
              </p>
              <button
                type="button"
                onClick={triggerFileInput}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Select File
              </button>
            </div>
          )}
        </div>

        {/* Parameters */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium mb-4 text-gray-800">Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Age", name: "age" },
              { label: "Height (cm)", name: "height" },
              { label: "Gender", name: "gender" },
              { label: "Weight (kg)", name: "weight" },
              { label: "BMI", name: "bmi" },
              { label: "Activity Level", name: "activityLevel" },
              { label: "Previous Surgery", name: "previousSurgery" },
            ].map(({ label, name }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={params[name]}
                  onChange={handleParamChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !file}
            className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                !file
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>

        {/* Status */}
        {submitStatus === "success" && (
          <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-md flex items-center text-green-700">
            <Check className="h-5 w-5 mr-2" />
            <span>File and parameters submitted successfully!</span>
          </div>
        )}

        {/* Result */}
        {results && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Submitted Data:
            </h3>
            <p className="mb-1">
              <strong>File:</strong> {results.file.name} (
              {(results.file.size / 1024).toFixed(2)} KB)
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
              {Object.entries(results.params).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            {/* Prediction */}
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-800">
                Prediction Output
              </h4>
              <ul className="list-disc list-inside text-sm text-blue-700">
                <li>
                  <strong>Abnormality:</strong> {results.stats.abnormality}%
                </li>
                <li>
                  <strong>Normality:</strong> {results.stats.normality}%
                </li>
                <li>
                  <strong>Graft Size:</strong> {results.stats.graftSize} cm
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
