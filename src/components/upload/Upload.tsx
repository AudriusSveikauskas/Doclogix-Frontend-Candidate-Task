import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import SelectFiles from './SelectFiles';
import TypeOfDocument from './TypeOfDocument';
import ListOfUploads from './ListOfUploads';
import FilesPreview from './FilesPreview';
import { RootState } from '../../store/store';
import { fileActions } from '../../store/file/file';

const Upload = () => {
  console.log('Upload YYY');

  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const dispatch = useDispatch();

  const uploadedFilesProps = useSelector<RootState, IDocDetails[]>(
    (state) => state.file.uploadedFilesProps,
  );

  const setSelectedFile = (index: number) => {
    dispatch(fileActions.setSelectedFile(index));
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (uploadedFilesProps.length > 0) {
      setSelectedFile(uploadedFilesProps.length - 1);
      setExpanded('panel2');
    }
  }, [uploadedFilesProps]);

  useEffect(() => {
    if (uploadedFilesProps.length === 0) {
      setExpanded('panel1');
    }
  }, [uploadedFilesProps]);

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <TypeOfDocument />

        <ListOfUploads />
      </Grid>

      <Grid item xs={12} md={8}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleAccordionChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ fontWeight: 600 }}>
              {expanded === 'panel1' ? '' : 'Select more files for upload'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SelectFiles />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleAccordionChange('panel2')}
          sx={{ position: 'relative' }}
        >
          <AccordionSummary
            style={{
              position: `${expanded === 'panel2' ? 'absolute' : 'relative'}`,
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bottom: 0,
              right: 0,
            }}
          >
            <Typography sx={{ width: '100%', fontWeight: 600 }}>
              {expanded === 'panel2' ? '' : 'Preview uploaded files'}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <FilesPreview />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Upload;
