interface FileConverterProps {
  fileExt: string;
}

const FileConverter: React.FC<FileConverterProps> = ({ fileExt }) => {
  switch (fileExt) {
    case "docx":
      return;
    case "hwpx":
      return;
    case "xlsx":
      return;
    case "pptx":
      return;
    case "hwp":
      return;
    case "pdf":
      return;
    case "txt":
      return;
    case "png":
      return;
    case "jpg":
      return;
    case "gif":
      return;
    case "tiff":
      return;
    default:
      return null;
  }
};

export default FileConverter;
