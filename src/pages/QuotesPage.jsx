import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";

const QuotesPage = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [isQuoteGenerated, setIsQuoteGenerated] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      console.log('Authorization code:', code);
      localStorage.setItem('authCode', code);
      localStorage.setItem('authCode', JSON.stringify(code));

      // Proceed to exchange the code for tokens or your next action
    }
  }, [location]);

  const isAuthenticated = localStorage.getItem('authCode');

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000); // Simple random ID generator
  };

  const fetchQuote = async () => {
    try {
      const response = await axios.get("http:/52.91.190.158:5050/random-quote");
      const fetchedQuote = {
        content: response.data.content,
        author: response.data.author,
      };
      setQuote(fetchedQuote);
      setIsQuoteGenerated(true);
      // Automatically save the fetched quote as liked initially
      saveNewQuote(true, fetchedQuote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const saveNewQuote = async () => {
        try {
          await axios.post("http://localhost:5005/quotes", {
            id: generateRandomId().toString(),
            author: quote.author,
            text: quote.content,
          });
          alert("Quote saved successfully!");
          fetchSavedQuotes(); // Refresh the saved quotes list
        } catch (error) {
          console.error("Error saving quote:", error);
        }
      };

  const saveQuote = async (isLiked, quoteToSave) => {
    try {
      await axios.post("http://localhost:5006/quotes", {
        id: generateRandomId().toString(),
        author: quoteToSave.author,
        text: quoteToSave.content,
        isLiked: isLiked ? 1 : 0, // 1 for liked, 0 for disliked
      });
      console.log(`Quote ${isLiked ? "liked" : "disliked"} and saved successfully!`);
      fetchSavedQuotes(); // Refresh the saved quotes list
    } catch (error) {
      console.error("Error saving quote:", error);
    }
  };

  const fetchSavedQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5006/quotes");
      setSavedQuotes(response.data);
    } catch (error) {
      console.error("Error fetching saved quotes:", error);
    }
  };

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  // Additional styles and UI elements remain the same
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      color: '#333',
    },
    button: {
      backgroundColor: '#007BFF',
      color: '#ffffff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    likeButton: {
      backgroundColor: "#28a745",
    },
    dislikeButton: {
      backgroundColor: "#dc3545",
    },
    quoteBlock: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '5px',
      margin: '20px 0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      borderBottom: '2px solid #ddd',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#f2f2f2',
    },
    td: {
      borderBottom: '1px solid #eee',
      padding: '10px',
      color: '#666',
    },
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Navbar />
      <h1>Quote Generator</h1>
      {isAuthenticated ? (
        <>
          <button onClick={fetchQuote} style={{ margin: "20px", padding: "10px" }}>
            Generate Quote
          </button>
          {isQuoteGenerated && (
            <div>
              <p style={{ fontStyle: "italic" }}>"{quote.content}"</p>
              <p>- {quote.author}</p>
              <button
                onClick={() => saveQuote(true, quote)}
                style={{ ...styles.button, ...styles.likeButton }}
              >
                👍 Like
              </button>
              <button
                onClick={() => saveQuote(false, quote)}
                style={{ ...styles.button, ...styles.dislikeButton }}
              >
                👎 Dislike
              </button>
            </div>
          )}
          {/* Saved Quotes section remains unchanged */}
          <h2 style={{ ...styles.header, marginTop: '40px' }}>Saved Quotes</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Quote</th>
                  <th style={styles.th}>Author</th>
                  <th style={styles.th}>Liked</th>
                </tr>
              </thead>
              <tbody>
                {savedQuotes.map((quote, index) => (
                  <tr key={index}>
                    <td style={styles.td}>"{quote.text}"</td>
                    <td style={styles.td}>{quote.author}</td>
                    <td style={styles.td}>{quote.isLiked ? '👍' : '👎'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (<>
        <p>Please login to view quotes</p>
        <button onClick={handleGoHome} style={{ margin: "20px", padding: "10px" }}>
          Go Home
        </button>
        </>
      )}
    </div>
  );
};

export default QuotesPage;
