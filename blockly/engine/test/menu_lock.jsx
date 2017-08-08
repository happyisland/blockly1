var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var CourseData = require('./../service/course_data.js');
var MenuLock = React.createClass({
    getInitialState: function() {
        var data = CourseData.getCourseData();
        console.log("course data--->");
        console.log(data.toolConfigShow);
        return {
            isAllLock:false,
            lockMenuArr: data.toolConfigShow
        };
    },
    componentDidMount: function() {
        
    },
    _renderPartMenuLock:function(){
        var arr = this.state.lockMenuArr;
        var lockArr = [];
        if(arr){
            for(var i=0;i<arr.length;i++){
                var menu_index = i;
                var item = arr[i];
                if(item === 0){//<img src={"images/courses/lock.png"}/>
                    lockArr.push(<div key={i} className={"flex menu_lock meun"+(menu_index+1)+"_lock"}>
                                 </div>);
                }
            }
        }
        return lockArr;
    },
    render: function(){
        var lockArr = this._renderPartMenuLock();
        if(this.state.isAllLock){
            return  <div className="menulock_box flex">
                        <i className="fa fa-lock lock_icon"></i>
                    </div>;
        }else {
            return   <div className="partmenu_lock_box">
                        {lockArr}
                     </div>
        }

    }
});
module.exports = MenuLock;