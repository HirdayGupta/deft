import React, { Component } from "react";
import "./toolbar.css"
import textboxImage from './icons/textbox.png'
import canvasImage from './icons/canvas.png'

export default class TopBar extends React.Component {
    render() {
        return (
            <div class="bar">
                <ObjectBar addRect={this.props.addRect} addEllipse={this.props.addEllipse} addTextbox={this.props.addTextbox}></ObjectBar>
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
                <button class="text-button" 
                    onClick={() => { this.props.addTextbox(window.innerWidth/5, window.innerHeight/2)}}><img src={textboxImage} height="30" width="30"/></button>
                <button class="canvas-button"><img src={canvasImage} height="30" width="30" /></button>
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