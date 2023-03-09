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
          types: 'image/png, image/gif, image/jpeg',
          uploader: {
            uploadByFile(file) {
              return Promise.resolve({
                success: 1,
                file: {
                  url: URL.createObjectURL(file),
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
