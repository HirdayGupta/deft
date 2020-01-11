import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "green", rects: [], ellipses: [] };
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref="stageReference"
      >
        <Layer>
          <Rect
          x={0}
          y={0}
          width={50}
          height={window.outerHeight}
          stroke="black"
          strokeWidth={1.5}
          fill="black"
          />
          <Rect
            ref="draggableRectReference"
            x={10}
            y={240}
            width={30}
            height={30}
            fill={this.state.color}
            shadowBlur={0}
            onClick={this.handleClick}
            draggable={true}
            onDragEnd={() => {
              var draggableRect = this.refs.draggableRectReference;
              /* adding a new rect in in state, no need to call draw() or anything
              because updating state triggers render() again */
              this.setState({
                rects: [
                  ...this.state.rects,
                  {
                    x: draggableRect.getStage().getPointerPosition().x,
                    y: draggableRect.getStage().getPointerPosition().y,
                    width: 30,
                    height: 30,
                    fill: this.state.color,
                    draggable: true
                  }
                ]
              });
              //returning draggable rect to original position
              draggableRect.position({ x: 10, y: 240 });
              this.refs.stageReference.draw(); // or draggableRect.getStage().draw()
            }}
          />
          <Ellipse
            ref="draggableEllipseReference"
            x={25}
            y={200}
            width={30}
            height={30}
            fill={this.state.color}
            shadowBlur={0}
            onClick={this.handleClick}
            draggable={true}
            onDragEnd={() => {
              var draggableEllipse = this.refs.draggableEllipseReference;
              /* adding a new rect in in state, no need to call draw() or anything
              because updating state triggers render() again */
              this.setState({
                ellipses: [
                  ...this.state.ellipses,
                  {
                    x: draggableEllipse.getStage().getPointerPosition().x,
                    y: draggableEllipse.getStage().getPointerPosition().y,
                    width: 30,
                    height: 30,
                    fill: this.state.color,
                    draggable: true
                  }
                ]
              });
              //returning draggable rect to original position
              draggableEllipse.position({ x: 25, y: 200 });
              this.refs.stageReference.draw(); // or draggableRect.getStage().draw()
            }}
          />
        </Layer>
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
    );
  }
}