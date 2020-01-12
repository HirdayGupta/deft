export default class WidthAnchor {
  constructor(x, y, width, height) {
    this.name = "Width";
    this.computeValue(x,y,width,height);
  }

  computeValue(x,y,width,height) {
    this.value = width;
  }

  toSwift() {
    return "widthAnchor";
  }
}