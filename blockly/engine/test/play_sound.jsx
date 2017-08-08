var React = require('react');
var ReactDOM = require('react-dom');
var SoundOperationBtn = require('./sound_opbtn.jsx');
var SwitchComponent = require('./switch.jsx');
var InputComponent = require('./inputComponent.jsx');

var eventsListener = require('../common/events_listener');
var $ = require('jquery');

var PlaySoundComponent = React.createClass({
    getDefaultProps: function() {
        return {
            menu: [{src:'animal', text:MSG.animal},{src:'machine', text:MSG.machine},{src:'emotion', text:MSG.emotion},{src:'command', text:MSG.command},{src:'recording',text:MSG.recording}],
            menuArr:[ [ {icon:'bear', description:MSG.bear},{icon:'bird', description:MSG.bird},
                        {icon:'chicken', description:MSG.chicken},{icon:'cow', description:MSG.cow},
                        {icon:'dog', description:MSG.dog},{icon:'elephant', description:MSG.elephant},
                        {icon:'giraffe', description:MSG.giraffe},{icon:'horse', description:MSG.horse},
                        {icon:'lion', description:MSG.lion},{icon:'monkey', description:MSG.monkey},
                        {icon:'pig', description:MSG.pig},{icon:'rhinoceros', description:MSG.rhinoceros},
                        {icon:'sealions', description:MSG.sealions},{icon:'tiger', description:MSG.tiger},
                        {icon:'walrus', description:MSG.walrus}
                      ],
                      [ {icon:'ambulance', description:MSG.ambulance},{icon:'busy_tone', description:MSG.busy_tone},
                        {icon:'carhorn', description:MSG.carhorn},{icon:'carhorn1', description:MSG.carhorn1},
                        {icon:'doorbell', description:MSG.doorbell},{icon:'engine', description:MSG.engine},
                        {icon:'laser', description:MSG.laser},{icon:'meebot', description:MSG.meebot},
                        {icon:'police_car_1', description:MSG.police_car_1},{icon:'police_car_2', description:MSG.police_car_2},
                        {icon:'ringtones', description:MSG.ringtones},{icon:'robot', description:MSG.robot},
                        {icon:'telephone_call', description:MSG.telephone_call},{icon:'touch_tone', description:MSG.touch_tone},
                        {icon:'wave', description:MSG.wave}
                      ],
                      [   {icon:'happy', description:MSG.happy},{icon:'surprise', description:MSG.surprise},
                          {icon:'cheerful', description:MSG.cheerful},{icon:'actingcute', description:MSG.actingcute},
                          {icon:'nonsense', description:MSG.nonsense},{icon:'snoring', description:MSG.snoring},
                          {icon:'yawn', description:MSG.yawn},{icon:'doubt', description:MSG.doubt},
                          {icon:'angry', description:MSG.angry},{icon:'lose', description:MSG.lose},
                          {icon:'fail', description:MSG.fail},{icon:'come_and_play', description:MSG.come_and_play},
                          {icon:'flexin', description:MSG.flexin},{icon:'london_bridge', description:MSG.london_bridge},
                          {icon:'yankee_doodle', description:MSG.yankee_doodle}
                      ],
                      [   {icon:'yes', description:MSG.yes},{icon:'received', description:MSG.received},
                          {icon:'complete', description:MSG.complete},{icon:'transfiguration', description:MSG.transfiguration},
                          {icon:'cover', description:MSG.cover},{icon:'support', description:MSG.support},
                          {icon:'move', description:MSG.move}
                      ]
                    ]
            
         };
    },
    // 用来设置可变属性
    getInitialState: function() {
         var menuIndex = 0;
         if (this.props.popupData.type ==='machine') {
             menuIndex = 1;
         } else if(this.props.popupData.type ==='emotion'){
             menuIndex = 2;
         }else if(this.props.popupData.type ==='command'){
             menuIndex = 3;
         }else if (this.props.popupData.type ==='recording') {
             menuIndex = 4;
         }
         var recordList = [];
         //从底层获取录音文件
         if(window.blocklyObj != undefined){
            var recordData = window.blocklyObj.customSoundList();
            if(recordData != ""){
                recordList = JSON.parse(recordData);
                console.log(recordData);
            }
         }else{
            recordList=[{icon:'images\/popup\/emotion\/luyin@1x.png',"key":"vorice1",description:'录音1'},
                {icon:'images\/popup\/emotion\/luyin@1x.png',"key":"vorice2",description:'录音2'},
                {icon:'images\/popup\/emotion\/luyin@1x.png',"key":"vorice3",description:'录音3'},
                {icon:'images\/popup\/emotion\/luyin@1x.png',"key":"vorice4",description:'录音4'},
                {icon:'images\/popup\/emotion\/luyin@1x.png',"key":"vorice5",description:'录音5'}
            ];
         }
         return {
            curSeletMenu :menuIndex,
            curSelectMenuType: this.props.popupData.type || 'animal',
            isDelay : this.props.popupData.isDelay || false,
            recording :[],
            popupKey: this.props.popupKey,
            popupData : this.props.popupData,
            deleteitem:"clear_div item_delete_btn",
            isDelete:false,
             recordTime:0,
            recordInterval:null,
             startY: 0,
             endY: 0,
            records:recordList
         };
    },
    componentDidMount: function() {
        this._renderMusicSpan(34);
    },
    _renderMusicSpan:function(count){
        /*var spanList = [];
        var _base = 2;
        for(var i=0;i<count;i++){
            var _left = _base*i+i;
            var _delay = Math.random()/2;
            var _style = "height:"+ _delay*100+"px;top:33%;left:"+ _left +"%;-webkit-animation-delay:"+_delay+"s";
            if(i%2===0){
                _style = "height:"+ _delay*100+"px;top:28%;left:"+ _left +"%;-webkit-animation-delay:"+_delay+"s";
            }

            var _span = '<span style='+_style+'></span>';
            spanList.push(_span);
        }
        $("#music_container").append(spanList);*/
    },
    goCancel:function(e) {
        //停止音效播放
        if(window.blocklyObj){
            window.blocklyObj.stopPlayAudio();
        }
        if(e){
            e.stopPropagation();
        }
        return this.props.onRemove();
    },
    goSure:function(e) {
        //停止音效播放
        if(window.blocklyObj){
            window.blocklyObj.stopPlayAudio();
        }
        if(e){
            e.stopPropagation();
        }
        var outData = this.state.popupData;
        this.props.callback(outData);
        return this.props.onRemove();
    },
    _getImgBasePath:function(_index){
        var type ='';
        if(_index === 0){
            type = 'animal';
        }else if(_index === 1) {
            type = 'machine';
        }else if(_index === 2) {
            type = 'emotion';
        }else if(_index === 3) {
            type = 'command';
        }
        var basesrc = "ionicPopup\/soundEffects\/source\/"+type+"\/";
        return basesrc;
    },
    _getDeleteClass:function(){
        var _isdelet = this.state.isDelete;
        var _class = "";
        if(this.state.curSelectMenuType === "recording" && _isdelet===true){
            _class = this.state.deleteitem;
        }
        return _class;
    },
    // 删除单个录音
    deleteRecord:function(item,e){
        var that = e.currentTarget;
        var _records = this.state.records;
        var index = $(that).parent().index();
        var popupData = {};
        //当前选中项信息
        var currentSelectSound = this.state.popupData;
        var param_temp = {key:item.key};
        //先删除远程，再删除本地
        if(window.blocklyObj != undefined) {
            var delOK = window.blocklyObj.deleteCustomSound(JSON.stringify(param_temp));
            if (JSON.parse(delOK) == true) {
                if(currentSelectSound.key === item.key){
                    popupData.description = "";
                    popupData.type = "";
                    popupData.isDelay = false;
                }

                _records.splice(index, 1);
                this.setState({
                    records: _records
                });
            }
        }else{
            if(currentSelectSound.key === item.key){
                popupData.description = "";
                popupData.type = "";
                popupData.isDelay = false;
            }
            _records.splice(index, 1);
            this.setState({
                records: _records
            });
        }
        this.setState({popupData:popupData});
    },
    handleSoundChange:function(item,e){
        //将选中的声音设置到状态数据中
        var selectObj = {};
        var type = this.state.curSelectMenuType;
        var isDelay = this.state.isDelay;
        if(item.key!==undefined){  //自定义音效文件中播放音效所需key值从item.key中获取，系统音效播放音效所需key值从item.icon中获取
            selectObj.key = item.key;
        }else{
            selectObj.key = item.icon;
        }

        selectObj.description = item.description;
        selectObj.type = type;
        selectObj.isDelay = isDelay;
        var popupData = {};
        popupData.popupData = selectObj;
        this.setState(popupData);
        //播放录音
        if(window.blocklyObj != undefined){
            window.blocklyObj.playAudio(JSON.stringify(selectObj));
        }
    },
    _selectCurrentSound:function(item,e){  //选中当前项更换样式
        var that = e.currentTarget;
        var index = $(that).index();
        this._addActiveClass(that);
    },
    _renderSound:function(index){
        var sound = [];
        var basesrc = this._getImgBasePath(index);
        var _deletclass = this._getDeleteClass();
        var items = (index ===4)? this.state.records : this.props.menuArr[index];
        if(items.length>0){
            for(var i=0;i<items.length;i++){
                var item=items[i];
                var _src= basesrc+item.icon+"\/"+item.icon+".png";
                _src = (index === 4) ? item.icon : _src;
                var delBtn = '';
                //将当前选择的声音高亮
                var itemClassName = 'sound_list_li flex';
                var currentItem = this.state.popupData;
                if (item.icon === currentItem.key) {
                    itemClassName = 'sound_list_li flex active';
                } else {
                    itemClassName = 'sound_list_li flex';
                }
                sound.push(<li key={i} className={itemClassName} onClick={this._selectCurrentSound.bind(this,item)}>
                                <div className="soundimg_box flex" onClick={this.handleSoundChange.bind(this,item)}>
                                    <img src={_src}/>
                                </div>
                                <span className="sound_text">{item.description}</span>
                                <div className={_deletclass} onClick={this.deleteRecord.bind(this,item)}>
                                    <span></span>
                                </div>
                           </li>);
            }
        }else{
            sound.push(<li className="flex" style={{height:"100%"}}>
                             <div>{MSG.recording_data_tips}</div>
                       </li>);
        }

        return sound;
    },
    _addActiveClass:function(that){
        $(that).addClass('active');
        $(that).siblings().removeClass('active');
    },
    handleMenuChange:function(item,e){
        var that = e.currentTarget;
        this._addActiveClass(that);
        var _index = $(that).index();
        this.setState({
            curSeletMenu :_index,
            isDelete:false,
            curSelectMenuType : item.src
        });
        this._renderSound(_index);
    },
    _renderMenu : function() {
        var Menu = [];
        var items = this.props.menu;
        var curmenu = this.state.curSeletMenu;
        var curMenuType = this.state.curSelectMenuType;
        var menuType = this.props.popupData.type;
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var _class = "menu_list_li flex";
            if(curMenuType == item.src){
                _class = "menu_list_li active flex";
            }
            Menu.push(<li key={i} className={_class} onClick={this.handleMenuChange.bind(this,item)}>
                        <span>{item.text}</span>
                    </li>);
        }
        return Menu;
    },
    onDeleteClick:function(){
       var _isDelete = this.state.isDelete;
        this.setState({
            isDelete: !_isDelete
        });
    },
    _initRecordObj:function(isStop){
        var state = {
            recordTime:  0
        };
        this.setState(state);
        if(this.state.recordInterval !== null){
            clearInterval(this.state.recordInterval);
        }
        if(isStop!==undefined){
            if(isStop === true){  //停止录音
                //停止录音
                if(window.blocklyObj != undefined){
                    window.blocklyObj.stopRecordAudio();
                }
            }else{ //放弃录音
                //放弃录音
                if(window.blocklyObj){
                    window.blocklyObj.cancelRecordAudio();
                }
            }
        }

    },
    goHidden:function(){  //打开录音中界面
        var hasPower = false;
        var that = this;
        //开启录音
        if(window.blocklyObj != undefined){
            //开启录音
            hasPower = window.blocklyObj.startRecordAudio();
            if(hasPower==true){
                $("#main_popup").hide();
                $("#record_popup").show();
                that.state.recordInterval = setInterval(function(){
                    var recordTime = that.state.recordTime+1;
                    if(recordTime>=60){
                        recordTime = 60;
                        that._initRecordObj(true);
                        //关闭录音中界面
                        that.finishRecord();
                    }
                    console.log("录音时间:"+recordTime);
                    var state = {
                        recordTime:  recordTime
                    };
                    that.setState(state);
                }, 1000);
            }
        }else{
            $("#main_popup").hide();
            $("#record_popup").show();
            that.state.recordInterval = setInterval(function(){
                var recordTime = that.state.recordTime+1;
                if(recordTime>=60){
                    recordTime = 60;
                    that._initRecordObj(true);
                    //关闭录音中界面
                   that.finishRecord();
                }
                console.log("录音时间:"+recordTime);
                var state = {
                    recordTime:  recordTime
                };
                that.setState(state);
            }, 1000);
        }
    },
    finishRecord:function(){  //关闭录音中界面
        this._initRecordObj(true);
        //清空输入框的值
        this.refs.getInputValue.clearInputValue();
        $("#recordname_popup").show();
        $("#record_popup").hide();
    },
    cancelRecord:function(){  //放弃录音
        this._initRecordObj(false);
        //清空输入框的值
        this.refs.getInputValue.clearInputValue();
        $("#main_popup").show();
        $("#record_popup").hide();
    },
    cancelRecordName:function(){
        ReactDOM.unmountComponentAtNode(document.getElementById("test00000"));
        this._initRecordObj();
        $("#main_popup").show();
        //清空输入框的值
        this.refs.getInputValue.clearInputValue();
        $("#recordname_popup, #record_popup").hide();
    },
    finishRecordName:function(){
        ReactDOM.unmountComponentAtNode(document.getElementById("test00000"));
        var recordName = this.refs.getInputValue.outPutValue();
        console.log("当前输入值信息:"+this.refs.getInputValue.outPutValue());
        //TODO 走录音接口 android，ios
        if(recordName=="" || recordName==null || recordName==undefined){
            recordName = MSG.sysVoiceName;
        }
        var param = {
            "icon":"images/popup/emotion/luyin@1x.png",
            key:"",
            "description": recordName,
            "duration":new Date()
        };
        console.log("当前录音对象******:"+param);
        var addResult = 1;
        if(window.blocklyObj != undefined){
            addResult = window.blocklyObj.addCustomSound(JSON.stringify(param));
        }
        //返回值(0:保存失败;1:保存成功;2:音效名已存在;3:录音文件不存在;4:参数错误;)
        if(addResult===1){
            //清空值
            var obj = {};
            obj.icon = 'images\/popup\/emotion\/luyin@1x.png';
            obj.key= new Date();
            obj.description = recordName;
            //本地新增
            var _records = this.state.records;
            _records.push(obj);
            //初始化设置对象值
            this._initRecordObj();
            //从底层获取录音文件
            if(window.blocklyObj != undefined){
                var recordData = window.blocklyObj.customSoundList();
                if(recordData != ""){
                    this.setState({
                        records:JSON.parse(recordData)
                    });
                    console.log("新增录音后："+recordData);
                }
            }else{
                this.setState({
                    records:_records
                });
            }
            $("#main_popup").show();
            //清空输入框的值
            this.refs.getInputValue.clearInputValue();
            $("#recordname_popup, #record_popup").hide();
        }else if(addResult === 2){ //录音名称重复
            window.systemPrompt({tipsContent:MSG.recording_name_repeat,tipsType:"tips"});
        }
    },

    onSwitchchange : function(params) {
        var isDelayObj = {};
        var popupData = this.state.popupData;
        
        if (params) {
            isDelayObj.isDelay = true;
            popupData.isDelay = true;
        } else {
            isDelayObj.isDelay = false;
            popupData.isDelay = false;
        }
        eventsListener.trigger('switchChange',params);
        this.setState(isDelayObj);
        this.setState(popupData);     
    },
    _renderIputRecordName:function(){
        return <div className="blockly_popup" id="recordname_popup" style={{display:'none'}}>
                    <div className="blockly_popuphead flex">
                        <div className="model_title">
                            {MSG.recording_popup_title}
                        </div>                       
                    </div>
                    <div className="blockly_popupbody flex" id="test00000">
                        <InputComponent ref="getInputValue" placeholder={MSG.recording_placeholder} inputTips={MSG.input_rule_msg.replace('%1', '12').replace('%2', '6')} ></InputComponent>;
                    </div>
                    <div className="blockly_popupfooter flex">
                        <div className="btn_cancel flex" onTouchEnd={this.cancelRecordName}>{MSG.project_pop_cancel_btn}</div> 
                        <div className="btn_ok flex" onTouchEnd={this.finishRecordName}>{MSG.project_pop_ok_btn}</div> 
                    </div>
                </div>;
    },
    _renderRecordHTML:function(){
        return <div className="blockly_popup" id="record_popup" style={{display:'none'}}>
                    <div className="blockly_popuphead flex">
                        <div className="model_title">
                            {MSG.recording_tips}
                        </div>
                    </div>
                    <div className="blockly_popupbody flex">
                        <div className="recording_box flex">
                            <div className="music_box">
                                <img src="images/courses/recording_gif.gif"/>
                                <label className="record_time">{this.state.recordTime}"/60"</label>
                            </div>
                           {/* <div id="music_container" className="music_box flex">
                                <img src="images/courses/recording_gif.gif"/>
                            </div>
                            <div className="recordimg_box flex">
                                <span className="record_time">{this.state.recordTime}"/60"</span>
                            </div>*/}
                        </div>
                    </div>
                    <div className="blockly_popupfooter flex">
                        <div className="btn_cancel flex" onTouchEnd={this.cancelRecord}>{MSG.project_pop_cancel_btn}</div> 
                        <div className="btn_ok flex" onTouchEnd={this.finishRecord}>{MSG.project_pop_ok_btn}</div> 
                    </div>
                </div>;
    },
    componentWillUnmount: function () {
    },
    render: function() {
        var RecordHtml = this._renderRecordHTML();
        var InputRecordHtml = this._renderIputRecordName();
        var Menu = this._renderMenu();
        var content = this._renderSound(this.state.curSeletMenu);
        var isDelay = this.state.isDelay;
        var Button = '';
        if(this.state.curSeletMenu === 4){
            Button = <SoundOperationBtn callbackParent={this.onDeleteClick} isDelete={this.state.isDelete}
                        goHidden={this.goHidden} goRemove={this.props.onRemove}/>;
        }
        return  <div className="blockly_background flex">
                    <div className="blockly_popup" id="main_popup">
                        <div className="blockly_popuphead flex">
                            <div className="model_title">
                                {MSG.sound_effects_popup_title}
                            </div>
                            <div className="sound_switch_box flex">
                                <SwitchComponent callbackParent={this.onSwitchchange} isClose={isDelay}></SwitchComponent>
                                <span className="switch_label">{MSG.delay}</span> 
                            </div>
                            {Button}                        
                        </div>
                        <div className="blockly_popupbody flex">
                            <div className="popupbody_menu">
                                <ul className="menu_list" id="menu_list">
                                    {Menu}
                                </ul>
                            </div>
                            <div className="popupbody_content flex">
                                <ul className="sound_list">
                                    {content}
                                </ul>
                            </div>
                        </div>
                        <div className="blockly_popupfooter flex">
                            <div className="btn_cancel flex" onTouchEnd={this.goCancel}>{MSG.project_pop_cancel_btn}</div> 
                            <div className="btn_ok flex" onTouchEnd={this.goSure}>{MSG.project_pop_ok_btn}</div> 
                        </div>
                    </div>
                    {RecordHtml}
                    {InputRecordHtml}
                </div>;
    }
});
module.exports = PlaySoundComponent;





