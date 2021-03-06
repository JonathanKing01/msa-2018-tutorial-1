import * as React from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Grid from '@material-ui/core/Grid'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

interface IState {
    imageFiles: any[],
    results: any,
    synonyms: any,
    value: any,
    loading: any,
}


export default class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
            this.state = {
            imageFiles: [],
            synonyms: "",
            results: "",
            value: "",
            loading: false,
        }
        this.define = this.define.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public upload(base64String: string) {
        fetch('https://danktrigger.azurewebsites.net/api/dank', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            file: base64String,
          })
        })
        .then((response : any) => {
          if (!response.ok) {
            this.setState({results: response.statusText})
          }
          else {
            response.json().then((data:any) => this.setState({results: data[0].class}))
          }
          return response
        })
    }

    public define(event:any) {
        this.setState({loading: true});
      
        this.setState({value: event.target.value});
        fetch('https://wordsapiv1.p.mashape.com/words/' + this.state.value , {
          method: 'GET',
          headers: {
            'Content-Type':'text/plain',
            'Accept': 'application/json',  
            'X-Mashape-Key': 'venhULObjymsh2WWCQzEjbkpdSf1p12ULoWjsn05seHArOaUnz',
            'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
          }
        })
        .then((response : any) => {
          if (!response.ok) {
            this.setState({results: response.statusText})
          }
          else {
            response.json().then((data:any) => this.setState({
              results: "Definition: " + data["results"][0]["definition"]
            }));
            this.setState({loading: false});


          }
        })
    }

    handleChange(event:any) {
      this.setState({value: event.target.value});
    }

    public render() {

        return (
          <div >
          <AppBar position="static">
            <Toolbar>
                  <Typography variant="display2" color="inherit">
                    <Link style={{color: "white"}} to="/">Dictionary</Link>
                    <Link to="/Thesaurus"> Thesaurus </Link>
                  </Typography>
              </Toolbar>
          </AppBar>

          <div className="centrePanel">
            <div className="centreText">
                  <div className="textField">
                  <TextField
                    id="outlined-name"
                    label="Word"
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                  />
                  </div>
                  <button onClick={this.define}>
                    Define
                  </button>
              <div  className="dank">
              {
                this.state.loading===true?
                <CircularProgress thickness={3} /> :
                this.state.results===""?
                <p>Enter a word to get a dictionary definition for</p> :
                <p>
                  <Paper>
                    <Grid container wrap="nowrap" spacing={16} >
                      <Grid xs={12} sm container justify="center" alignItems="center">
                        <Typography 
                          variant="display1" gutterBottom 
                          style={{ margin: 200 }}>
                          {this.state.results}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </p>
              }
              </div>
            </div>
          </div>
          </div>
        );
      }

    
}
