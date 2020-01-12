import React, { Component } from "react";
import "./toolbar.css"

export default class TopBar extends React.Component {
    render() {
        return (
            <div class="bar">
                <ObjectBar addRect={this.props.addRect} addEllipse={this.props.addEllipse}></ObjectBar>
                <EditBar></EditBar>
            </div>
        )
    }
}

class ObjectBar extends React.Component {
    render() {
        return (
            <div class="object-bar">
                <button class="square-button" 
                    onClick={() => { this.props.addRect(window.innerWidth/5,window.innerHeight/2)}}></button>
                <button class="ellipse-button"
                    onClick={() => { this.props.addEllipse(window.innerWidth/5,window.innerHeight/2)}}></button>
            </div>
        )
    }
}

class EditBar extends React.Component {
    render() {
        return (
            <div class="edit-bar">

            </div>
        )
    }
}