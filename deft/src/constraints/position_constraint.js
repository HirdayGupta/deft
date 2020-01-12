import Constraint from "./constraint";

export default class PositionConstraint extends Constraint {
  constructor(owningElement, owningAnchor, targetElement, targetAnchor) {
    super(owningElement, owningAnchor, targetElement, targetAnchor);
    this.type = "PositionConstraint";
  }

  validate() {
    return true;
  }

  setValue(value) {
    this.value = value;
  }

  suggestedValue() {
    return this.targetAnchor.value - this.owningAnchor.value;
  }

  toString() {
    return this.owningElement.name + "." + this.owningAnchor.name + " = " + this.targetElement.name + "." + this.targetAnchor.name + " + " + this.value;
  }
}