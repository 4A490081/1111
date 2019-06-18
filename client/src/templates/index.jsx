class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 60 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() =>this.D(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  D()
  {
    if (this.state.seconds==0){
      this.setState(state => ({
      seconds: 60
    }));
    }
    else{
      this.setState(state => ({
      seconds: state.seconds - 1
    }));
    };
  }


  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
        <button onClick={this.componentWillUnmount.bind(this)} >暫停計時</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
);
