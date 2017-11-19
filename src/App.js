import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import People from "./people/People";
import Films from "./Films/Films"
import Planets from "./planets/Planets";
import Vehicles from "./Vehicles/Vehicles";
import Starships from "./Starships/Starships"
import Species from "./Species/Species"
import RaisedButton  from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {render: ''};
    }
    handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});
    }
    _renderSubComp() {
        switch (this.state.render) {
            case 'People':
                return <People/>;
            case 'Planets':
                return <Planets/>;
            case 'Vehicles':
                return <Vehicles/>;
            case 'Films':
                return <Films/>;
            case 'Species':
                return <Species/>;
            case 'Starships':
                return <Starships/>;
            default:
                return;

        }
    }
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to the Star Wars API</h1>
                    </header>

                    <RaisedButton onClick={this.handleClick.bind(this, 'People')}>People</RaisedButton>
                    <RaisedButton onClick={this.handleClick.bind(this, 'Films')}>Films</RaisedButton>
                    <RaisedButton onClick={this.handleClick.bind(this, 'Vehicles')}>Vehicles</RaisedButton>
                    <RaisedButton onClick={this.handleClick.bind(this, 'Starships')}>Starships</RaisedButton>
                    <RaisedButton onClick={this.handleClick.bind(this, 'Species')}>Species</RaisedButton>
                    <RaisedButton onClick={this.handleClick.bind(this, 'Planets')}>Planets</RaisedButton>
                    {this._renderSubComp()}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;