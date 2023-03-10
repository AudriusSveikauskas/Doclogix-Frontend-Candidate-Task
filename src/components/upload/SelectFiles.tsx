import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, VariantType } from 'notistack';
import UploadImg from '../../assets/upload-files.jpg';
import { fileActions } from '../../store/file/file';
import setFileType from '../../utils/setFileType';
import setFileSize from '../../utils/setFileSize';
import setFileDate from '../../utils/setFileDate';
import { RootState } from '../../store/store';

const SelectFiles = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [acceptType, setAcceptType] = useState('application/pdf');

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const MAX_COUNT = 5;

  const uploadedFilesProps = useSelector<RootState, IDocDetails[]>(
    (state) => state.file.uploadedFilesProps,
  );

  const showFilesType = useSelector<RootState, string>(
    (state) => state.file.showFilesType,
  );

  const setUploadedFilesProps = (filesArr: IDocDetails[]) => {
    dispatch(fileActions.setUploadedFilesProps(filesArr));
  };

  const handleAlert = (msgVariant: VariantType, msgDesc: string) => {
    enqueueSnackbar(msgDesc, {
      variant: msgVariant,
      preventDuplicate: true,
      autoHideDuration: 4000,
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    });
  };

  const handleUploadFiles = (files: File[]) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    // eslint-disable-next-line array-callback-return,consistent-return
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (uploadedFilesProps.length + files.length <= MAX_COUNT) {
      handleAlert('success', 'File(s) uploaded successfully.');
    } else {
      handleAlert('error', `You can only add a maximum of ${MAX_COUNT} files`);
    }
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleClick = () => {
    if (fileLimit) {
      handleAlert('error', `You can only add a maximum of ${MAX_COUNT} files`);
    }
  };

  useEffect(() => {
    const tempArr: IDocDetails[] = [];

    // eslint-disable-next-line array-callback-return
    uploadedFiles.map((file, i) => {
      tempArr.push({
        index: i,
        name: file.name,
        type: setFileType(file.type),
        size: setFileSize(file.size),
        lastModified: setFileDate(file.lastModified),
        fileURL: URL.createObjectURL(file),
      });
    });

    setUploadedFilesProps(tempArr);
  }, [uploadedFiles]);

  useEffect(() => {
    if (uploadedFilesProps.length === 0) {
      setUploadedFiles([]);
    }

    if (uploadedFilesProps.length < MAX_COUNT) {
      setFileLimit(false);
    }
  }, [uploadedFilesProps]);

  useEffect(() => {
    if (showFilesType === 'pdf') {
      setAcceptType('application/pdf');
    } else if (showFilesType === '') {
      setAcceptType('application/pdf, image/*');
    } else {
      setAcceptType(`image/${showFilesType}`);
    }
  }, [showFilesType]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h6">
        {`Select ${showFilesType !== '' ? `*.${showFilesType}` : ''} files`}
      </Typography>
      <Typography>
        {'Drop files here or click '}
        <span
          style={{
            color: '#920e8e',
            textDecoration: 'underline',
          }}
        >
          browse
        </span>
      </Typography>
      <Box sx={{ marginTop: '40px', marginBottom: '60px' }}>
        <img src={UploadImg} alt="Select files" />
      </Box>

      <Box display={!fileLimit ? 'block' : 'none'}>
        <input
          id="fileUpload"
          type="file"
          multiple
          accept={acceptType}
          onChange={handleFileEvent}
          disabled={fileLimit}
          title=" "
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
        />
      </Box>

    </Box>
  );
};

export default SelectFiles;
