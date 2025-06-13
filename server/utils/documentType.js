export const DocumentType = (fileName) => {
    const fileExtension = fileName.split(".")[1];

    if(fileExtension === "pdf" || fileExtension === "docx" || fileExtension === "md" || fileExtension === "txt"){
        return "document";
    } else if(fileExtension === "mov" || fileExtension === "mp4" || fileExtension === "avi" || fileExtension === "mkv"){
        return "video";
    } else if(fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif"){
        return "image";
    } else if (fileExtension === "mp3" || fileExtension === "wav" || fileExtension === "flac") {
        return "audio";
    } else {
        return "other";
    }
}