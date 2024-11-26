import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function CreatePostPopUp({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogContent>
                {/* Add your form or content here */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary">
                    Submit
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
