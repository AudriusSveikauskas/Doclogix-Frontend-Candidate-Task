import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import PDFPreview from './preview/PDFPreview';
import ImagePreview from './preview/ImagePreview';
import FilePreviewTitle from '../basics/FilePreviewTitle';

const FilesPreview = () => {
  const [open, setOpen] = useState(false);
  const [scroll] = useState<DialogProps['scroll']>('paper');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box>
      <Box>
        <FilePreviewTitle open={open} handleClickOpen={handleClickOpen} />
      </Box>

      <Box
        sx={{
          marginX: 4,
          marginBottom: 3,
          padding: 2,
          backgroundColor: '#e5e8eb',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <PDFPreview />
        <ImagePreview />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <FilePreviewTitle open={open} handleClickOpen={handleClickOpen} />
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <PDFPreview />
            <ImagePreview />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilesPreview;
