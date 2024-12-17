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

function CreatePostPopUp({ open, onClose }) {

    const handleSubmitTag = () => {

    }


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ padding: 0, borderBottom: "none" }}>
                <Box sx={{ position: "relative", textAlign: "center", paddingTop: "5px" }}>
                    <Box sx={{ fontSize: "25px", fontWeight: "bold" }}>タグ作成</Box>
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

            <DialogContent dividers sx={{ overflowY: "auto" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="タグ名"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="タグの説明"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>
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
                    onClick={() => handleSubmitTag()}
                    color="primary"
                    variant="contained"
                    sx={{
                        height: "35px",
                        borderRadius: "20px",
                        padding: "8px 40px",
                        textTransform: "none",
                    }}
                >
                    作成
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
