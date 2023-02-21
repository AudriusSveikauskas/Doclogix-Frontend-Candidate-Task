import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useSelector } from 'react-redux';
import { Box, Fab, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { RootState } from '../../../store/store';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFPreview = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(0);

  const selectedFile = useSelector<RootState, number>(
    (state) => state.file.selectedFile,
  );

  const uploadedFilesProps = useSelector<RootState, IDocDetails[]>(
    (state) => state.file.uploadedFilesProps,
  );

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };

  const goToNextPage = () => {
    if (numPages !== 0 && pageNumber + 1 >= numPages) {
      setPageNumber(numPages);
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    setNumPages(0);
    setPageNumber(1);
  }, [selectedFile]);

  useEffect(() => {
    setPageWidth(Math.trunc(window.innerWidth / 2));
  }, [window.innerWidth]);

  return (
    <Box>
      {selectedFile !== -1 &&
      uploadedFilesProps[selectedFile].type === 'pdf' ? (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              marginBottom: 2,
            }}
          >
            <Fab
              disabled={pageNumber === 1}
              color="secondary"
              size="small"
              aria-label="prev"
              onClick={goToPrevPage}
            >
              <KeyboardArrowLeftIcon />
            </Fab>

            <Typography>{`Page ${pageNumber} of ${numPages}`}</Typography>

            <Fab
              disabled={pageNumber === numPages}
              color="secondary"
              size="small"
              aria-label="prev"
              onClick={goToNextPage}
            >
              <KeyboardArrowRightIcon />
            </Fab>
          </Box>

          <Box
            sx={{ marginX: 'auto', display: 'flex', justifyContent: 'center' }}
          >
            <Document
              file={uploadedFilesProps[selectedFile].fileURL}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page width={pageWidth} pageNumber={pageNumber} />
            </Document>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default PDFPreview;
