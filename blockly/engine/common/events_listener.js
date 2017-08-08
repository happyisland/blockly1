;(function(){
  var _ = require('lodash');
  function Event() {
  // private object to store events and their callbacks. For example, in practice it might look like this
  // {
  //   'button1Pressed': [changeBlockColor, addNewBlock],
  //   'robotTurnedOff': [notifyDisconnect]
  // }
  // EventEmitter.call(this);
  this._events = {};

  //Events statuses container object, stores array of events by id and their values:
  // this.eventsStatusArray.[ButtonPressed200] = false
  this.eventsStatusArray = {};

  // stores data for sensors
  // this.sensorData.front_left = value  // actual sensor value
  // this.sensorData.front_right = value  // actual sensor value
  // this.sensorData.rear = value    // actual sensor value
  // this.sensorData.sound_direction = value
  // this.sensorData.sound_clap = value
  // this.sensorData.main_button_pressed = value
  // this.sensorData.object_in_front = value   // timestamp at which last time an object was detected
  // this.sensorData.object_in_rear = value  // timestamp at which last time an object was detected in rear
  // this.sensorData.screen_play_button = value // timestamp at which last time the play button was touch on screen
  this.dotSensorData = {};
  this.dashSensorData = {};

  this.eventRegistrants = [{}];
  this.nextRegistrantId = 1; // start at 1
  this.lastEventChecked = [];
  this.eventNeverChecked = [];

  // threshold for object in front/rear detection
  this.obstacleThreshold = 8;
  this.frontReflectanceThreshold = 80;
  this.rearReflectanceThreshold = 60;

  // if only checking for a recent occurence, how recent (in milliseconds)
  this.eventRecencyThreshold = 1000;
  this.eventRecencyThresholdForFirstTimeEvent = 1000;

  // after checking an event, ignore the event for this time period
  this.periodToIgnoreEventAfterCheck = 250;

  // allowance for event to activate if it happened within these milliseconds earlier
  this.eventTimeAllowance = 200;

  // how often to pull events from iOS
  this.timeIntervalBetweenEventPull = 40; // milliseconds
  this.lastTimeEventsPulled = new Date(0);

  // time difference between iOS and JS
  this.iOSToJSTimeDiff = 0;

  // robot types
  this.dashRobot = "Dash";
  this.dotRobot = "Dot";
  this.anyRobot = "Any";

  this.defaultCategoryNode = null;

}

Event.prototype.off = function(name, callback) {
  if (name in this._events) {
    //var callbacks = this._events[name];        
    for (var i = 0; i < this._events[name].length; i++) {
      if (this._events[name][i].callback === callback) {
        //console.log("removing callback");
        return this._events[name].splice(i, 1);
      }
    }
  }
};

Event.prototype.offAll = function(name) {
  this._events[name] = [];
};


Event.prototype.trigger = function(name, args) {
  var callbacks = this._events[name];
  if (callbacks) {
    var callback, context;
    for (var i = 0; i < callbacks.length; i++) {
      callback = callbacks[i].callback;
      context = callbacks.context;
      callback.call(context, args);
    }
  }
};

Event.prototype.on = function(name, callback, context){
  context = context || null;
  this._events[name] = this._events[name] || [];
  this._events[name].push({callback: callback, context: context || null });
};

/**
 * Triggers the callback only once.
 * @param  {String}   name
 * @param  {Function} callback
 */
Event.prototype.once = function(name, callback) {
  var self = this;
  var onceHandler = function(data){
    callback.call(self, data);
    self.off(name, onceHandler);
  }
  this.on(name, onceHandler);
};
var eventsListener = new Event();


if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = eventsListener;
	  //window.gEventsListener = eventsListener;  
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return eventsListener; });
  } else {
    this.eventsListener = eventsListener;
  }
}).call(this);


