import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";
import TopBar from "./components/topbar";
import RectElement from "./components/rect_element";
import TransformerComponent from "./components/transformer";
import EllipseElement from "./components/ellipse_element";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "blue", rects: [], ellipses: [], selectedShapeName: ""};
    this.shapeCount = 0;
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  handleStageClick = e => {
    this.setState({
      selectedShapeName: e.target.name()
    });
  };

  addRect = (newX, newY) => {
    this.setState({
      rects: [
        ...this.state.rects,
        {
          x: newX,
          y: newY,
          width: 30,
          height: 30,
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
          width: 30,
          height: 30,
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
        <TopBar addRect={this.addRect} addEllipse={this.addEllipse}></TopBar>
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