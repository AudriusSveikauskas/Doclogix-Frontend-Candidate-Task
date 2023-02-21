import React from 'react';
import {
  Box,
  Paper,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { RootState } from '../../../store/store';
import { fileActions } from '../../../store/file/file';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

type FilePropsCardType = {
  fileProps: IDocDetails;
};
const FilePropsCard: React.FC<FilePropsCardType> = ({ fileProps }) => {
  const dispatch = useDispatch();
  const { index, name, type, size, lastModified } = fileProps;

  const showFilesType = useSelector<RootState, string>(
    (state) => state.file.showFilesType,
  );

  const selectedFile = useSelector<RootState, number>(
    (state) => state.file.selectedFile,
  );

  const setSelectedFile = () => {
    dispatch(fileActions.setSelectedFile(index));
  };

  return (
    <Box
      display={
        showFilesType === type || showFilesType === '' ? 'block' : 'none'
      }
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <LightTooltip
          title={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Box>{`Name: ${name}`}</Box>
              <Box>{`Type: ${type}`}</Box>
              <Box>{`Size: ${size}`}</Box>
              <Box>{`Modified: ${lastModified}`}</Box>
            </Box>
          }
        >
          <Paper
            onClick={setSelectedFile}
            elevation={2}
            sx={{
              padding: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: `${selectedFile === index ? '#d9abd8' : '#fff'}`,
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
            >
              <EditIcon />
              <DeleteIcon />
            </Box>
          </Paper>
        </LightTooltip>
      </Box>

      <Box>
        <Typography
          variant="caption"
          display="block"
          sx={{ width: '65px' }}
          color={selectedFile === index ? 'text.secondary' : '#b2b5b9'}
        >
          {selectedFile === index ? 'Main' : 'Attachment'}
        </Typography>
      </Box>
    </Box>
  );
};

export default FilePropsCard;
