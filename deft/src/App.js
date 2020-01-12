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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "green", rects: [], ellipses: [], selectedShapeName: "", textboxes: [], canvases: []};
    this.selectedElement = null;
    this.shapeCount = 0;
    this.elementDict = {};
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
    });

    if (this.elementDict.hasOwnProperty(this.state.selectedShapeName)) {
      this.selectedElement = this.elementDict[this.state.selectedShapeName];
    } else {
      this.selectedElement = null;
    }
    console.log(this.selectedElement);
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
          name: "shape"+this.shapeCount,
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
                ref={ref => this.elementDict['canvas'] = ref}
              />
            );
          })}

          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}>
          </TransformerComponent>
        </Layer>
      </Stage>
      <Constraints></Constraints>
      <ConstraintsEditor></ConstraintsEditor>
      </React.Fragment>
    );
  }
}