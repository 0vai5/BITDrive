import React from 'react'

const FileLogo = ({type}) => {
  switch (type) {
    case 'document': 
      return <img src='/document.svg' alt='Document File' />
      break;
    case 'image':
      return <img src='/gallery.png' alt='Image File' />
      break;
    case 'audio':
      return <img src="/audio.png" alt="Audio File" />
      break;
    case 'video':
      return <img src="/video.png" alt="Video File" />
      break;
    default:
      return <img src="/others.png" alt="Other File" />

  
  }
}

export default FileLogo