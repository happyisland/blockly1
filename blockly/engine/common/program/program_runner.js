var Promise = require("bluebird");
var eventsListener = require('./../events_listener');
var api = require('./../../API');
var slice = [].slice;
var _ = require('lodash');
var infraredSensor = require('./../../../project/ionicPopup/common/infrared_sensor');
var interactiveRobot = require('./interactive_robot');
var programManager = require('./program_manager');
var InteractiveMethod = require('./../../../project/ionicPopup/common/interactive_methods');
var blocklyDatas = require('./../../service/blockly_datas');
var ubtBlocklyUtils = require('../utils/blockly_utils');
var ubtUtils = require('../utils/utils');
var delayCommandManager = require('./delay_command_manager');
var bind =  function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var ProgramRunner = (function() {
	ProgramRunner = function(programRunnerIndex) {
	  this.running = false;
		this._initApi = bind(this._initApi, this);
		this._handleProgramFinished = bind(this._handleProgramFinished, this);
		this._runCode = bind(this._runCode, this);
		this.setCanExecuteBlock = bind(this.setCanExecuteBlock, this);
		this.stopProgram = bind(this.stopProgram, this);
    this.programRunnerIndex = programRunnerIndex || 1;
		this._canExecuteBlock = function(blockId) {
		  return true;
		};
    programManager.addProgramRunner(this);
	};
	
	/**
     * Start a program with code. If currently running another program, it will wait for it to stop before starting the new one.
     * @param  {String} code
     */

    ProgramRunner.prototype.startProgram = function(code, canExecuteBlock) {
      /**
      if (programManager.getProgramRunnerIndex() === -1) {
          programManager.setProgramRunnerIndex(this.programRunnerIndex);
      }
      eventsListener.offAll('next_step'+this.programRunnerIndex); 
      eventsListener.trigger('changeState', true);
      eventsListener.trigger("start_background");
      if (infraredSensor.getStatus() == 'stop') {
          var infraredId = blocklyDatas.getDataByKey('infraredId');
          var gyroscopeIdStr = blocklyDatas.getDataByKey('gyroscopeId');
          if(gyroscopeIdStr) {
             var gyroscopeIds = gyroscopeIdStr.split('|');
             var len = gyroscopeIds.length;
             for (var i = 0 ; i < len; i++) {
                 blocklyDatas.setKeyData('resetGyroscope'+ gyroscopeIds[i],undefined);
             }
          }   
          InteractiveMethods.setIsCanShowAll(true);
          infraredSensor.startInfraredTimer("startInfraredTimer|null|showInfraredRef"); 
      }   
      blocklyDatas.setKeyData("programRunning", true);
      */
      this.initStartStatus();
      if (canExecuteBlock == null) {
        canExecuteBlock = null;
      }  
      this._stop = false;
      if (this.running) {
        return this.stopProgram().then((function(_this) {
          return function() {
            _this.running = false;
            return _this.startProgram(code);
          };
        })(this));
      } else {
        //api.resetStack();
        this.setCanExecuteBlock(canExecuteBlock);
        this.running = true;
        try {
            this.interpreter = this._createInterpreter(code);
        } catch (e) {
            console.log('error ');
            console.log(e);
            this._handleProgramFinished();
            return;
        }
        return this._runCode();
      }
    };

    /**
     * 程序开始运行的时候初始化运行的状态
     * 
     */
    ProgramRunner.prototype.initStartStatus = function() {
      //设置程序的运行参数索引，用于模拟多线程的时候使用
      if (programManager.getProgramRunnerIndex() === -1) {
          programManager.setProgramRunnerIndex(this.programRunnerIndex);
      }
      //清除掉当前的的线程监听器
      eventsListener.offAll('next_step'+this.programRunnerIndex); 
      // 将程序开始的的按钮
      eventsListener.trigger('changeState', true);
      // 将程序运行的遮罩层开启
      eventsListener.trigger("start_background");
      if (infraredSensor.getStatus() == 'stop') {//红外传感器的状态的停止的时候才开启，避免先停止后开启的bug
          var infraredId = blocklyDatas.getDataByKey('infraredId');
          // 将陀螺仪的数据初始化为undefined
          var gyroscopeIdStr = blocklyDatas.getDataByKey('gyroscopeId');
          if(gyroscopeIdStr) {
             var gyroscopeIds = gyroscopeIdStr.split('|');
             var len = gyroscopeIds.length;
             for (var i = 0 ; i < len; i++) {
                 blocklyDatas.setKeyData('resetGyroscope'+ gyroscopeIds[i],undefined);
             }
          }
          //可以开启红外传感器组件   
          InteractiveMethods.setIsCanShowAll(true);
          //启动红外传感器的实时显示
          infraredSensor.startInfraredTimer("startInfraredTimer|null|showInfraredRef"); 
      }
      // 设置程序为运行状态   
      blocklyDatas.setKeyData("programRunning", true);
      eventsListener.trigger("control_block_status",false);
    };
	
	/**
     * Stops the program
     * @param reset - this would kill the current stack being executed without waiting 
     * for the last command to execute. It also rests the API state.
     * @return {Promise}
     */

    ProgramRunner.prototype.stopProgram = function(reset) {
      if (reset == null) {
        reset = true;
      }
      this._stop = true;
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var handler;
          if (reset) {
            api.reset();
          }
          if (_this.running) {
            handler = function() {
              eventsListener.off('program_stopped', handler);
              return resolve();
            };
            eventsListener.on('program_stopped', handler);
            if (reset) {
              return eventsListener.trigger('force_stop_execution');
            } else {
              return api.stopCurrentStep();
            }
          } else {
            return resolve();
          }
        };
      })(this));
    };
	
	ProgramRunner.prototype.stopProgramForError = function() {
	  eventsListener.trigger("stop_execution");
	};
	
	/**
     * The user of program runner can provided a subroutine that will be called each time before a block is exectued
     * The method provided as the argument should return either true or false. If no such method is provided program Runner continues executing the block
     */

    ProgramRunner.prototype.setCanExecuteBlock = function(canExecuteBlock) {
      if (canExecuteBlock != null) {
        return this._canExecuteBlock = canExecuteBlock;
      }
    };
	
	/**
     * Run a single step. Waits for the "next_step" event before resolving.
     *
     * @private
     *
     * @return {Promise}
     */

    ProgramRunner.prototype._step = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var blockId, handler;
          interactiveRobot.setSendRobot(false);
          if ((_this.interpreter.stateStack.length > 0) && (_this.interpreter.stateStack[0].done != null) &&
              _this.interpreter.stateStack[0].done === true && (typeof _this.interpreter.stateStack[0].node.expression !== "undefined") && 
              (_this.interpreter.stateStack[0].node.expression.callee) &&
               (_this.interpreter.stateStack[0].node.expression.callee.name) &&
                 (typeof _this.interpreter.stateStack[0].node.expression.callee.name !== "undefined") &&
                    (_this.interpreter.stateStack[0].node.expression.callee.name === 'highlightBlock')) {
            blockId = parseInt(_this.interpreter.stateStack[0].node.expression["arguments"][0].raw.replace(/\'/g, ''));
            if (!_this._canExecuteBlock(blockId.toString())) {
              reject({
                'blockId': blockId.toString()
              });
            }
          }

          if (!_this.interpreter.step()) {
            var error = new Error('normal to stop');
            reject(error);
          }
          if ((typeof blocklyObj === "undefined" || blocklyObj === null) && interactiveRobot.isSendRobot()) {
             handler = function() {
              eventsListener.off('next_step'+_this.programRunnerIndex, handler);
              eventsListener.off('force_stop_execution', handler);
              return resolve();
            };
            eventsListener.on('next_step'+_this.programRunnerIndex, handler);
            eventsListener.on('force_stop_execution', handler);
            /** 
            setTimeout(function() {
              console.log('绑定的事件的值：'+_this.programRunnerIndex);
              interactiveRobot.setSendRobot(false);
              return resolve();
            }, 3000);
            */
            return;
          }
          if (typeof blocklyObj === "undefined" || blocklyObj === null) {
            resolve();
            return;
          }
          if (interactiveRobot.isSendRobot()) {
            handler = function() {
              eventsListener.off('next_step'+_this.programRunnerIndex, handler);
              eventsListener.off('force_stop_execution', handler);
              return resolve();
            };
            eventsListener.on('next_step'+_this.programRunnerIndex, handler);
            return eventsListener.on('force_stop_execution', handler);
          } else {
            return resolve();
          }
        };
      })(this));
    };


	/**
	 * Should the execution of this code stop?
	 * @return {Boolean}
	 */

	ProgramRunner.prototype._shouldStopExecution = function() {
      return this._stop;
	};


    /**
     * This is a Promise-based version of a while loop. While there is code to run, and there are no conditions that we should stop running, keep running this program.
     */

    ProgramRunner.prototype._runCode = function() {
      return this._step().then((function(_this) {
        return function(response) {
          if (_this._shouldStopExecution()) {
            var error = new Error('force to stop');
            return Promise.reject(error);
          } else {
            return _this._runCode();
          }
        };
      })(this))["catch"](this._handleProgramFinished);
    };


    ProgramRunner.prototype.finishStatus = function() {
      //停止红外传感器的显示
      infraredSensor.stopInfraredTimer("stopInfraredTimer|null|null"); 
      if (window.blocklyObj) {
          console.log('停止音乐播放');
          window.blocklyObj.stopPlayAudio();
      }
      //设置程序的运行状态为false
      blocklyDatas.setKeyData("programRunning", false);
      //设置是否显示传感器的值，为false不能显示 ，避免停止后出现值得bug
      InteractiveMethods.setIsCanShowAll(false);
      //if (!InteractiveMethod.isContainGoBack()) {
        //更新运行按钮的状态
        eventsListener.trigger('changeState', false);
        //关闭遮罩层
        eventsListener.trigger('closeBackGround');
        //将块设置为可以编辑,可以移动
        ubtBlocklyUtils.setAllBlocksEditable(true);
			  ubtBlocklyUtils.setAllBlocksMovable(true);
      //}  
    };

    ProgramRunner.prototype.handleGoback = function() {
        var bleState = true;
        var bleStateStr = blocklyDatas.getDataByKey('blueState');
        if (bleStateStr == "1" || bleStateStr == true || bleStateStr == 1) {
            bleState = true;
        } else {
            bleState = false;
        }

        if (!bleState) {
          eventsListener.trigger('changeState');
          eventsListener.trigger('closeBackGround');
          ubtBlocklyUtils.setAllBlocksEditable(true);
          ubtBlocklyUtils.setAllBlocksMovable(true);
        } 
    };

    /**
     * any clean-up logic that should happen when the program has finished should exist here.
     */

    ProgramRunner.prototype._handleProgramFinished = function(err) {
      this.running = false;
      eventsListener.trigger('program_stopped');
      this.finishStatus();
      this.handleGoback();

      if (err && err['message'] != 'normal to stop' && err['message'] != 'force to stop' && err!='Infinite loop.') {
          console.log(err['message']);
      } else {
          if (err && err=='Infinite loop.') {
              eventsListener.trigger("infnite_loop_error");
          }
          console.log(err['stack']);
          if (Blockly.selected) {
              Blockly.selected.unselect();
          }
          var endStory = blocklyDatas.getDataByKey('endStory');
          if(blocklyDatas.getDataByKey('platformType')== 3 &&(err['message'] == 'normal to stop' || (err['message'] == 'force to stop' && endStory))){
              // 运行完程序启动 结束故事
              eventsListener.trigger('endStory');
          }
          //如果允许跳转到其他程序，则默认跳转一次
          //if (blocklyDatas.getDataByKey('forward_another') == true) { 
              //跳转前清楚掉延迟定时器
              var delayCommand = delayCommandManager.getDelayCommandByIndex(this.programRunnerIndex);
              delayCommand.clearTimeout();
              //ubtUtils.clearTimeout();
              console.log('执行跳转'); 
              if (err['stack']  && err['stack'].indexOf('normal to stop') > -1 &&　window.blocklyObj &&
                    window.blocklyObj.unRegisterAllSensorObserver) {
                    console.log('满足条件移除监听');
                 　　window.blocklyObj.unRegisterAllSensorObserver();
              }       
              eventsListener.trigger('forward_another');
              
              //eventsListener.offAll('forward_another');
          //}
      }
    };


    /**
     * Attach all listeners that we care about.
     *
     * @private
     */


    /**
     * Create an interpreter using the following code.
     * @param  {!String} code
     * @return {Interpreter}
     */

    ProgramRunner.prototype._createInterpreter = function(code) {
      return new Interpreter(code, this._initApi);
    };

    ProgramRunner.prototype._wrap = function(fn, interpreter, context) {
      if (context == null) {
        context = api;
      }
      return interpreter.createNativeFunction(function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        args = _.map(args, function(arg) {
          if (arg && arg.isPrimitive) {
            return arg.valueOf();
          } else {
            return arg;
          }
        });
        return interpreter.createPrimitive(fn.apply(context, args));
      });
    };


    /**
     * Attach methods to our interpreter.
     *
     * @private
     */

    ProgramRunner.prototype._initApi = function(interpreter, scope) {
      interpreter.setProperty(scope, 'alert', this._wrap(alert, interpreter, window));
      interpreter.setProperty(scope, 'prompt', this._wrap(prompt, interpreter, window));
      //增加一个记录运行期日志的函数
      var wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(window.console.log(id));
      };
      interpreter.setProperty(scope, 'log',
      interpreter.createNativeFunction(wrapper));
      
      return _.each(Object.keys(api.constructor.prototype), (function(_this) {
        return function(func) {
          return interpreter.setProperty(scope, func, _this._wrap(api[func], interpreter));
        };
      })(this));
    };
	
	return ProgramRunner;
})();

module.exports = window.programRunner = new ProgramRunner();
window.ProgramRunner = ProgramRunner;
window._=_;