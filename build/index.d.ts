import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
interface AllPagesProps {
    pdf: string | ArrayBuffer | Uint8Array | Blob;
}
declare function AllPagesPdfViewer(props: AllPagesProps): import("react/jsx-runtime").JSX.Element;
export default AllPagesPdfViewer;
