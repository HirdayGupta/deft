import React, { Component } from "react";
import "./constraints_editor.css"

export default class Constraints_Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ClickedButton1: "",  ClickedButton2: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id) {
        this.setState({ ClickedButton1: id });
        this.props.selectFirstAnchor(id);
    }

    handleSecondChange(id) {
        this.setState({ ClickedButton2: id });
        this.props.selectSecondAnchor(id);
    }

    updateSuggestedValue(num) {
        var input = document.getElementById('value');
        input.setAttribute('value', num);
    }

    didSubmitConstraint = () => {
        var element = document.getElementById('value');
        this.props.submitConstraint(element.value);
        this.setState({ ClickedButton1: "", ClickedButton2: "" });
        element.setAttribute('value','');
    }

    render() {
        return (
            <div class="constraints-editor">
                <div>
                    <button style={this.state.ClickedButton1 === "L" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => {this.handleChange("L")}}>L</button>
                    <button style={this.state.ClickedButton1 === "R" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleChange("R") }}>R</button>
                    <button style={this.state.ClickedButton1 === "T" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleChange("T") }}>T</button>
                    <button style={this.state.ClickedButton1 === "B" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleChange("B") }}>B</button>
                    <button style={this.state.ClickedButton1 === "H" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleChange("H") }}>H</button>
                    <button style={this.state.ClickedButton1 === "W" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleChange("W") }}>W</button>
                </div>
                <div>
                    <button style={this.state.ClickedButton2 === "L" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleSecondChange("L") }}>L</button>
                    <button style={this.state.ClickedButton2 === "R" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleSecondChange("R") }}>R</button>
                    <button style={this.state.ClickedButton2 === "T" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleSecondChange("T") }}>T</button>
                    <button style={this.state.ClickedButton2 === "B" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleSecondChange("B") }}>B</button>
                    <button style={this.state.ClickedButton2 === "H" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleSecondChange("H") }}>H</button>
                    <button style={this.state.ClickedButton2 === "W" ? { backgroundColor: "yellow" } : { backgroundColor: "white" }} class="constraint-button" onClick={() => { this.handleSecondChange("W") }}>W</button>
                </div>
                <div class="submission">
                    <input type="number" id="value" name="value" size="5" />
                    <input type="submit" id="submit" name="submit" size="5" onClick={this.didSubmitConstraint}/>
                </div>
            </div>
        )
    }
}