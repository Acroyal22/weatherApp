import { Component, useImperativeHandle } from "react";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      age: 0,
      purpose: "",
      social: "",
      fullName: "",
    };
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (<>
      <intro fullName={this.state.fullName} />
      <purpose designation={this.state.purpose} />
      <social twitter={this.state.social} />
      <div> i am {this.state.age} years old  </div>
      <div> make the profile yours fill the form below</div>
      <div>
        <label htmlFor='fullName'>FULLNAME</label>
        <input onChange={this.handleInputChange}
          id='fullName'
          type='text'
          name='fullName' />
      </div>
      <div>
        <label htmlFor='social'>Social </label>
        <input onChange={this.handleInputChange}
          id='socail'
          type='text'
          name='social' />
      </div>
      <div>
        <label htmlFor='purpose'>purpose </label>
        <input onChange={this.handleInputChange}
          id='purpose'
          type='text'
          name='pupose'
          placeholder='purpose' />

      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input onChange={this.handleInputChange}
          id='age'
          name='age'
          type='number'
          step='1'
          placeholder='age' />
      </div>
    </>
    );
  }
}
class intro extends Component {
  render() {
    return <div> I am {this.props.fullName}</div>;
  }
}
class purpose extends Component {
  render() {
    return <div> I am {this.props.designation}</div>;
  }
}
class social extends Component {
  render() {
    return <div> you can raech me on twitter @{this.props.twitter}</div>;
  }
}


