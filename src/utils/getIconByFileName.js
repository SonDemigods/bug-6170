import excelImg from 'images/forms_attachment_excel@3x.png';
import imageImg from 'images/forms_attachment_image@3x.png';
import keyImg from 'images/forms_attachment_key@3x.png';
import moiveImg from 'images/forms_attachment_moive@3x.png';
import musicImg from 'images/forms_attachment_music@3x.png';
import numberImg from 'images/forms_attachment_number@3x.png';
import otherImg from 'images/forms_attachment_other@3x.png';
import pagesImg from 'images/forms_attachment_pages@3x.png';
import pdfImg from 'images/forms_attachment_pdf@3x.png';
import pptImg from 'images/forms_attachment_ppt@3x.png';
import rarImg from 'images/forms_attachment_rar@3x.png';
import rtfImg from 'images/forms_attachment_rtf@3x.png';
import txtImg from 'images/forms_attachment_txt@3x.png';
import wordImg from 'images/forms_attachment_word@3x.png';

// 通过文件名称获取对应文件类型的icon
const getIconByFileName = (fileName = '') => {
  const fileType = fileName.replace(/^.+\.([^.]+)$/, '$1')
    .toLowerCase();
  switch (fileType) {
    case 'rar':
    case 'zip':
    case 'tar':
    case 'bz2':
    case 'gz':
    case '7z':
      return rarImg;
    case 'doc':
    case 'docx':
      return wordImg;
    case 'pages':
      return pagesImg;
    case 'ppt':
    case 'pptx':
      return pptImg;
    case 'keynote':
      return keyImg;
    case 'xls':
    case 'xlsx':
      return excelImg;
    case 'numbers':
      return numberImg;
    case 'pdf':
      return pdfImg;
    case 'txt':
      return txtImg;
    case 'rtf':
      return rtfImg;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return imageImg;
    case 'mp3':
      return musicImg;
    case 'mp4':
    case 'mov':
      return moiveImg;
    default:
      return otherImg;
  }
};

export default getIconByFileName;
