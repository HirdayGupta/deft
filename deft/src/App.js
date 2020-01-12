import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";
import TopBar from "./components/topbar";
import RectElement from "./components/rect_element";
import TransformerComponent from "./components/transformer";
import EllipseElement from "./components/ellipse_element";
import TextElement from "./components/text_element"
import CanvasElement from "./components/canvas_element"
import ConstraintsEditor from "./components/constraints_editor"
import Constraints from "./components/constraints"
import {SwiftTranslator} from "./translator"
import SwiftCode from "./components/swift-code"

import {PositionConstraint, SizeConstraint} from "./constraints"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "green", rects: [], ellipses: [], selectedShapeName: "", textboxes: [], canvases: []};
    this.selectedElement = null;
    this.shapeCount = 0;
    this.elementDict = {};

    this.firstElement = null;
    this.firstAnchor = null;
    this.secondElement = null;
    this.secondAnchor = null;
    this.currentConstraint = null;
  }

  resetConstraints = () => {
    this.firstElement = null;
    this.firstAnchor = null;
    this.secondElement = null;
    this.secondAnchor = null;
    this.currentConstraint = null;
  }

  selectFirstAnchor = (type) => {
    this.firstElement = this.selectedElement;
    switch(type) {
      case "L":
        this.firstAnchor = this.selectedElement.leftAnchor;
      break;
      case "R":
        this.firstAnchor = this.selectedElement.rightAnchor;
        break;
      case "T":
        this.firstAnchor = this.selectedElement.topAnchor;
        break;
      case "B":
        this.firstAnchor = this.selectedElement.bottomAnchor;
        break;
      case "W":
        this.firstAnchor = this.selectedElement.widthAnchor;
        this.currentConstraint = new SizeConstraint(this.firstElement, this.firstAnchor, null, null);
        this.constraintsEditor.updateSuggestedValue(this.currentConstraint.suggestedValue());
        break;
      case "H":
        this.firstAnchor = this.selectedElement.heightAnchor;
        this.currentConstraint = new SizeConstraint(this.firstElement, this.firstAnchor, null, null);
        this.constraintsEditor.updateSuggestedValue(this.currentConstraint.suggestedValue());
        break;
      default:
      break;
    }
    console.log("handled first anchor", this.firstElement, this.firstAnchor);
  }

  selectSecondAnchor = (type) => {
    this.secondElement = this.selectedElement;
    switch (type) {
      case "L":
        this.secondAnchor = this.selectedElement.leftAnchor;
        break;
      case "R":
        this.secondAnchor = this.selectedElement.rightAnchor;
        break;
      case "T":
        this.secondAnchor = this.selectedElement.topAnchor;
        break;
      case "B":
        this.secondAnchor = this.selectedElement.bottomAnchor;
        break;
      case "W":
        this.secondAnchor = this.selectedElement.widthAnchor;
        break;
      case "H":
        this.secondAnchor = this.selectedElement.heightAnchor;
        break;
      default:
        break;
    }

    console.log("handled second anchor", this.secondElement, this.secondAnchor);

    switch (type) {
      case "L":
      case "R":
      case "T":
      case "B":
        this.currentConstraint = new PositionConstraint(this.firstElement, this.firstAnchor, this.secondElement, this.secondAnchor);
      break;

      case "W":
      case "H":
        this.currentConstraint = new SizeConstraint(this.firstElement, this.firstAnchor, this.secondElement, this.secondAnchor);
      break;

      default:
      break;
    }

    console.log("constructed constraint: ", this.currentConstraint);

    this.constraintsEditor.updateSuggestedValue(this.currentConstraint.suggestedValue());
  }

  submitConstraint = (constraintValue) => {
    this.currentConstraint.setValue(constraintValue);
    this.selectedElement.addConstraint(this.currentConstraint);
    this.constraintsView.elementSelected(this.selectedElement.constraints);
    this.resetConstraints();
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  changeColor = (color) => {
    if(this.selectedElement == null) {
      return;
    }
    this.selectedElement.updateFillColor(color);
  }

  editText = (text) => {
    if (this.selectedElement == null) {
      return;
    }
    if (this.selectedElement.getType() !== "TextElement") {
      return;
    }
    this.selectedElement.editText(text);
  }

  changeFont = (font) => {
    if (this.selectedElement == null) {
      return;
    }
    if (this.selectedElement.getType() !== "TextElement") {
      return;
    }
    this.selectedElement.changeFont(font);
  }

  changeFontSize = (fontSize) => {
    if (this.selectedElement == null) {
      return;
    }
    if (this.selectedElement.getType() !== "TextElement") {
      return;
    }
    this.selectedElement.changeFontSize(fontSize);
  }

  changeBorderRadius = (borderRadius) => {
    if (this.selectedElement == null) {
      return;
    }
    if (this.selectedElement.getType() !== "RectElement") {
      return;
    }
    this.selectedElement.changeBorderRadius(borderRadius);
  }

  handleStageClick = e => {
    this.setState({
      selectedShapeName: e.target.name()
    }, () => {
        if (this.elementDict.hasOwnProperty(this.state.selectedShapeName)) {
          this.selectedElement = this.elementDict[this.state.selectedShapeName];
          this.constraintsView.elementSelected(this.selectedElement.constraints);
        } else {
          this.selectedElement = null;
        }
        console.log(this.selectedElement);
    });



  };

  addCanvas = (newX, newY) => {
    this.setState({
      canvases: [
        ...this.state.canvases,
        {
          x: newX,
          y: newY,
          width: 264,
          height: 544,
          draggable: true,
          name: "canvas",
          fill: this.state.color
        }
      ]
    });
    this.shapeCount++;
  }

  addTextbox = (newX, newY) => {
    this.setState({
      textboxes: [
        ...this.state.textboxes,
        {
          x: newX,
          y: newY,
          width: 200,
          height: 30,
          draggable: true,
          name: "shape"+this.shapeCount
        }
      ]
    });
    this.shapeCount++;
  }

  addRect = (newX, newY) => {
    this.setState({
      rects: [
        ...this.state.rects,
        {
          x: newX,
          y: newY,
          width: 100,
          height: 100,
          fill: this.state.color,
          draggable: true,
          name: "shape"+this.shapeCount
        }
      ]
    });
    this.shapeCount++;
  }

  addEllipse = (newX, newY) => {
    this.setState({
      ellipses: [
        ...this.state.ellipses,
        {
          x: newX,
          y: newY,
          width: 100,
          height: 100,
          fill: this.state.color,
          draggable: true,
          name: "shape"+this.shapeCount
        }
      ]
    });
    this.shapeCount++;
  }

  translateToSwift = () => {
    var tr = new SwiftTranslator(this.elementDict);
    var swift = tr.translate();
    console.log(swift);
    return swift;
  }

  render() {
    return (
      <React.Fragment>
        <TopBar addRect={this.addRect} addEllipse={this.addEllipse} addTextbox={this.addTextbox} addCanvas={this.addCanvas} changeColor={this.changeColor} editText={this.editText} changeFont={this.changeFont} changeFontSize={this.changeFontSize} changeBorderRadius={this.changeBorderRadius}></TopBar>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref="stageReference"
          onClick={this.handleStageClick}
          className="konva-stage"
        >
        <Layer>
          {this.state.rects.map(eachRect => {
            return (
              <RectElement
                x={eachRect.x}
                y={eachRect.y}
                width={eachRect.width}
                height={eachRect.height}
                fill={eachRect.fill}
                draggable={eachRect.draggable}
                name={eachRect.name}
                ref={ref => this.elementDict[eachRect.name] = ref}
              />
            );
          })}
          {this.state.ellipses.map(eachEllipse => {
            return (
              <EllipseElement
                x={eachEllipse.x}
                y={eachEllipse.y}
                width={eachEllipse.width}
                height={eachEllipse.height}
                fill={eachEllipse.fill}
                draggable={eachEllipse.draggable}
                name={eachEllipse.name}
                ref={ref => this.elementDict[eachEllipse.name] = ref}
              />
            );
          })}

          {this.state.textboxes.map(eachTextbox => {
            return (
              <TextElement
                x={eachTextbox.x}
                y={eachTextbox.y}
                width={eachTextbox.width}
                height={eachTextbox.height}
                draggable={eachTextbox.draggable}
                name={eachTextbox.name}
                text="Default Text"
                fontSize={18}
                fontFamily='Calibri'
                align='center'
                ref={ref => this.elementDict[eachTextbox.name] = ref}
              />
            );
          })}

          {this.state.canvases.map(eachCanvas => {
            return (
              <CanvasElement
                x={eachCanvas.x}
                y={eachCanvas.y}
                width={eachCanvas.width}
                height={eachCanvas.height}
                draggable={eachCanvas.draggable}
                fill={eachCanvas.fill}
                name={eachCanvas.name}
                ref={ref => this.elementDict['canvas'] = ref}
              />
            );
          })}

          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}>
          </TransformerComponent>
        </Layer>
      </Stage>
        {/* constraints={this.selectedElement != null ? this.selectedElement.getConstraints() : []} */}
      <SwiftCode translateToSwift={this.translateToSwift}></SwiftCode>
      <Constraints ref={ref => this.constraintsView = ref}></Constraints>
      <ConstraintsEditor ref={ref => this.constraintsEditor=ref} selectFirstAnchor={this.selectFirstAnchor} selectSecondAnchor={this.selectSecondAnchor} submitConstraint={this.submitConstraint}></ConstraintsEditor>
      <button onClick={this.translateToSwift}>MAKE SWIFT</button>
      </React.Fragment>
    );
  }
}