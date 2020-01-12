import React, { Component } from "react";
import { Rect } from "react-konva";
import { LeftAnchor, RightAnchor, TopAnchor, BottomAnchor, WidthAnchor, HeightAnchor } from "../constraints"

export default class CanvasElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        x: props.x,
        y: props.y,
        width: 330,
        height: 586,
        fill: "#ffffff"
    };

    this.leftAnchor = new LeftAnchor(this.state.x, this.state.y, this.state.width, this.state.height);
    this.rightAnchor = new RightAnchor(this.state.x, this.state.y, this.state.width, this.state.height);
    this.topAnchor = new TopAnchor(this.state.x, this.state.y, this.state.width, this.state.height);
    this.bottomAnchor = new BottomAnchor(this.state.x, this.state.y, this.state.width, this.state.height);
    this.widthAnchor = new WidthAnchor(this.state.x, this.state.y, this.state.width, this.state.height);
    this.heightAnchor = new HeightAnchor(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  componentDidMount() {
    console.log("MOVED TO BOTTOM");
    this.shapeRef.moveToBottom();
  }

  getType = () => {
    return "CanvasElement";
  }

  updateAnchors = () => {
    this.leftAnchor.computeValue(this.state.x, this.state.y, this.state.width, this.state.height);
    this.rightAnchor.computeValue(this.state.x, this.state.y, this.state.width, this.state.height);
    this.topAnchor.computeValue(this.state.x, this.state.y, this.state.width, this.state.height);
    this.bottomAnchor.computeValue(this.state.x, this.state.y, this.state.width, this.state.height);
    this.widthAnchor.computeValue(this.state.x, this.state.y, this.state.width, this.state.height);
    this.heightAnchor.computeValue(this.state.x, this.state.y, this.state.width, this.state.height);
  }

  handleDragEnd = (e) => {
    this.setState({
        x: e.target.x(),
        y: e.target.y()
    }, this.updateAnchors);
  }

  render() {
    return (
      <React.Fragment>
        <Rect
          x={this.state.x}
          y={this.state.y}
          ref={ref => { this.shapeRef = ref }}
          width={this.state.width}
          height={this.state.height}
          fill={this.state.fill}
          name={this.props.name}
          draggable={false}
          onClick={this.handleClick}
        />
      </React.Fragment>
    )
  }
}