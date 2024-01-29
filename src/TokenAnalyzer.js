import React, { useState } from 'react';
import axios from 'axios';

import './TokenAnalyzer.css';

const TokenAnalyzer = () => {
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState([]);

    const analyzeToken = async () => {
        try {
            const keywordArray = keywords.split(',').map(keyword => keyword.trim());

            const response = await axios.post('http://localhost:5000/api/analyze_token', { keywords: keywordArray });

            console.log("Keywords: ", keywords);

            // Check if the "results" property exists in the response
            if (response.data.results && Array.isArray(response.data.results)) {
                setResults(response.data.results);
                
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Error analyzing token:', error);
        }

        console.log(results)
    };

    return (<>
        <div className="token-analyzer-container">
            <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords (separated by commas)"
                className="keyword-input"
            />

            <button onClick={analyzeToken} className="analyze-button">
                Analyze News
            </button>
        </div>

        <div className="results-container">
            {results.map((result, index) => (
                <div key={index} className="result-item">
                    <h2>
                        <a href={result.link} target="_blank" rel="noopener noreferrer">
                            {result.title}
                        </a>
                    </h2>
                    <p><strong>Source:</strong> {result.source}</p>
                    <p><strong>Date:</strong> {result.date}</p>
                    <p><strong>Summary:</strong> {result.summary}</p>
                    <p>
                        <strong>Sentiment:</strong>
                        <span
                            style={{
                                color:
                                    result.sentiment === 'Positive' ? 'green' : 
                                    result.sentiment === 'Negative' ? 'red' : 'black',
                            }}
                        >
                            <strong>{result.sentiment}</strong>
                        </span>
                    </p>
                </div>
            ))}
        </div>
    </>
    );
};

export default TokenAnalyzer;
