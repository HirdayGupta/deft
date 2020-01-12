import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Ellipse } from "react-konva";
import Konva from "konva";

export default class ToolBar extends React.Component {
    render() {
        return (
          <Layer>
          <Rect
            ref="draggableRectReference"
            x={window.innerWidth/2}
            y={10}
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
              draggableRect.position({ x: window.innerWidth/2, y: 10 });
              draggableRect.getStage().draw(); // or this.refs.stageReference.draw();
            }}
          />
          <Ellipse
            ref="draggableEllipseReference"
            x={window.innerWidth/2 - 40}
            y={25}
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
              draggableEllipse.position({ x: window.innerWidth/2 - 40, y: 25 });
              draggableEllipse.getStage().draw(); // or this.refs.stageReference.draw();
            }}
          />
        </Layer>
        )
    }
}