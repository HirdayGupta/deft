import React, { Component } from "react";
import "./swift-code.css"

export default class SwiftCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        };
    }

    render() {
        console.log("REACHED");
        return (
            <div class="swift">
                {
                    this.props.translateToSwift()
                }
            </div>
        )
    }
}