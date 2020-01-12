import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";
import TopBar from "./components/topbar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "blue", rects: [], ellipses: [] };
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
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
          draggable: true
        }
      ]
    });
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
          draggable: true
        }
      ]
    });
  }

  render() {
    return (
      <React.Fragment>
        <TopBar addRect={this.addRect} addEllipse={this.addEllipse}></TopBar>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref="stageReference"
        >
        <Layer>
          {this.state.rects.map(eachRect => {
            return (
              <Rect
                x={eachRect.x}
                y={eachRect.y}
                width={eachRect.width}
                height={eachRect.height}
                fill={eachRect.fill}
                draggable={eachRect.draggable}
              />
            );
          })}
          {this.state.ellipses.map(eachEllipse => {
            return (
              <Ellipse
                x={eachEllipse.x}
                y={eachEllipse.y}
                width={eachEllipse.width}
                height={eachEllipse.height}
                fill={eachEllipse.fill}
                draggable={eachEllipse.draggable}
              />
            );
          })}
        </Layer>
      </Stage>
      </React.Fragment>
    );
  }
}