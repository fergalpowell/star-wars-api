import  React, { Component }  from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './Planets.css';




class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.state = {planet: ''};
        this.state = {filmName: []};
    }

    fetchFilmName(url){
        if(url) {
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    if(result.title) {
                        if(!this.state.filmName.some(item => result.title === item))
                        {
                            this.setState({
                                filmName: [...this.state.filmName.concat(result.title)]
                            })
                        }
                    }
                })
        }
    }

    fetchPlanet(url){
        if(url) {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        planet: res
                    })
                })
        }
    }

    fetchData(url) {
        if(url){
            fetch(url)
                .then(d => d.json())
                .then(d => {
                    this.setState({
                        data: d
                    })
                })
        }
    }

    componentDidMount(){
        this.fetchData("https://swapi.co/api/planets/");



    }
    render(){
        if(!this.state.planet){
            if(!this.state.data)return <p>loading Planets..</p>
            return(
                <div>
                    <MuiThemeProvider>
                        <TextField
                            hintText="Luke Skywalker"
                            floatingLabelText="Search Characters"
                            ref="search"
                        />
                        &nbsp;&nbsp;
                        <RaisedButton
                            label={"search"}
                            onClick={()=>{this.fetchPerson("https://swapi.co/api/planets/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    <div id="Planets">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            {this.state.data.results.map((item, index) => (
                                <div>
                                    <Card className="Planet"
                                          onClick={()=>{this.fetchPerson("https://swapi.co/api/planets/?search=" + item.name)}}>
                                        <CardTitle
                                            title={item.name}
                                            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                                        <CardText style={{textAlign: 'left'}}>
                                            rotation_period: {item.rotation_period}<br/>
                                            orbital_period: {item.orbital_period}<br/>
                                            diameter: {item.diameter}<br/>
                                            climate: {item.climate}<br/>
                                            gravity: {item.gravity}<br/>
                                            terrain: {item.terrain}<br/>
                                        </CardText>
                                    </Card>
                                </div>
                            ))}
                        </MuiThemeProvider>
                    </div>
                    <RaisedButton
                        onClick={() => this.fetchData(this.state.data.next)}
                        label="Next"
                        style={{position: "fixed"}}/>
                </div>
            )
        }

        return(
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <MuiThemeProvider>
                        <TextField
                            hintText="Luke Skywalker"
                            floatingLabelText="Search Characters"
                            ref="search"
                        />
                        &nbsp;&nbsp;
                        <RaisedButton
                            label={"search"}
                            onClick={()=>{this.fetchPerson("https://swapi.co/api/starship/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    {this.state.planet.results.map((item, index) => (
                        <Card className="Planet1"
                              style={{marginLeft: "auto", marginRight: "auto"}}>
                            <CardTitle
                                title={item.name}
                                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>
    
                            <CardText style={{textAlign: 'left'}}>
                                rotation_period: {item.rotation_period}<br/>
                                orbital_period: {item.orbital_period}<br/>
                                diameter: {item.diameter}<br/>
                                climate: {item.climate}<br/>
                                gravity: {item.gravity}<br/>
                                terrain: {item.terrain}<br/><br/>
                                Films:<br/>
                                {
                                    item.films.map((item, index) => (
                                        this.fetchFilmName(item)
                                    ))
                                }
                                {

                                    this.state.filmName.map((item, index) => (
                                        <div>
                                            &nbsp;&nbsp;&nbsp;
                                            {item}
                                        </div>
                                    ))
                                }
                                <br/>
                                Residents:
                                {item.residents.map((item, index) => (
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        {item}
                                    </div>
    
                                ))}<br/>
                            </CardText>
                        </Card>
                    ))}
                </MuiThemeProvider>
            </div>)
    }
}


export default Planets;