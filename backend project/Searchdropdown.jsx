import { useState, useEffect } from "react";

function Searchdropdown({ searchValue, onSelect }) {
  const [recent, setRecent] = useState(JSON.parse(localStorage.getItem("recentSearches")) || []);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/search")
      .then((res) => res.json())
      .then((data) => setTrending(data));
  }, []);

  const filtered = searchValue
    ? trending.filter((t) => t.toLowerCase().includes(searchValue.toLowerCase()))
    : trending;

  const handleClick = (item) => {
    const updated = [item, ...recent.filter((r) => r !== item)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    onSelect(item);
  };

  return (
    <div
      style={{
        position: "fixed",        // Important: outside navbar
        top: "70px",              // Adjust depending on navbar height
        left: "50%",
        transform: "translateX(-50%)",
        width: "400px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 10000,
        padding: "8px 0",
      }}
    >
      {recent.length > 0 && (
        <div style={{ padding: "0 10px" }}>
          <p style={{ fontWeight: "bold", margin: "4px 0" }}>Recent</p>
          {recent.map((item, i) => (
            <div
              key={i}
              onClick={() => handleClick(item)}
              style={{ padding: "6px 8px", cursor: "pointer", borderRadius: "4px" }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "0 10px", marginTop: "5px" }}>
        <p style={{ fontWeight: "bold", margin: "4px 0" }}>Trending</p>
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => handleClick(item)}
            style={{ padding: "6px 8px", cursor: "pointer", borderRadius: "4px" }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchdropdown;
