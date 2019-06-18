import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Link } from 'react-router-dom'
import {Time} from './time'
import {App} from './app'
import ReactDOM from "react-dom"
import {Device} from './device'
import {Test} from './test'
import {End} from './end'


class Main extends React.Component {
  render() {
      return (
          <HashRouter>
              <div>
                  {/*路徑指定/代表根目錄，所以預設就會渲染Home組件，
                  而後方有/about的話會渲染About*/}
                  <Route exact path="/" component={App} />
                  <Route  path="/time" component={Time} />
                  <Route  path="/device" component={Device} />
                  <Route  path="/test" component={Test} />
                  <Route  path="/end" component={End} />
              </div>
          </HashRouter>
      )
  }
}  

ReactDOM.render(
  <Main />
,document.getElementById('app'));