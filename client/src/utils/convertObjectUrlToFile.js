async function convertObjectUrlToFile(objectUrl) {
  try {
    const response = await fetch(objectUrl);
    const blob = await response.blob();
    return new File([blob], '');
  } catch (error) {
    console.error(error);
  }
}

export default convertObjectUrlToFile;
