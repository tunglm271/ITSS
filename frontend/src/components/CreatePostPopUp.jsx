import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { createPost, getPosts } from "../services/api";
import { globalContext } from "../App";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

function CreatePostPopUp({ open, onClose }) {
    const [slideName, setSlideName] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const tags = [];
    const { setPosts } = useContext(globalContext);

    const handleSubmitPost = async () => {
        if (!title || !description) {
            alert("タイトルと内容を入力してください。");
            return;
        }

        setIsLoading(true);
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", description);
        postData.append("tags", JSON.stringify(tags));
        if (file) {
            postData.append("file", file);
        }

        try {
            const response = await createPost(postData);
            console.log("Post created successfully:", response);

            const data = await getPosts();
            setPosts(data);
            onClose();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("投稿の作成中にエラーが発生しました。");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        setSlideName(event.target.files[0].name);
        setFile(event.target.files[0]);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ minHeight: "500px" }}>
            <DialogTitle sx={{ padding: 0, borderBottom: "none" }}>
                <Box sx={{ position: "relative", textAlign: "center", paddingTop: "5px" }}>
                    <Box sx={{ fontSize: "25px", fontWeight: "bold" }}>ポスト作成</Box>
                    <Button
                        onClick={onClose}
                        color="error"
                        sx={{
                            color: "black",
                            position: "absolute",
                            top: "50%",
                            right: 0,
                            transform: "translateY(-50%)",
                            fontSize: "25px",
                            fontWeight: "bold",
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </Box>
                <Box
                    sx={{
                        marginTop: "8px",
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                    }}
                />
            </DialogTitle>

            <DialogContent dividers sx={{ minHeight: "400px", overflowY: "auto" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <Avatar
                        src="https://via.placeholder.com/56"
                        alt=""
                        sx={{ width: 56, height: 56, mr: 2, border: 1 }}
                    />
                    <TextField
                        placeholder="タイトルを入力してください..."
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                                "& fieldset": {
                                    border: "none",
                                },
                            },
                        }}
                    />
                </Box>

                <TextField
                    placeholder="何を考えている?..."
                    multiline
                    rows={10}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                        height: "120px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 0,
                            "& fieldset": {
                                border: "none",
                            },
                        },
                    }}
                />

                <Box
                    sx={{
                        marginTop: "8px",
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                        marginBottom: "6px",
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        padding: 1,
                        backgroundColor: "#FFA500",
                        borderRadius: "8px",
                    }}
                >
                    {["PHP", "MongoDB", "データベース", "NodeJS", "Javascript"].map((tag, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            size="small"
                            sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                                backgroundColor: "#E0E0E0",
                                color: "#333",
                                "&:hover": {
                                    backgroundColor: "#BDBDBD",
                                },
                            }}
                        >
                            {tag}
                        </Button>
                    ))}

                    <Button
                        sx={{
                            gap: "46px",
                        }}
                    >
                        <AddIcon sx={{ fontSize: "20px", color: "#333" }} />
                        <LocalOfferIcon sx={{ fontSize: "20px", color: "#333" }} />
                    </Button>
                </Box>

                <Box
                    sx={{
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                        marginBottom: "8px",
                        marginTop: "6px",
                    }}
                />

                <Button
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        border: "2px solid #FF9800",
                        borderRadius: "15px",
                        padding: "6px 12px",
                        backgroundColor: "white",
                        justifyContent: "space-between",
                    }}
                    variant="contained"
                    tabIndex={-1}
                    role={undefined}
                    component="label"
                >
                    <span
                        style={{
                            fontSize: "16px",
                            textTransform: "none",
                            color: "#333",
                            cursor: "pointer",
                        }}
                    >
                        追加
                    </span>

                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => handleFileChange(event)}
                        multiple
                    />
                    <FileCopyIcon sx={{ fontSize: "30px", color: "#333" }} />
                </Button>
                {slideName && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <p>{slideName}</p>
                        <Button
                            onClick={() => setSlideName(null)}
                            color="error"
                            variant="contained"
                            sx={{
                                height: "35px",
                                borderRadius: "20px",
                                padding: "8px 20px",
                                textTransform: "none",
                                marginLeft: "10px",
                            }}
                        >
                            削除
                        </Button>
                    </Box>
                )}
            </DialogContent>

            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    borderBottom: "none",
                }}
            >
                <Button
                    onClick={() => handleSubmitPost()}
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                        height: "35px",
                        borderRadius: "20px",
                        padding: "8px 40px",
                        textTransform: "none",
                    }}
                >
                    {isLoading ? "作成中..." : "作成"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

CreatePostPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CreatePostPopUp;
