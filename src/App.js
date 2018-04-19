import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      disclaimer: "",
      bpi: {},
      time: "",
      chartName: "",
      select: "USD"
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((data) => {
        const info = data;
        this.setState({
          disclaimer: info.data.disclaimer,
          bpi: info.data.bpi,
          time: info.data.time.updated,
          chartName: info.data.chartName
        })
    })   
  }
  handleClick(e) {
    this.setState({
        select: e.target.value
    })
    
  }
  buttonRender() {
    const buttonArray = ['USD', 'EUR', 'GBP'];
    return(
      buttonArray.map((item, i) => {
        return(
          <button key={i} onClick={this.handleClick} value={item}>{item}</button>
        );
      })
    );
  }
  render() {
    let buttons = this.buttonRender();
    let type = this.state.select;
    return(
      <div className="wrapper" >
          <div>{buttons}</div>
          <h1>{this.state.chartName}</h1>
          <h2>{type}</h2>
          <h2>{this.state.bpi[type]? this.state.bpi[type].rate: false}</h2>
          <p>{this.state.time}</p> 
          <p style={{textAlign:"center"}}>{this.state.disclaimer}</p>  
      </div>
    );
  }
}

export default App;
