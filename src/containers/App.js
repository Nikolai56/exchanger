import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.scss';

const base = "USD";

const rates = {
  GBP: 0.77256,
  EUR: 0.882807
};

const APP_ID = '314315a90b8243d5bb2c1060cd7c738b';
//could be BASE const &base=${BASE}
const URL = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: null };
  }

  asyncFetch = async () => {
    try {
      const response = await fetch(URL);
      if(response.ok){
        return await response.json();
      }
    } catch(error) {
      console.log(error);
    }
  };

  getRates = () => {
    this.asyncFetch().then(
        res => console.log('successfully fetched', res),
        err => console.log(err)
    );
  };

  handleTextChange = e => {
    this.setState({ amount: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="phoneContainer">
            <div className="App-row">
              <div className="App-row__label">{base}</div>
              <div>-<input
                  type="text"
                  onChange={this.handleTextChange}
              /></div>
            </div>
            <div className="App-row">
              <div className="App-row__label">GBP</div>
              <div>+{this.state.amount * rates.GBP}</div>
            </div>
            <div className="App-row">
            <div className="App-row__label">EUR</div>
            <div>+{this.state.amount * rates.EUR}</div>
          </div>
            <div>amount to change {this.state.amount} {this.props.isFetching.toString()}</div>

            <button onClick={this.getRates}>Fetch</button>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.isFetching
});

export default connect(mapStateToProps)(App);
