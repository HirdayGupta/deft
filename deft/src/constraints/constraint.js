export default class Constraint {
  constructor(owningElement, owningAnchor, targetElement, targetAnchor) {
    this.owningElement = owningElement;
    this.owningAnchor = owningAnchor;
    this.targetElement = targetElement;
    this.targetAnchor = targetAnchor;
  }

  validate() {
    return true;
  }

  toString() {
    return this.owningElement.name + "." + this.owningAnchor.name + " = " + this.targetElement.name + "." + this.targetAnchor.name;
  }

  suggestedValue() {
    return this.targetAnchor.value - this.owningAnchor.value;
  }
}