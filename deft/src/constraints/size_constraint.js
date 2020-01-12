import Constraint from "./constraint";


/*
This class is "overloaded" to represent two kinds of constraints.
If targetElement is null, then it represents an absolute constraint.
If not, then it is relative wrt to the targetElement.
*/

export default class SizeConstraint extends Constraint {
  constructor(owningElement, owningAnchor, targetElement, targetAnchor) {
    super(owningElement, owningAnchor, targetElement, targetAnchor);
    if (this.targetElement == null) {
      this.type = "AbsoluteSizeConstraint";
    } else {
      this.type = "RelativeSizeConstraint";
    }
  }

  validate() {
    return true;
  }

  setValue(value) {
    this.value = value;
  }

  suggestedValue() {
    if (this.targetElement == null) {
      return this.owningAnchor.value;
    } else {
      return this.owningAnchor.value / this.targetAnchor.value;
    }
  }

  toString() {
    if (this.targetElement == null) {
      return this.owningElement.name + "." + this.owningAnchor.name + " = " + this.value;
    } else {
      return this.owningElement.name + "." + this.owningAnchor.name + " = " + this.value + "*" + this.targetElement.name + "." + this.targetAnchor.name;
    }
  }
}