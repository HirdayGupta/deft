export default class HeightAnchor {
  constructor(x, y, width, height) {
    this.name = "Height";
    this.computeValue(x,y,width,height);
  }

  computeValue(x,y,width,height) {
    this.value = height;
  }

  toSwift() {
    return "heightAnchor";
  }
}