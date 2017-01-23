module.exports = function (image) {
  if (!image) {
    return
  }

  return image.replace('/image/upload/', '/image/upload/w_200,h_200,c_limit/')
}
