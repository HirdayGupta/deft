export default class LeftAnchor {
  constructor(x, y, width, height) {
    this.name = "Left";
    this.computeValue(x,y,width,height);
  }

  computeValue(x,y,width,height) {
    this.value = x;
  }

  toSwift() {
    return "leadingAnchor";
  }
}