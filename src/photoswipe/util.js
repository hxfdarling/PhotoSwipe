
export function rotateImage(image, degrees) {
  let canvas = document.createElement('canvas')
  canvas.style = "visibility: hidden;top:0;left:0;position: absolute;z-index: -1"
  document.body.appendChild(canvas)
  let ctx = canvas.getContext("2d")
  if (degrees == 90 || degrees == 270) {
    canvas.width = image.height
    canvas.height = image.width
  } else {
    canvas.width = image.width
    canvas.height = image.height
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (degrees == 90 || degrees == 270) {
    ctx.translate(image.height / 2, image.width / 2)
  } else {
    ctx.translate(image.width / 2, image.height / 2)
  }
  ctx.rotate(degrees * Math.PI / 180)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  let src = canvas.toDataURL("image/png")
  document.body.removeChild(canvas)
  return src;
}
