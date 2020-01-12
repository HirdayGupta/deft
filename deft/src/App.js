import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";
import TopBar from "./components/topbar";
import RectElement from "./components/rect_element";
import TransformerComponent from "./components/transformer";
import EllipseElement from "./components/ellipse_element";
import TextElement from "./components/text_element"
import CanvasElement from "./components/canvas_element"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "#E3E3E3", rects: [], ellipses: [], selectedShapeName: "", textboxes: [], canvases: []};
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
    this.state.color = color;
    this.selectedElement.state.fill = color;
    this.setState({
      selectedShapeName: this.selectedElement.name
    });
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
        <TopBar addRect={this.addRect} addEllipse={this.addEllipse} addTextbox={this.addTextbox} addCanvas={this.addCanvas} changeColor={this.changeColor}></TopBar>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref="stageReference"
          onClick={this.handleStageClick}
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
      </React.Fragment>
    );
  }
}