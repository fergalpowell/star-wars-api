import  React, { Component }  from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import './Species.css';




class Species extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.state = {species: ''};
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
                        species: res
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
        this.fetchData("https://swapi.co/api/species/");



    }
    render(){
        if(!this.state.species){
            if(!this.state.data)return <p>loading Species..</p>
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
                            onClick={()=>{this.fetchPerson("https://swapi.co/api/species/?search=" + this.refs.search.getValue())}}/>
                    </MuiThemeProvider>
                    <div id="Species">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            {this.state.data.results.map((item, index) => (
                                <div>
                                    <Card className="Species1"
                                          onClick={()=>{this.fetchPerson("https://swapi.co/api/species/?search=" + item.name)}}>
                                        <CardTitle
                                            title={item.name}
                                            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>

                                        <CardText style={{textAlign: 'left'}}>
                                            classification: {item.classification}<br/>
                                            designation: {item.designation}<br/>
                                            average_height: {item.average_height}<br/>
                                            skin_colors: {item.skin_colors}<br/>
                                            hair_colors: {item.hair_colors}<br/>
                                            eye_colors: {item.eye_colors}<br/>
                                            average_lifespan: {item.average_lifespan}<br/>
                                            language: {item.language}<br/>
                                            homeworld: {item.homeworld}
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
                    {this.state.species.results.map((item, index) => (
                        <Card className="Species2"
                              style={{marginLeft: "auto", marginRight: "auto"}}>
                            <CardTitle
                                title={item.name}
                                style={{backgroundColor: 'rgba(0,0,0,0.9)'}}/>
    
                            <CardText style={{textAlign: 'left'}}>
                                classification: {item.classification}<br/>
                                designation: {item.designation}<br/>
                                average_height: {item.average_height}<br/>
                                skin_colors: {item.skin_colors}<br/>
                                hair_colors: {item.hair_colors}<br/>
                                eye_colors: {item.eye_colors}<br/>
                                average_lifespan: {item.average_lifespan}<br/>
                                language: {item.language}<br/>
                                homeworld: {item.homeworld}<br/>
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
                                }<br/>
                                People:
                                {item.people.map((item, index) => (
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


export default Species;