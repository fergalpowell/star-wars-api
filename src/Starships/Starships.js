import  React, { Component }  from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './Starships.css';




class Starships extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.state = {starship: ''};
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

    fetchPerson(url){
        if(url) {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        starship: res
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
        this.fetchData("https://swapi.co/api/starships/");



    }
    render(){
        if(!this.state.starship){
            if(!this.state.data)return <p>loading Starships..</p>
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
                            onClick={()=>{this.fetchPerson("https://swapi.co/api/starships/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    <div id="Starships">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            {this.state.data.results.map((item, index) => (
                                <div>
                                    <Card className="Starship"
                                          onClick={()=>{this.fetchPerson("https://swapi.co/api/starships/?search=" + item.name)}}>
                                        <CardTitle
                                            title={item.name}
                                            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                                        <CardText style={{textAlign: 'left'}}>
                                            model: {item.model}<br/>
                                            manufacturer: {item.manufacturer}<br/>
                                            cost_in_credits: {item.cost_in_credits}<br/>
                                            length: {item.length}<br/>
                                            max_atmosphering_speed: {item.max_atmosphering_speed}<br/>
                                            crew: {item.crew}<br/>
                                            passengers: {item.passengers}<br/>
                                            cargo_capacity: {item.cargo_capacity}<br/>
                                            consumables: {item.consumables}<br/>
                                            hyperdrive_rating: {item.hyperdrive_rating}<br/>
                                            MGLT: {item.MGLT}<br/>
                                            starship_class: {item.starship_class}<br/>

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
                            onClick={()=>{this.fetchPerson("https://swapi.co/api/starships/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    {this.state.starship.results.map((item, index) => (
                        <Card className="Starship1">
                            <CardTitle
                                title={item.name}
                                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>
    
                            <CardText style={{textAlign: 'left'}}>
                                model: {item.model}<br/>
                                manufacturer: {item.manufacturer}<br/>
                                cost_in_credits: {item.cost_in_credits}<br/>
                                length: {item.length}<br/>
                                max_atmosphering_speed: {item.max_atmosphering_speed}<br/>
                                crew: {item.crew}<br/>
                                passengers: {item.passengers}<br/>
                                cargo_capacity: {item.cargo_capacity}<br/>
                                consumables: {item.consumables}<br/>
                                hyperdrive_rating: {item.hyperdrive_rating}<br/>
                                MGLT: {item.MGLT}<br/>
                                starship_class: {item.starship_class}<br/>
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
                                Pilots:
                                {item.pilots.map((item, index) => (
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


export default Starships;