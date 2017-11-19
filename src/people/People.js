import  React, { Component }  from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './People.css';




class People extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.state = {person: ''};
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
                        person: res
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
        this.fetchData("https://swapi.co/api/people/");



    }
    render(){
        if(!this.state.person){
            if(!this.state.data)return <p>loading People..</p>
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
                            onClick={()=>{this.fetchPerson("https://swapi.co/api/people/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    <div id="People">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            {this.state.data.results.map((item, index) => (
                                <div>
                                    <Card className="Person"
                                          onClick={()=>{this.fetchPerson("https://swapi.co/api/people/?search="+ item.name)}}>
                                        <CardTitle
                                            title={item.name}
                                            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                                        <CardText style={{textAlign: 'left'}}>
                                            ID: {index+1}<br/>
                                            Height: {item.height}<br/>
                                            Mass: {item.mass}<br/>
                                            Hair Colour: {item.hair_color}<br/>
                                            Skin Colour: {item.skin_color}<br/>
                                            Birth Year: {item.birth_year}<br/>
                                            Gender: {item.gender}<br/>
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
                    {this.state.person.results.map((item, index) => (
                        <Card className="Person1">
                            <CardTitle
                                title={item.name}
                                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                           <CardText style={{textAlign: 'left'}}>
                                Height: {item.height}<br/>
                                Mass: {item.mass}<br/>
                                Hair Colour: {item.hair_color}<br/>
                                Skin Colour: {item.skin_color}<br/>
                                Birth Year: {item.birth_year}<br/>
                                Gender: {item.gender}<br/><br/>
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
                                Species:
                               {item.species.map((item, index) => (
                                   <div>
                                       &nbsp;&nbsp;&nbsp;
                                       {item}
                                   </div>

                               ))}<br/>
                                Vehicles:
                                {item.vehicles.map((item, index) => (
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        {item}
                                    </div>

                                ))}<br/>
                                Starships:
                                {item.starships.map((item, index) => (
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        {item}
                                    </div>

                                ))}
                            </CardText>
                        </Card>
                    ))}
                </MuiThemeProvider>
            </div>)
    }
}


export default People;