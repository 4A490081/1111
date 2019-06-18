import React, { Component } from 'react'
import { render } from 'react-dom'
import { Redirect } from 'react-router'
import ScriptTag from 'react-script-tag';
import { HashRouter, Route, Link } from 'react-router-dom'

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interviewid:props.location.state.interviewid};
    
  }

  render(){
    return(
      
      <div className='div_device'>
        <div className='timer_text'>環境測試</div>
        <p></p>
        
        <div >
        <video id="gum" playsinline autoPlay muted height='300px' width='400px' className='video1'></video>
        <video id="recorded" autoPlay loop height='300px' width='400px' controls></video>
        </div>
    <div>
        <button id="start" hidden='true'>Start camera</button>
        <button id="record"  className='button5'>開始錄影</button>
        <button id="play" className='button6' >播放</button>
        <Link to={{pathname:'/time',state:{interviewid:this.state.interviewid}}}><button id='add_id' display='block' className='button7'>開始作答</button></Link>
        <button id="download" disabled hidden='true'>Download</button>
    </div>
    <div>
        
      <input type="checkbox" id="echoCancellation" hidden='true'></input>
    </div>
        
        
        <ScriptTag src="https://webrtc.github.io/adapter/adapter-latest.js"></ScriptTag>
        <ScriptTag src="./main.js" async></ScriptTag>
        <ScriptTag src="./ga.js"></ScriptTag>
        
        
        
    </div>
        
    );
  }
  
}

export {Test}
