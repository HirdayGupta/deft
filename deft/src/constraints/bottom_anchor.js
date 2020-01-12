export default class BottomAnchor {
  constructor(x, y, width, height) {
    this.name = "Bottom";
    this.computeValue(x,y,width,height);
  }

  computeValue(x,y,width,height) {
    this.value = y+height;
  }
}