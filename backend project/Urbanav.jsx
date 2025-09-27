import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Searchdropdown from "./Searchdropdown";
import Urbloc from "./Urbloc";
import './Urbanav.css';

function Urbanav() {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();

  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => {
    // Delay hiding to allow click on dropdown items
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <nav className="navbar d-flex align-items-center justify-content-between px-3 py-2">
      {/* Left: Logo + Links */}
      <div className="d-flex align-items-center gap-3">
        <Link to="/">
          <img src="http://localhost:5000/assets/Uc.png" alt="Logo" className="logo-img" style={{ height: "40px" }}/>
        </Link>
        <Link to="/native" className="nav-link">Native</Link>
      </div>

      {/* Right: Search bar + Urbloc */}
      <div className="d-flex align-items-center gap-3 position-relative" style={{ flex: 1, marginLeft: "20px" }}>
        <input
          type="text"
          placeholder="Search services..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          className="form-control"
          style={{ flex: 1, maxWidth: "400px", zIndex: 10 }}
        />
        {showDropdown && (
          <Searchdropdown 
            searchValue={searchValue} 
            onSelect={(val) => setSearchValue(val)} 
          />
        )}
        <Urbloc />
      </div>
    </nav>
  );
}

export default Urbanav;
