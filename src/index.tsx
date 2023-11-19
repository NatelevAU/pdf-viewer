import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface AllPagesProps {
  pdf: string | ArrayBuffer | Uint8Array | Blob;
}

function AllPagesPdfViewer(props: AllPagesProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [responsiveWidth, setResponsiveWidth] = useState<number | undefined>();
  const [scale, setScale] = useState(1);
  const theme = useTheme();

  useEffect(() => {
    updateResponsiveWidth();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function handleResize() {
    updateResponsiveWidth();
  }

  function updateResponsiveWidth() {
    if (window.innerWidth < theme.breakpoints.values.sm) {
      const spacingValue = parseInt(theme.spacing(2).replace('px', ''), 10);
      setResponsiveWidth(window.innerWidth - spacingValue);
      setScale(1);
    } else {
      const approximatePageHeight = 792; // Approximate height of a PDF page in points
      const scaleFactor = window.innerHeight / approximatePageHeight;
      setResponsiveWidth(undefined);
      setScale(scaleFactor);
    }
  }

  const { pdf } = props;

  return (
    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages || 0), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          scale={scale}
          renderAnnotationLayer={false}
          width={responsiveWidth}
        />
      ))}
    </Document>
  );
}

export default AllPagesPdfViewer;
