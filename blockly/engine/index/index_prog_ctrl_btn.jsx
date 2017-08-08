var React = require('react');
var ReactDOM = require('react-dom');
var programRunner = require('../common/program/program_runner');
var programManager = require('../common/program/program_manager');
var ubtBlocklyUtils = require('../common/utils/blockly_utils');
var eventsListener = require('../common/events_listener');
var InteractiveMethod = require('../../project/ionicPopup/common/interactive_methods');
var CourseStory = require('../test/course_story.jsx');
var RobatCommand = require('../service/robat_command');
var blocklyDatas = require('../service/blockly_datas');
var codeLanguage = require('../common/program/program_init');
var Background = require('./index_prog_background.jsx');
var $ = require('jquery');
var _ = require('lodash');
var SensorCondition = require('./../common/condition/sensor_condition');

var ProgCtrlButton = React.createClass({
	getInitialState : function(){
		return {
			isRunning:this.props.isRunning == 'false' ? false: true
		}
	},

	componentDidMount: function() {
	console.log("componentDidMount 绑定事件");
      eventsListener.on('changeState',this._changeRunningState);
	  eventsListener.on('canvas changed',this._saveProgram);
	  eventsListener.on("stop_execution", this._stopProgramExecution); 
	  eventsListener.on("start_background", this._startBackGround); 
	  eventsListener.on("add_event_sensor_listener", this._addSensorConditionListener);
	  eventsListener.once("infnite_loop_error", this._infniteLoopError);  
	  eventsListener.on("control_block_status", this._controlBlockStatus);
	  eventsListener.on('endStory',this._renderEndStory);

   },
   _renderEndStory:function(){
	   	var courseData = require('./../service/course_data');
        var course_data = courseData.getCourseData();
        console.log("indedx_prog_ctrl_btn");
        console.log(course_data);
        // 收起课程任务
        $("#id_cousetask").removeClass('active');
		var removeCourse = function() {
		  ReactDOM.unmountComponentAtNode(document.getElementById("course_story"));
		  $("#course_story").empty();
		};
		ReactDOM.render(
		  React.createElement(
		      CourseStory, 
		      {   
		          onRemove:  removeCourse,
		          courseId:course_data.courseId,
		          bgImg:course_data.backgroundImg,
		          story:  course_data.endStory,
		          type:"endStory"
		      }
		  ), document.getElementById("course_story")
		);
   },
   _controlBlockStatus :function(flag) {
       //设置程序块是否可编辑／移动
	   ubtBlocklyUtils.setAllBlocksEditable(flag);
	   ubtBlocklyUtils.setAllBlocksMovable(flag);
   },

   _infniteLoopError : function () {
	  var dom = angular.element($("#bodyContent")).scope();
	  dom.showAlert({'content':MSG['id_infinite_loop_error'],'btnText':MSG['porject_alert_btnText']});
   },

   componentWillUnmount: function() {
      eventsListener.off('changeState');
	  eventsListener.off('canvas changed'); 
	  eventsListener.off("stop_execution"); 
	  eventsListener.off("start_background");   
	  eventsListener.off("add_event_sensor_listener");  
	  eventsListener.off("infnite_loop_error");
	  eventsListener.off("control_block_status");
	  eventsListener.off('endStory');
   },
    _ChargeProtected:function(msg){//充电保护

	},
   _saveProgram : function() {
      console.log("_saveProgram 更新xml内容");
      var currentProgramContent = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(codeLanguage.workspace));
      console.log("_saveProgram 更新xml内容:"+currentProgramContent);
      blocklyDatas.setKeyData('currentProgramXml', currentProgramContent);
   },

   _startBackGround :function () {
	  ReactDOM.render(<Background  />,document.getElementById('popupWindow'));
   },

   _addSensorConditionListener : function() {  //注册传感器条件监听器
	   var conditionSensorBlock = ubtBlocklyUtils.findBlocksByType('program_goto_phone_condition');
	   var touchSensorBlock = ubtBlocklyUtils.findBlocksByType('program_goto_touch_condition');
	   var infraredSensorBlock = ubtBlocklyUtils.findBlocksByType('program_goto_infrared_condition');
	   conditionSensorBlock = _.union(conditionSensorBlock,touchSensorBlock);
	   conditionSensorBlock = _.union(conditionSensorBlock,infraredSensorBlock);
	   var conditionArray = [];
	   var len = conditionSensorBlock.length;
	   for (var i = 0 ; i < len; i++ ) {
		   var block = conditionSensorBlock[i];
		   if (block.disabled == true) {
			   continue;
		   }
		   var sensor = block.getFieldValue('SENSOR');
           var operator = block.getFieldValue('OP');
           var value = block.getFieldValue('VALUE');
           var sensorId = block.getFieldValue('SENSOR_ID');
           var branchId = block.getFieldValue('PROGRAM_BRANCH');
           var sensorCondition = new SensorCondition(sensor, operator , value, sensorId,branchId);
		   conditionArray.push(sensorCondition);
	   }
	   if (len ==0) {
		   return;
	   } 
	   if (window.blocklyObj && window.blocklyObj.registerSensorObservers) {
		   var conditionParam = JSON.stringify(conditionArray);	 
		   console.log('添加监听事件'); 
		   console.log(conditionParam);  
		   window.blocklyObj.registerSensorObservers(conditionParam);
	   } else {
		   console.log(JSON.stringify(conditionArray));
	   }
   },

   _stopProgramExecution : function() {
	   console.log('异常停止程序的执行');
	   programRunner.stopProgram(true);
	   ubtBlocklyUtils.setAllBlocksEditable(true);
	   ubtBlocklyUtils.setAllBlocksMovable(true);
	   eventsListener.trigger('closeBackGround');	   
   },

    _changeRunningState : function(param) {
        this.setState({isRunning:param});
		//如果存在重新开始的块，不要调用停止机器人的命令
		if (!param && !blocklyDatas.getDataByKey('wwGotoStart')) {
			console.log('调用停止机器人的命令');
			var stopRobatCommand = new RobatCommand('stopRobot');
            stopRobatCommand.send();
		}		
	},
	handleClick : function(){
		$("#id_cousetask").removeClass('active');
		Blockly.DropDownDiv.hide();
		if($("#prog_ctrl_div").attr("disabled")=="disabled"){//有disabled属性不可以点击直接return
			return;
		} else {
			var blueState = blocklyDatas.getDataByKey('blueState');
			var errorBlockId = '';
			if(window.blocklyObj==undefined){
				blueState =1;	
			}
			this.setState({isRunning :!this.state.isRunning});
			if (blueState == 0) {
				if(window.angular === undefined){//course  come in
                    var blueContent = new RobatCommand('ConnectBLE');
                    blueContent.send();
				}else{
                    var dom = angular.element($("#bodyContent")).scope();
                    dom.indexBus('blueConnect');
				}
			} else {
				var courseData = require('../service/course_data');
				var standardProgram = courseData.getCourseData().standardProgram;
				var currentProhram = blocklyDatas.getDataByKey('currentProgramXml');
				if (window.blocklyObj && window.blocklyObj.verifyCourse && !window.angular) {
					errorBlockId = window.blocklyObj.verifyCourse(standardProgram, currentProhram);
					if (errorBlockId && isNaN(errorBlockId)) {
						codeLanguage.workspace.traceOn(true);
						codeLanguage.workspace.highlightBlock(errorBlockId);
						// 错误block块对象
						var errorBlock = codeLanguage.workspace.getBlockById(errorBlockId);

						var data= {tipsContent:MSG['block_error_info'], tipsType:'error'};
                        eventsListener.trigger('systemPrompt',data);
                        //更新运行按钮的状态
                        eventsListener.trigger('changeState', false);
						return;
					} else if (errorBlockId == '0') {
						console.log('match OK');
					} else if (errorBlockId == '-1') {
						console.log('params exception');
                        var data= {tipsContent:MSG['block_error_info'], tipsType:'error'};
                        eventsListener.trigger('systemPrompt',data);
                        //更新运行按钮的状态
                        eventsListener.trigger('changeState', false);
                        this.setState({isRunning:false});
						return;
					}
				}
				
				if(!this.state.isRunning) {
					//点击运行执行程序
					ReactDOM.render(<Background  />,document.getElementById('popupWindow'));
					//增加传感器条件的监听
					this._addSensorConditionListener();
					var startBlock = ubtBlocklyUtils.findBlocksByType('program_start');
					var goBackBlock = ubtBlocklyUtils.findBlockByType('program_goto_start');
					if (goBackBlock && goBackBlock.parentBlock_) {
						InteractiveMethod.setContainGoBack(true);
					}
					ubtBlocklyUtils.setAllBlocksEditable(false);
					ubtBlocklyUtils.setAllBlocksMovable(false);
					var code = ubtBlocklyUtils.blockToCodeInWorkspace(startBlock[0]);
					//如果程序中存在重新开始的块，设置块存在的标志
					if (code.indexOf('wwGotoStart') > -1) {
						blocklyDatas.setKeyData('wwGotoStart',true);
						blocklyDatas.setKeyData('endStory',false);
					} else {
						blocklyDatas.setKeyData('wwGotoStart',false);
					}
					programRunner.programRunnerIndex = 1;  
				    programManager.setProgramRunnerIndex(1);
				    //开始运行程序块
					programRunner.startProgram(code);
				} else {//点击停止 
					var isGoback =blocklyDatas.getDataByKey('wwGotoStart');
					//如果有重新开始的块，并且手动点击了停止的按钮，则触发结束故事
					if (isGoback) {
						blocklyDatas.setKeyData('endStory',true);
					}else{
                        blocklyDatas.setKeyData('endStory',false);
					}
					//有重新开始的块，停止后将标志清空
					blocklyDatas.setKeyData('wwGotoStart',false);
					//点击停止的时候清除掉注册的传感器条件监听
					if (window.blocklyObj && window.blocklyObj.unRegisterAllSensorObserver) {	   
						window.blocklyObj.unRegisterAllSensorObserver();
					}
					console.log('设置程序的运行状态为false');
					blocklyDatas.setKeyData("programRunning", false);
					blocklyDatas.setKeyData("programStopManner", true);
					ubtBlocklyUtils.setAllBlocksEditable(true);
					ubtBlocklyUtils.setAllBlocksMovable(true);
					eventsListener.trigger('closeBackGround');
                    //停止运行程序块
					programRunner.stopProgram(true);		
					InteractiveMethod.setContainGoBack(false);
				}	
			}
		}

		$("#prog_ctrl_div").attr("disabled",true);
		setTimeout(function() {
			console.log("123");
			$("#prog_ctrl_div").attr("disabled",false);
		}, 1000);
		
	},
    render(){
		console.log('this.state.isRunning:'+this.state.isRunning);
		var classInfo = this.state.isRunning ? 'icon ion-stop fa fa-stop' : 'icon ion-play fa fa-play ';
		console.log(classInfo);
		var runInfo = this.state.isRunning ?  MSG['id_stop_info'] : MSG['id_start_info'] ;
        return (<div className="executebtn_box flex">
        			<div className="execute_btn flex" onClick={this.handleClick}>
		            <i className={classInfo}></i>
					<span>{runInfo}</span>
		       </div></div>);
	}
});

module.exports = ProgCtrlButton;
