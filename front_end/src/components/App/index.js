/*Copyright 2019 Evsent

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/
import React, { Component } from "react";
import Login from "../Login";
import SubmitForm from "../Submit_Form";

class App extends Component {
  state = {
    auth_token: ""
  };

  handleTokenChange = auth_token => {
    this.setState({
      auth_token
    });
  };
  render() {
    if (this.state.auth_token.length === 0) {
      return (
        <div>
          <Login handleTokenChange={this.handleTokenChange} />
        </div>
      );
    } else if (this.state.auth_token.length > 5) {
      return (
        <div>
          <SubmitForm auth_token={this.state.auth_token} />
        </div>
      );
    }
  }
}

export default App;
