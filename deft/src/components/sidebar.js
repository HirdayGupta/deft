import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";

export default class SideBar extends React.Component {
    render() {
        return (
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
            fill={this.props.color}
            shadowBlur={0}
            onClick={this.handleClick}
            draggable={true}
            onDragEnd={() => {
              var draggableRect = this.refs.draggableRectReference;
              /* adding a new rect in in state, no need to call draw() or anything
              because updating state triggers render() again */
              this.props.addRect(draggableRect.getStage().getPointerPosition().x, draggableRect.getStage().getPointerPosition().y)
              draggableRect.position({ x: 10, y: 240 });
              draggableRect.getStage().draw(); // or this.refs.stageReference.draw();
            }}
          />
          <Ellipse
            ref="draggableEllipseReference"
            x={25}
            y={200}
            width={30}
            height={30}
            fill={this.props.color}
            shadowBlur={0}
            onClick={this.handleClick}
            draggable={true}
            onDragEnd={() => {
              var draggableEllipse = this.refs.draggableEllipseReference;
              /* adding a new rect in in state, no need to call draw() or anything
              because updating state triggers render() again */
              this.props.addEllipse(draggableEllipse.getStage().getPointerPosition().x, draggableEllipse.getStage().getPointerPosition().y)
              //returning draggable rect to original position
              draggableEllipse.position({ x: 25, y: 200 });
              draggableEllipse.getStage().draw(); // or this.refs.stageReference.draw();
            }}
          />
        </Layer>
        )
    }
}