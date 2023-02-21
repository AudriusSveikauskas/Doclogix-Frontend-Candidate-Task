import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const ImagePreview = () => {
  const selectedFile = useSelector<RootState, number>(
    (state) => state.file.selectedFile,
  );

  const uploadedFilesProps = useSelector<RootState, IDocDetails[]>(
    (state) => state.file.uploadedFilesProps,
  );

  return (
    <Box>
      {selectedFile !== -1 &&
      uploadedFilesProps[selectedFile].type !== 'pdf' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={uploadedFilesProps[selectedFile].fileURL}
            alt={uploadedFilesProps[selectedFile].name}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default ImagePreview;
