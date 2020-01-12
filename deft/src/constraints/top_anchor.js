export default class TopAnchor {
  constructor(x, y, width, height) {
    this.name = "Top";
    this.computeValue(x,y,width,height);
  }

  computeValue(x,y,width,height) {
    this.value = y;
  }

  toSwift() {
    return "topAnchor";
  }
}