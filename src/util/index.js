
const base64ToBlob = ({b64data = '', contentType = '', sliceSize = 512} = {}) => {
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = [];
      for (let i = 0; i < slice.length; i++) {
          byteNumbers.push(slice.charCodeAt(i));
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result,{
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`
    });
    resolve(result);
  })
}

export {base64ToBlob}