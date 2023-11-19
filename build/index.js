"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_pdf_1 = require("react-pdf");
require("react-pdf/dist/esm/Page/TextLayer.css");
require("react-pdf/dist/esm/Page/AnnotationLayer.css");
react_pdf_1.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${react_pdf_1.pdfjs.version}/build/pdf.worker.min.js`;
function AllPagesPdfViewer(props) {
    const [numPages, setNumPages] = (0, react_1.useState)(null);
    const [responsiveWidth, setResponsiveWidth] = (0, react_1.useState)();
    const [scale, setScale] = (0, react_1.useState)(1);
    const theme = (0, material_1.useTheme)();
    (0, react_1.useEffect)(() => {
        updateResponsiveWidth();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    function onDocumentLoadSuccess({ numPages }) {
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
        }
        else {
            const approximatePageHeight = 792; // Approximate height of a PDF page in points
            const scaleFactor = window.innerHeight / approximatePageHeight;
            setResponsiveWidth(undefined);
            setScale(scaleFactor);
        }
    }
    const { pdf } = props;
    return ((0, jsx_runtime_1.jsx)(react_pdf_1.Document, { file: pdf, onLoadSuccess: onDocumentLoadSuccess, children: Array.from(new Array(numPages || 0), (el, index) => ((0, jsx_runtime_1.jsx)(react_pdf_1.Page, { pageNumber: index + 1, scale: scale, renderAnnotationLayer: false, width: responsiveWidth }, `page_${index + 1}`))) }));
}
exports.default = AllPagesPdfViewer;
