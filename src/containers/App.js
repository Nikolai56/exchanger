// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRates } from '../actions';
import '../App.scss';

type Props = {
  data: Object,
  dispatch: (action: () => any) => void,
  isLoading: boolean,
};

type State = {
  amount: number,
};

const APP_ID = '314315a90b8243d5bb2c1060cd7c738b';
//could be BASE const &base=${BASE}
const URL = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`;

class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { amount: 0 };
  }

  static defaultProps = {
    data: {
      base: 'USD',
      rates: {
        GBP: 0.77256,
        EUR: 0.882807,
      }
    }
  };

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

  handleFetchRates = () => {
    this.props.dispatch(fetchRates());
  };

  handleTextChange = e => {
    this.setState({ amount: e.target.value });
  };

  render() {
    const { data: { rates, base } } = this.props;
    console.log('props data', rates);

    return (
      <div className="App">
        <header className="App-header">
          <div className="phoneContainer">
            <div className="App-row">
              <div className="App-row__label">{base}</div>
              <div>-<input
                type="number"
                className="input"
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
            <button onClick={this.getRates}>Fetch</button>
            <button onClick={this.handleFetchRates}>Fetch Saga</button>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  data: state.data,
});

export default connect(mapStateToProps)(App);
