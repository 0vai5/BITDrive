import { File, FileAudio, Image, PieChartIcon, Video } from 'lucide-react'
import React from 'react'

const FileLogo = ({type}) => {
  switch (type) {
    case 'document': 
      return <File size={24} />
      break;
    case 'image':
      return <Image size={24} />
      break;
    case 'audio':
      return <FileAudio size={24} />
      break;
    case 'video':
      return <Video size={24} /> 
      break;
    default:
      return <PieChartIcon size={24} />

  
  }
}

export default FileLogo