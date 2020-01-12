import React, { Component } from "react";
import "./constraints.css"

export default class Constraints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constraints: []
        };
    }

    elementSelected = (constraints) => {
        this.setState({constraints: constraints});
    }

    render() {
        // const constraints = this.props.constraints.map(item => {
        //     return <tr>{item.toString}</tr>
        //       })

        return (
            <div class="constraints">
                <table>
                    {this.state.constraints.map(constraint => {
                        return (
                            <tr>
                                {constraint.toString()}
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}