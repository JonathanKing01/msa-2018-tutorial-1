import * as React from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';  

interface IState {
    imageFiles: any[],
    results: any,
    value: any,
    dropzone: any
}



export default class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
            this.state = {
            imageFiles: [],
            results: "",
            value: "",
            dropzone: this.onDrop.bind(this),
        }
        this.define = this.define.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public onDrop(files: any) {
        this.setState({
          imageFiles: files,
          results: ""
        })
        const file = files[0]
        const reader = new FileReader();
        reader.onload = (readerEvt) => {
            const binaryString = readerEvt.target!!.result;
            this.upload(btoa(binaryString))
        };
    
        reader.readAsBinaryString(file);
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
            response.json().then((data:any) => this.setState({results: "Definition: " + data["results"][0]["definition"]}));
           


          }
        })
    }

    handleChange(event:any) {
      this.setState({value: event.target.value});
    }

    public render() {
        return (
          <div className="container-fluid">
            <div className="centreText">
                  Word:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                  <button onClick={this.define}>
                    Define
                  </button>
              <div  className="dank">
              {
                this.state.results === ""?
                <CircularProgress thickness={3} /> :
                <p>{this.state.results}</p>
              }
              </div>
            </div>
          </div>
        );
      }

    
}
