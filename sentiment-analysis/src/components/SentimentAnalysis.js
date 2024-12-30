import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  positive: '#22c55e',
  neutral: '#f59e0b',
  negative: '#ef4444'
};

const TIMEOUT_DURATION = 30000;

const SentimentAnalysis = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      const response = await fetch('https://ai-powered-sentiment-analysis-gemm.onrender.com/', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        credentials: 'omit',
        mode: 'cors',
      });

      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      
      if (!data || !data.detailed_results) {
        throw new Error('Invalid response format from server');
      }

      setResults(data);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(`Error analyzing file: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getSentimentEmoji = (score) => {
    if (score > 0.5) return '😄';
    if (score > 0.2) return '🙂';
    if (score > -0.2) return '😐';
    if (score > -0.5) return '🙁';
    return '😔';
  };

  const getSentimentDescription = (score) => {
    if (score > 0.5) return 'Very Positive';
    if (score > 0.2) return 'Positive';
    if (score > -0.2) return 'Neutral';
    if (score > -0.5) return 'Negative';
    return 'Very Negative';
  };

  const getSentimentColor = (score) => {
    if (score > 0.2) return COLORS.positive;
    if (score < -0.2) return COLORS.negative;
    return COLORS.neutral;
  };

  const prepareDistributionData = () => {
    if (!results?.sentiment_distribution) return [];
    return Object.entries(results.sentiment_distribution).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value),
      fill: name === 'positive' ? COLORS.positive : 
            name === 'negative' ? COLORS.negative : COLORS.neutral
    }));
  };

  const prepareDetailedData = () => {
    if (!results?.detailed_results) return [];
    return results.detailed_results.slice(0, 10).map((result, index) => ({
      id: index + 1,
      sentiment: Number(result.sentiment),
      fill: getSentimentColor(result.sentiment)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sentiment Analysis Dashboard</h1>
          
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 
                    file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 
                    hover:file:bg-blue-100 transition-all"
                />
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              
              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg
                  hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed 
                  transition-colors font-medium shadow-sm hover:shadow-md"
              >
                {loading ? 'Processing...' : 'Analyze'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {results && (
            <div className="mt-8 space-y-8">
              {/* Sentiment Score Card with Emoji */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Overall Sentiment</h3>
                <div className="text-6xl mb-4" role="img" aria-label="sentiment emoji">
                  {getSentimentEmoji(results.overall_sentiment)}
                </div>
                <p className="text-2xl font-bold" style={{ color: getSentimentColor(results.overall_sentiment) }}>
                  {getSentimentDescription(results.overall_sentiment)}
                </p>
                <p className="text-gray-600 mt-2">
                  Score: {results.overall_sentiment.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Top 10 Sentiment Scores */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-semibold mb-6">Top 10 Sentiment Scores</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={prepareDetailedData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="id" label={{ value: 'Entry ID', position: 'bottom', dy: 10 }} />
                      <YAxis label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft', dx: -10 }} />
                      <Tooltip />
                      <Bar dataKey="sentiment">
                        {prepareDetailedData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Distribution Pie Chart */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h4 className="text-lg font-semibold mb-6">Sentiment Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={prepareDistributionData()}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      >
                        {prepareDistributionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sentiment Scale Legend */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h4 className="text-lg font-semibold mb-4 text-center">Sentiment Scale Guide</h4>
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl mb-2">😔</div>
                    <div className="text-sm font-medium text-gray-600">Very Negative</div>
                    <div className="text-xs text-gray-500">(-1.0 to -0.5)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🙁</div>
                    <div className="text-sm font-medium text-gray-600">Negative</div>
                    <div className="text-xs text-gray-500">(-0.5 to -0.2)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">😐</div>
                    <div className="text-sm font-medium text-gray-600">Neutral</div>
                    <div className="text-xs text-gray-500">(-0.2 to 0.2)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🙂</div>
                    <div className="text-sm font-medium text-gray-600">Positive</div>
                    <div className="text-xs text-gray-500">(0.2 to 0.5)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">😄</div>
                    <div className="text-sm font-medium text-gray-600">Very Positive</div>
                    <div className="text-xs text-gray-500">(0.5 to 1.0)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;