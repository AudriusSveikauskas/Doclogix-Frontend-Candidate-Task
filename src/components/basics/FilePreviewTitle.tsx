import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { RootState } from '../../store/store';
import { fileActions } from '../../store/file/file';

const iconStyle = {
  width: '30px',
  height: '30px',
  color: 'text.secondary',
  cursor: 'pointer',
};

type FilePreviewTitleProps = {
  open: boolean;
  handleClickOpen: () => void;
};

const FilePreviewTitle: React.FC<FilePreviewTitleProps> = ({
  open,
  handleClickOpen,
}) => {
  const [currFileName, setCurrFileName] = useState('');
  const [currFileURL, setCurrFileURL] = useState('/');

  const dispatch = useDispatch();

  const selectedFile = useSelector<RootState, number>(
    (state) => state.file.selectedFile,
  );

  const uploadedFilesProps = useSelector<RootState, IDocDetails[]>(
    (state) => state.file.uploadedFilesProps,
  );

  const setSelectedFile = (index: number) => {
    dispatch(fileActions.setSelectedFile(index));
  };

  const setPrevFile = () => {
    setSelectedFile(selectedFile - 1);
  };

  const setNextFile = () => {
    setSelectedFile(selectedFile + 1);
  };

  useEffect(() => {
    if (selectedFile === -1) {
      setCurrFileName('');
      setCurrFileURL('/');
    } else {
      setCurrFileName(uploadedFilesProps[selectedFile].name);
      setCurrFileURL(uploadedFilesProps[selectedFile].fileURL);
    }
  }, [uploadedFilesProps, selectedFile]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        display={selectedFile === -1 ? 'block' : 'none'}
        sx={{ height: '94px' }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: 4,
          marginY: 3,
        }}
      >
        <Box />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            alignItems: 'center',
            width: 'calc(100% - 68px)',
          }}
        >
          <Box
            display={selectedFile >= 1 ? 'block' : 'none'}
            sx={{ width: '24px' }}
          >
            <ChevronLeftIcon
              onClick={setPrevFile}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
            />
          </Box>

          <Box maxWidth="calc(100% - 64px)">
            <Typography
              variant="h5"
              component="h5"
              color="text.secondary"
              noWrap
            >
              {currFileName}
            </Typography>
          </Box>

          <Box
            display={
              selectedFile !== -1
              && selectedFile < uploadedFilesProps.length - 1
                ? 'block'
                : 'none'
            }
            sx={{ width: '24px' }}
          >
            <ChevronRightIcon
              onClick={setNextFile}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <PreviewIcon
            display={!open ? 'block' : 'none'}
            sx={iconStyle}
            onClick={handleClickOpen}
          />

          <Box display={uploadedFilesProps.length > 0 ? 'block' : 'none'}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              to={uploadedFilesProps.length > 0 ? currFileURL : ''}
              target="_blank"
              download
            >
              <DownloadIcon sx={iconStyle} />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilePreviewTitle;
