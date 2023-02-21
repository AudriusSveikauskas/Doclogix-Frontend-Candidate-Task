import React, { ChangeEvent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FilePropsCard from '../basics/cards/FilePropsCard';
import { fileActions } from '../../store/file/file';

const ListOfUploads = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(fileActions.setSelectedFile(-1));
    dispatch(fileActions.setUploadedFilesProps([]));
  };

  const handleClickClearAll = () => {
    setOpen(true);
  };

  const handleClickCancel = () => {
    setOpen(false);
  };

  const handleClickConfirm = () => {
    clearAll();
    handleClickCancel();
  };

  const uploadedFilesProps = useSelector<RootState, IDocDetails[]>(
    (state) => state.file.uploadedFilesProps,
  );

  return (
    <Box display={uploadedFilesProps.length > 0 ? 'block' : 'none'}>
      <Paper
        elevation={2}
        sx={{
          padding: '20px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography sx={{ mb: 2 }}>List of uploads</Typography>
        {uploadedFilesProps.map((file, index) => (
          <FilePropsCard key={`file-card-prop-${index + 1}`} fileProps={file} />
        ))}

        <Box
          sx={{
            paddingY: 1,
            alignSelf: 'flex-end',
            color: 'text.primary',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={handleClickClearAll}
        >
          Clear all
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClickCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete all files?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You`&apos;`ll have to start uploading process from the very
            beginning.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClickCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClickConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListOfUploads;
