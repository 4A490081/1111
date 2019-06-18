import React, { Component } from 'react'
import { render } from 'react-dom'
import { Redirect } from 'react-router'
import ScriptTag from 'react-script-tag';
import { HashRouter, Route, Link } from 'react-router-dom'

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interviewid:props.location.state.interviewid};
    
  }

  render(){
    return(
      <div className='div_device'>
        <video id="video" autoPlay muted className='video' height='350px' width='500px'></video>
        
        <div className='div_select'>
        <div class="select" >
          <label for="audioSource" className='device_text'>請選擇麥克風：</label><p></p>
          <select id="audioSource" className='select'></select>
        </div>

        <div class="select" hidden='true'>
          <label for="audioOutput">請選擇麥克風：</label><select id="audioOutput"></select>
        </div>
        <p></p>
        <div class="select" className='div_select'>
          <label for="videoSource" className='device_text'>請選擇相機：</label><p></p>
          <select id="videoSource" className='select'></select>
        </div>
        </div>
        
        <Link to={{pathname:'/test',state:{interviewid:this.state.interviewid}}}><button id='add_id' display='block' className='button3'>環境測試</button></Link>
        <ScriptTag src="https://webrtc.github.io/adapter/adapter-latest.js"></ScriptTag>
        <ScriptTag src="./ga.js" async></ScriptTag>
        <ScriptTag src="./record.js"></ScriptTag>
    </div>
        
    );
  }
  
}

export {Device}
