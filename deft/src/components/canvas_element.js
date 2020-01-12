import React, { Component } from "react";
import { Rect } from "react-konva";

export default class CanvasElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: props.x,
            y: props.y,
            width: 330,
            height: 586,
            fill: "#E3E3E3"
        };
    }

    componentDidMount() {
        console.log("MOVED TO BOTTOM");
        this.shapeRef.moveToBottom();
    }

    getType = () => {
      return "CanvasElement";
    }

    handleDragEnd = (e) => {
        this.setState({
            x: e.target.x(),
            y: e.target.y()
        });
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