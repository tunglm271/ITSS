import { useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import PublicIcon from "@mui/icons-material/Public";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import { searchPosts } from "../services/api";
import Post from "./Post";

function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setNotFound(false);
        setOpenModal(false);

        try {
            const results = await searchPosts(searchQuery);

            if (results && results.length > 0) {
                setSearchResults(results);
                setOpenModal(true);
            } else {
                setNotFound(true);
                setSearchResults([]);
                setOpenModal(true);
            }
        } catch (error) {
            console.error("Error during search:", error);
            setNotFound(true);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="header">
            <div id="badge-div">
                <Badge badgeContent={20} color="error">
                    <NotificationsNoneIcon sx={{ fontSize: 30 }} />
                </Badge>
            </div>
            <div id="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for posts"
                />
                <button onClick={handleSearch}>
                    <SearchIcon />
                </button>
            </div>
            <button className="header-button" id="language-btn">
                <PublicIcon sx={{ fontSize: 25 }} />
            </button>
            <p>EN</p>
            <button className="header-button" onClick={() => handleLogOut()}>
                <LogoutIcon sx={{ fontSize: 25 }} />
            </button>

            {loading && <p>Loading...</p>}

            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Search Results</DialogTitle>
                <DialogContent>
                    {searchResults.length > 0
                        ? searchResults.map((post, index) => (
                              <Post key={index} post={post} />
                          ))
                        : notFound && (
                              <p
                                  style={{
                                      color: "red",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                      padding: "20px",
                                      backgroundColor: "#ffe6e6",
                                  }}
                              >
                                  No results found for &quot;{searchQuery}&quot;
                              </p>
                          )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Header;
