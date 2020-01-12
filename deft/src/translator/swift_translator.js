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
          if (constraint.owningAnchor.name == "Width") {
            translation += name + ".widthAnchor.constraint(equalToConstant: " + constraint.value + "),\n";
          } else if (constraint.owningAnchor.name == "Height") {
            translation += name + ".heightAnchor.constraint(equalToConstant: " + constraint.value + "),\n";
          }
        } else if (constraint.type == "RelativeSizeConstraint") {
          // TODO
        }
      });

    }
    translation += "]\n";
    translation += "NSLayoutConstraint.activate(constraints)\n";
    return translation;
  }
}