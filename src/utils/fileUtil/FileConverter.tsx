import ExcelDocIcon from 'components/atom/icons/Documents/ExcelDocIcon';
import HangulDocIcon from 'components/atom/icons/Documents/HangulDocIcon';
import PdfDocIcon from 'components/atom/icons/Documents/PdfDocIcon';
import PictureDocIcon from 'components/atom/icons/Documents/PictureDocIcon';
import PowerpointDocIcon from 'components/atom/icons/Documents/PowerpointDocIcon';
import React from 'react';
import TxtDocIcon from 'components/atom/icons/Documents/TxtDocIcon';
import WordDocIcon from 'components/atom/icons/Documents/WordDocIcon';

interface FileConverterProps {
  fileExt: string;
}

const FileConverter: React.FC<FileConverterProps> = ({ fileExt }) => {
  switch (fileExt) {
    case 'docx':
      return <WordDocIcon />;
    case 'hwpx':
      return <HangulDocIcon />;
    case 'xlsx':
      return <ExcelDocIcon />;
    case 'pptx':
      return <PowerpointDocIcon />;
    case 'hwp':
      return <HangulDocIcon />;
    case 'pdf':
      return <PdfDocIcon />;
    case 'txt':
      return <TxtDocIcon />;
    case 'png':
      return <PictureDocIcon />;
    case 'jpg':
      return <PictureDocIcon />;
    case 'gif':
      return <PictureDocIcon />;
    case 'tiff':
      return <PictureDocIcon />;
    default:
      return null;
  }
};

export default FileConverter;
