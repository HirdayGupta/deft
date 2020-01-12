import React, { Component } from "react";
import { Stage, Layer, Rect, Transformer, Text, Ellipse } from "react-konva";
import Konva from "konva";

export default class RectElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height,
      fill: props.fill,
      borderRadius: props.borderRadius
    };
  }

  componentDidMount() {
    this.shapeRef.moveToTop();
  }

  getType = () => {
    return "RectElement";
  }

  updateBorderRadius(newBorderRadius) {
    this.setState({
      borderRadius: newBorderRadius
    });
  }

  handleDragEnd = (e) => {
    this.setState({
      x: e.target.x(),
      y: e.target.y()
    });
  }

  handleTransformEnd = (e) => {
    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = this.shapeRef;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    this.setState({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY)
    });
  }

  render() {
    return(
      <React.Fragment>
      <Rect
        x={this.state.x}
        y={this.state.y}
        ref={ref => {this.shapeRef = ref}}
        width={this.state.width}
        height={this.state.height}
        fill={this.state.fill}
        borderRadius={this.state.borderRadius}
        name={this.props.name}
        draggable={true}
        onClick={this.handleClick}
        onDragEnd={this.handleDragEnd}
        onTransformEnd={this.handleTransformEnd}
      />
      </React.Fragment>

    )
  }
}