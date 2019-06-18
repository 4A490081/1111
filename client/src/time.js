import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Link } from 'react-router-dom'
import {background_rec} from './config'
import {end} from './config'
import './app.css'

var list_q=[];
var list_t=[];
var list_i=[];
var total_t=[];
var count =0;
var len_q =0;

class Time extends React.Component {
  
  constructor(props) {
    super(props);
    //console.log(props.location.state.interviewid);
    
    this.state = { seconds: 120 ,interviewid:props.location.state.interviewid,seconds_think:10};
    
    this.handle_data();
    
  }

  handle_data(){
    var id = this.state.interviewid;
    var data = {"InterviewID":id};
    var json = JSON.stringify(data);
    //console.log(json);
    var request = new XMLHttpRequest();
    request.open('POST', '/request_question');
    request.setRequestHeader('content-type' , 'application/json');
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
          
            var result =JSON.parse(request.response);
            len_q = result['QuestionList'].length;
            //console.log(result['QuestionList'])
            total_t.push(result['TotalTime']);
            for (var i=0;i<len_q;i++)
            {list_q.push(result['QuestionList'][i]['Content']);
            list_t.push(result['QuestionList'][i]['Time']);
            list_i.push(result['QuestionList'][i]['ItemID']);
            }
            //c=list_t[0];
            
            //console.log(list_q);
            //console.log(list_t);
            //document.getElementById("total_time").textContent ='計時' + list_t[0] + '秒';
            
            document.getElementById("questions").append(list_q[0]) ;
            //console.log(result);
            document.getElementById("ifrmid").contentWindow
            .postMessage(
            3,
            background_rec
            );
            
            
        }
    }
    
    
    request.send(json)

  }
  
  componentDidMount() {
    
    
    if (document.getElementById("questions").textContent!=null)
      {
        this.interval = setInterval(() =>this.Timer_think(), 1000);
        
        //console.log(this.state.seconds)
      }
      
     
  }

  componentWillUnmount() {
    
    
  }

  nextquestion(){
    document.getElementById('next').style='display:none';
    document.getElementById("ifrmid").contentWindow
            .postMessage(
              ('interviewid'+this.state.interviewid),
              background_rec
          );
    document.getElementById("ifrmid").contentWindow
            .postMessage(
            list_i[count],
            background_rec
          );
    document.getElementById("ifrmid").contentWindow
            .postMessage(
            2,
            background_rec
      );
    this.setState(state => ({
      seconds_think: 10
    }));
    count = count + 1;
    if (count>=len_q){
      document.getElementById("questions").textContent = '作答完畢' ;
      document.getElementById("next").hidden='true';
      clearInterval(this.interval);
      window.setInterval(("location="+"'"+end+"?aNO="+this.state.interviewid+"'"),1500);
    }else{
      this.setState(state => ({
        seconds: list_t[count]
        }));
      
      clearInterval(this.interval);
      document.getElementById("ifrmid").contentWindow
            .postMessage(
            3,
            background_rec
      );
      this.interval = setInterval(() =>this.Timer_think(), 1000);
      
      document.getElementById("item").textContent= '第'+(count+1)+'題';
      document.getElementById("questions").textContent = list_q[count] ;
    }
    
  }

  Timer_think()
  {
    
    if (this.state.seconds_think==0){
      if(count==(len_q-1))
      {
         
        document.getElementById('next').style='display:inline';
      }else{
        document.getElementById('next').style='display:inline';
      }
      
      clearInterval(this.interval);
      this.interval = setInterval(() =>this.Timer_question(), 1000);
      
    }
    else{
      this.setState(state => ({
        seconds_think: state.seconds_think - 1
      }));
    }
    
  }
  
  Timer_question()
  {
    
    if (this.state.seconds==0){
      
      this.setState(state => ({
        seconds_think: 10
      }));
      
      this.nextquestion();

    }
    else{
      this.setState(state => ({
      seconds: state.seconds - 1
    }));
    };
    
  }
  
  sendIt() {
    // 通过 postMessage 向子窗口发送数据
    document.getElementById("ifrmid").contentWindow
            .postMessage(
            1,
            background_rec
    );
  }

  render() {
    return (
      <div className='div_time'>
          <div className='timer_text'>剩餘秒數  <span className='span_color'>{this.state.seconds}</span></div>
          <div className='span_text'>
          <span >思考時間10秒，10秒後開始錄影（倒數計時120秒）</span>
          </div>
        
        <p id='item' className='time_num'>第1題</p>
        <p id='questions'></p>
        <img src='./img/question_i2a.jpg' height='85%' width='100%' className='img'></img>
        <button className='button2' id='next' hidden='True' onClick={this.nextquestion.bind(this)} >下一題</button>
        <Link to={{pathname:'/end'}}><button className='button2' id='end' hidden='True' onClick={this.nextquestion.bind(this)} >下一題</button></Link>
        <iframe src='/background' frameBorder='0' height='0' width='0' id='ifrmid' name='ifrmname'></iframe>
        
      </div>
    );
  }
}

export {Time}
