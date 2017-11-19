import  React, { Component }  from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './Films.css';




class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.state = {film: ''};
        this.state = {characters: []};
    }

    fetchCharacterName(url){
        if(url) {
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    if(result.name) {
                        if(!this.state.characters.some(item => result.name === item))
                        {
                            this.setState({
                                characters: [...this.state.characters, result.name]
                            })
                        }
                    }
                })
        }
    }

    fetchFilm(url){
        if(url) {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        film: res
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
        this.fetchData("https://swapi.co/api/films/");



    }
    render(){
        if(!this.state.film){
            if(!this.state.data)return <p>loading Films..</p>
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
                            onClick={()=>{this.fetchFilm("https://swapi.co/api/films/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    <div id="Films">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            {this.state.data.results.map((item, index) => (
                                <div>
                                    <Card className="Film"
                                          onClick={()=>{this.fetchFilm("https://swapi.co/api/films/?search=" + item.title)}}>
                                        <CardTitle
                                            title={item.title}
                                            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                                        <CardText style={{textAlign: 'left'}}>
                                            episode_id: {item.episode_id}<br/>
                                            opening_crawl {item.opening_crawl}<br/>
                                            director: {item.director}<br/>
                                            producer: {item.producer}<br/>
                                            release_date: {item.release_date}<br/>
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
                            onClick={()=>{this.fetchFilm("https://swapi.co/api/films/?search=" +
                                this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    {this.state.film.results.map((item, index) => (
                        <Card className="Film1">
                            <CardTitle
                                title={item.title}
                                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                            <CardText style={{textAlign: 'left',
                                maxHeight: 200, overflow: 'auto'}}>
                                episode_id: {item.episode_id}<br/>
                                director: {item.director}<br/>
                                producer: {item.producer}<br/>
                                release_date: {item.release_date}<br/><br/>
                                opening_crawl:
                                <br/>{item.opening_crawl}<br/><br/>
                                Characters:
                                {
                                    item.characters.map((item, index) => (
                                        this.fetchCharacterName(item)
                                    ))
                                }
                                {

                                    this.state.characters.map((item, index) => (
                                        <div>
                                            &nbsp;&nbsp;&nbsp;
                                            {item}
                                        </div>
                                    ))
                                }
                                Planets:
                                {item.planets.map((item, index) => (
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        {item}
                                    </div>

                                ))}<br/>
                                StarShips:
                                {item.starships.map((item, index) => (
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

                                ))}
                                Species:
                                {item.species.map((item, index) => (
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


export default Films;