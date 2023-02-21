import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootState } from '../../../store/store';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFPreview = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

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

  return (
    <Box>
      {selectedFile !== -1 &&
      uploadedFilesProps[selectedFile].type === 'pdf' ? (
        <Box>
          <Box
            onClick={goToPrevPage}
            sx={{ width: '50px', height: '50px', backgroundColor: 'red' }}
          >
            Prev
          </Box>

          <Box
            onClick={goToNextPage}
            sx={{ width: '50px', height: '50px', backgroundColor: 'green' }}
          >
            Next
          </Box>

          <Typography>{`Page ${pageNumber} of ${numPages}`}</Typography>

          <Box
            sx={{ marginX: 'auto', display: 'flex', justifyContent: 'center' }}
          >
            <Document
              file={uploadedFilesProps[selectedFile].fileURL}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
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
