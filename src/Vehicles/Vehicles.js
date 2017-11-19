import  React, { Component }  from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './Vehicles.css';




class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.state = {vehicle: ''};
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

    fetchVehicle(url){
        if(url) {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        vehicle: res
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
        this.fetchData("https://swapi.co/api/vehicles/");



    }
    render(){
        if(!this.state.vehicle){
            if(!this.state.data)return <p>loading Vehicles..</p>
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
                            onClick={()=>{this.fetchVehicle("https://swapi.co/api/vehicles/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    <div id="Vehicles">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            {this.state.data.results.map((item, index) => (
                                <div>
                                    <Card className="Vehicle"
                                          onClick={()=>{this.fetchVehicle("https://swapi.co/api/vehicles/?search=" + item.name)}}>
                                        <CardTitle
                                            title={item.name}
                                            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                                        <CardText style={{textAlign: 'left'}}>
                                            model: {item.model}<br/>
                                            manufacturer: {item.manufacturer}<br/>
                                            manufacturer: {item.manufacturer}<br/>
                                            cost_in_credits: {item.cost_in_credits}<br/>
                                            length: {item.length}<br/>
                                            max_atmosphering_speed: {item.max_atmosphering_speed}<br/>
                                            crew: {item.crew}<br/>
                                            passengers: {item.passengers}<br/>
                                            cargo_capacity: {item.cargo_capacity}<br/>
                                            consumables: {item.consumables}<br/>
                                            vehicle_class: {item.vehicle_class}<br/>
                                            pilots: {item.pilots}<br/>
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
                            onClick={()=>{this.fetchVehicle("https://swapi.co/api/vehicles/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    {this.state.vehicle.results.map((item, index) => (
                        <Card className="Vehicle1">
                            <CardTitle
                                title={item.name}
                                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>
    
                            <CardText style={{textAlign: 'left'}}>
                                model: {item.model}<br/>
                                manufacturer: {item.manufacturer}<br/>
                                manufacturer: {item.manufacturer}<br/>
                                cost_in_credits: {item.cost_in_credits}<br/>
                                length: {item.length}<br/>
                                max_atmosphering_speed: {item.max_atmosphering_speed}<br/>
                                crew: {item.crew}<br/>
                                passengers: {item.passengers}<br/>
                                cargo_capacity: {item.cargo_capacity}<br/>
                                consumables: {item.consumables}<br/>
                                vehicle_class: {item.vehicle_class}<br/>
                                Pilots:
                                {item.pilots.map((item, index) => (
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        {item}
                                    </div>
    
                                ))}<br/>
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
                            </CardText>
                        </Card>
                    ))}
                </MuiThemeProvider>
            </div>)
    }
}


export default Vehicles;