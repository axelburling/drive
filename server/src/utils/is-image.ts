const isImage = (fileName: string) => {
  return fileName.match(/\.(jpg|jpeg|png)$/);
};

export default isImage;
