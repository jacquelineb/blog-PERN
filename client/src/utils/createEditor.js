import EditorJS from '@editorjs/editorjs';
import Image from '@editorjs/image';

function createEditor(data) {
  return new EditorJS({
    holder: 'bodyEditor',
    readOnly: false,
    tools: {
      image: {
        class: Image,
        config: {
          uploader: {
            uploadByFile(file) {
              return Promise.resolve({
                success: 1,
                file: {
                  url: URL.createObjectURL(file),
                  tempFileData: file, // Temporarily save file in case I need to upload to cloud
                },
              });
            },
          },
        },
      },
    },

    data: {
      blocks: data,
      time: '',
      version: '',
    },
  });
}

export default createEditor;
