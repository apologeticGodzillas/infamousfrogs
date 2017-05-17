import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: -20,
    marginLeft: 50,
    width: 150
  },
};



class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalIsOpen2: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.userChange = this.userChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.formSubmit2 = this.formSubmit2.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  openModal2() {
    this.setState({modalIsOpen2: true});
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({modalIsOpen2: false});
  }

  passwordChange(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  userChange(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  }

  formSubmit(e) {
    e.preventDefault();
    var obj = {
      username: this.state.username,
      password: this.state.password
    };
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/login',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      dataType: 'text',
      success: (data) => {
        data = JSON.parse(data);
        if (data.id) {
          self.props.handleLogin(data);
          self.setState({user: data});
          self.closeModal();
        } else if (data.userdoesnotexist) {
          alert('User does not exist! Try again!');
        } else if (data.incorrectpassword) {
          alert('Password is Incorrect! Try again!');
        }
      }
    });

  }

  formSubmit2(e) {
    e.preventDefault();
    var obj = {
      username: this.state.username,
      password: this.state.password
    };
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/register',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      dataType: 'text',
      success: (data) => {
        data = JSON.parse(data);
        if (data.id) {
          self.props.handleLogin(data);
          self.setState({user: data});
          self.closeModal();
        } else if (data.useralreadyexists) {
          alert('User already exists! Try another username!');
        }
      }
    });
  }

  logOut() {
    $.ajax({
      type: 'DELETE',
      url: '/logout',
      success: (data) => {
        console.log('successfully logged out');
      },
      error: (data) => {
        console.log('error logging out');
      }
    });
  }

  render() {
    let userMessage;
    let formType;
    if (this.props.user) {
      userMessage = (
        `Welcome ${this.props.user.username}!`
      );
    } else {
      userMessage = (
        'Log in to customize your favorites!'
      );
    }

    return (
     <MuiThemeProvider>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <h3 className="app-name"> Simply Recipes </h3>
          </div>
          <p className="navbar-text navbar-center centerTitle"> {userMessage} </p>
          <div className="btn-group pull-right logButton">
            {this.props.user ?
              <RaisedButton label="Log Out" onClick={this.props.handleLogout} role="button"> </RaisedButton> :
              <div>
                <RaisedButton label="Sign Up" onClick = {this.openModal2} role="button"> </RaisedButton>
                <RaisedButton label="Log In" onClick = {this.openModal} role="button"> </RaisedButton>
              </div>
            }
          </div>
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Modal"
            >
            <div className="container">
                <div className="row">
                <div className="span12">
                  <div className="form-horizontal">
                    <fieldset>
                      <div id="legend">
                        <legend className="">Login</legend>
                      </div>
                      <div className="control-group">
                        <label className="control-label" htmlFor="username">Username</label>
                        <div className="controls">
                          <input onChange = {this.userChange} type="text" id="username" name="username" placeholder="" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" htmlFor="password">Password</label>
                        <div className="controls">
                          <input onChange = {this.passwordChange} type="password" id="password" name="password" placeholder="" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <RaisedButton className="submitButton" label="Login" onClick = {this.formSubmit}></RaisedButton>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            </Modal>
            <Modal
                isOpen={this.state.modalIsOpen2}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Modal"
              >
              <div className="container">
                  <div className="row">
                  <div className="span12">
                    <div className="form-horizontal">
                      <fieldset>
                        <div id="legend">
                          <legend className="">Sign Up</legend>
                          <p>Sign up now for access to thousands of recipes!</p>
                        </div>
                        <div className="control-group">
                          <label className="control-label" htmlFor="username">Username</label>
                          <div className="controls">
                            <input onChange = {this.userChange} type="text" id="username" name="username" placeholder="" className="input-xlarge" />
                          </div>
                        </div>
                        <div className="control-group">
                          <label className="control-label" htmlFor="password">Password</label>
                          <div className="controls">
                            <input onChange = {this.passwordChange} type="password" id="password" name="password" placeholder="" className="input-xlarge" />
                          </div>
                        </div>

                        { /******* JEE ADDED FEATURE ******/ }
                          <label class="checkbox">
                              Any food allergies we should know about?
                          </label>
                          <div style={{display: 'flex', flexDirection: 'row'}}>   
                            <div><Checkbox style={styles.checkbox} label='Peanuts'  type="checkbox" value="ingredient1"/></div> <br/>
                            <div><Checkbox style={styles.checkbox} label='Tree Nuts'  type="checkbox" value="ingredient1"/></div> <br/>
                            <div><Checkbox style={styles.checkbox} label='Dairy'  type="checkbox" value="ingredient1"/></div> <br/>
                            <div><Checkbox style={styles.checkbox} label='Eggs'  type="checkbox" value="ingredient1"/></div> <br/>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div><Checkbox style={styles.checkbox} label='Wheat'  type="checkbox" value="ingredient1"/></div> <br/>
                            <div><Checkbox style={styles.checkbox} label='Soy'  type="checkbox" value="ingredient1"/></div> <br/>
                            <div><Checkbox style={styles.checkbox} label='Fish'  type="checkbox" value="ingredient1"/></div> <br/>
                            <div><Checkbox style={styles.checkbox} label='Shell'  type="checkbox" value="ingredient1"/></div> <br/>
                          </div>
                          <br/>
                        { /******* END OF JEE ADDED FEATURE ******/ }

                        <div className="control-group">
                          <div className="controls">
                            <RaisedButton label="Sign Up" onClick = {this.formSubmit2}></RaisedButton>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              </Modal>
        </div>
      </nav>
     </MuiThemeProvider>
    );
  }
}

export default Nav;
