import React, { Component } from 'react'
import { render } from 'react-dom'
import { Redirect } from 'react-router'
import { HashRouter, Route, Link } from 'react-router-dom'
import './app.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkid =  this.checkid.bind(this);
  }

  componentDidMount() {
  
    
    document.getElementById('check_text').style='display:none';
    document.getElementById('add_id').style='display:none';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }
  
  checkid(){
    var id = this.state.value;
    var data = {"InterviewID":id};
    var json = JSON.stringify(data);
    //console.log(json);
    
    var request = new XMLHttpRequest();
    request.open('POST', '/checkid');
    request.setRequestHeader('content-type' , 'application/json');
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
          var result =JSON.parse(request.response);
          //console.log(result);
          if (request.response===JSON.stringify({InterviewID: 0})){
            document.getElementById('check_text').style='display:block';
          }
          else{
            document.getElementById('add_id').click();
          }
        }
        
    }
    
    request.send(json)
  }

  render() {
    return (
      
      <div className='div'>
        <div>
          <table width='795px'  className='t1'>
            <tr align="center" className='tr'>
              <td width='70%' className='td'>
              面試說明
              </td>
              <td width='30%' className='td'>
              請輸入面試代碼
              </td>
            </tr>
            <tr align="center">
              <td width='70%' className='td'>
                本場面試共計10題問答題，進行環境偵測後開始面試，每題題目出來10秒後開始錄影，每題作答時間最長為「兩分鐘」，若已回答完畢可提早進行下一題，注意本面試過程無法中斷，確認一切就緒後，再開始您的面試，預祝您面試順利。
              </td>
              <td align="center">
                <input id="new-todo" type="text" onChange={this.handleChange} value={this.state.value} display='block' className='input'/>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <div >
                  <img src='./img/ai_i2a.png' height='87%' width='100%'></img>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <div>
                  <button id='check' display='none' className="button1" onClick={this.checkid}>進入面試</button>
                  <Link to={{pathname:'/device',state:{interviewid:this.state.value}}}><button id='add_id' display='none' className="button1">進入面試</button></Link>
                </div>
                <div id='check_text'>
                  無此面試代碼，請重新輸入
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

    );
  }

  
}

export {App}
