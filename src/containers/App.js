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

class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { amount: 100 };
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

  componentDidMount() {
    // this.handleFetchRates();
    this.timeInterval = setInterval(() => {
      console.log('time to Refetch rates');
      // this.handleFetchRates();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  handleFetchRates = () => {
    this.props.dispatch(fetchRates());
  };

  handleTextChange = e => {
    this.setState({ amount: e.target.value });
  };

  render() {
    const { data: { rates, base }, isLoading } = this.props;
    console.log('props data', this.props.data);

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
                value={this.state.amount}
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
            <button onClick={this.handleFetchRates}>Fetch Saga</button>
            {isLoading && <div>Loading...</div>}
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
