import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from '../src/containers/Layout/Layout'
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
  //Just for testing that ejecting the interceptors works in withErrorHandler.js
  // state = {
  //   show: true,
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000);
  // }

  render() {
    return (
      <div>
      <Layout>
        <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;