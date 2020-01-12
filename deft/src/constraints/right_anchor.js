export default class RightAnchor {
  constructor(x, y, width, height) {
    this.name = "Right";
    this.computeValue(x,y,width,height);
  }

  computeValue(x,y,width,height) {
    this.value = x+width;
  }

  toSwift() {
    return "trailingAnchor";
  }
}