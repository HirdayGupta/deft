export default class SwiftTranslator {
  constructor(elementDict) {
    this.elementDict = elementDict;
  }

  translate() {
    var elementDict = this.elementDict;
    if (!elementDict.hasOwnProperty('canvas')) {
      return "";
    }

    var canvasElement = this.elementDict['canvas'];

    var translation = "";

    for (var item in elementDict) {
      var name = item;
      var element = elementDict[item];

      if (element.getType() != "RectElement")
        continue;

      translation += "let " + name + " = " + "UIView(frame: .zero)\n";
      translation += name + "." + "translatesAutoresizingMaskIntoConstraints = false\n";
      translation += name + ".layer.cornerRadius = " + (element.state.borderRadius == undefined ? 0 : element.state.borderRadius) + "\n";
      // TODO: Handle hex colors
      translation += name + ".backgroundColor = ." + element.state.fill + "\n";
      translation += "self.view.addSubview(" + name + ")\n";
    }

    translation += "let constraints = [\n";

    for (var item in elementDict) {
      var name = item;
      var element = elementDict[item];
      if (element.getType() != "RectElement" && element.getType() != "CanvasElement")
        continue;

      if (element.getType() == "CanvasElement")
        name = "self.view";

      var constraints = element.getConstraints();
      constraints.forEach(constraint => {
        if (constraint.type == "PositionConstraint") {

          if (constraint.targetElement.getType() == "CanvasElement") {
            translation += "self.view.safeAreaLayoutGuide";
          } else {
            translation += constraint.targetElement.name;
          }

          translation+= "." + constraint.targetAnchor.toSwift() + ".constraint(equalTo: ";

          if (constraint.owningElement.getType() == "CanvasElement") {
            translation += "self.view.safeAreaLayoutGuide";
          } else {
            translation += constraint.owningElement.name;
          }

          translation+= "." + constraint.owningAnchor.toSwift() + ", constant: " + constraint.value + "),\n"

        } else if (constraint.type == "AbsoluteSizeConstraint") {
          var elementName = constraint.owningElement.name;
          if (constraint.owningElement.getType() == "CanvasElement") {
            elementName = "self.view";
          }
          translation += elementName + "." + constraint.owningAnchor.toSwift() + ".constraint(equalToConstant: " + constraint.value + "),\n";
          // if (constraint.owningAnchor.name == "Width") {
          //   translation += constraint.owningElement.name + ".widthAnchor.constraint(equalToConstant: " + constraint.value + "),\n";
          // } else if (constraint.owningAnchor.name == "Height") {
          //   translation += constraint.owningElement.name + ".heightAnchor.constraint(equalToConstant: " + constraint.value + "),\n";
          // }
        } else if (constraint.type == "RelativeSizeConstraint") {
          var owningElementName = constraint.owningElement.name;
          if (constraint.owningElement.getType() == "CanvasElement") {
            owningElementName = "self.view";
          }
          var targetElementName = constraint.targetElement.name;
          if (constraint.targetElement.getType() == "CanvasElement") {
            targetElementName = "self.view";
          }
          translation += owningElementName + "." + constraint.owningAnchor.toSwift() + ".constraint(equalTo: ";
          translation += targetElementName + "." + constraint.targetAnchor.toSwift() + ", multiplier: " + constraint.value + "),\n";
        }
      });

    }
    translation += "]\n";
    translation += "NSLayoutConstraint.activate(constraints)\n";
    return translation;
  }
}