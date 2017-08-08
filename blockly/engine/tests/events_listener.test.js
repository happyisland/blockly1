var eventsListener = require('../common/events_listener');
var expect = require('chai').expect;

describe('事件处理器的测试', function() {

  var onceVariable = 0;
  var onVariable = 0;
  before(function() {
    // 在本区块的所有测试用例之前执行
    eventsListener.on('first_event',function(){
        onVariable++;
    });
    eventsListener.once('once',function() {
        onceVariable++;
    });
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
    eventsListener.off('first_event');
    eventsListener.off('once');
  });

  beforeEach(function() {   
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {  
    // 在本区块的每个测试用例之后执行
  });

  it('eventsListener.on 方法测试', function() {
    eventsListener.trigger('first_event');
    eventsListener.trigger('first_event');
    expect(onVariable).to.be.equal(2); 
  });

  it('eventsListener.once 方法测试', function() {
    eventsListener.trigger('once');
    eventsListener.trigger('once');
    expect(onceVariable).to.be.equal(1); 
  });
});