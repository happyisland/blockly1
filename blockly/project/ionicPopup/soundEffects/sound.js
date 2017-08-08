/**
 * Created by hsp on 16/10/19.
 */

'use strict';
;(function() {

    function SoundSource() {

    }
    var soundSource_data ={
        "animal":[{"icon":"ionicPopup/soundEffects/source/animal/bear/bear.png","key":"bear","description":MSG.bear},
            {"icon":"ionicPopup/soundEffects/source/animal/bird/bird.png","key":"bird","description":MSG.bird},
            {"icon":"ionicPopup/soundEffects/source/animal/chicken/chicken.png","key":"chicken","description":MSG.chicken},
            {"icon":"ionicPopup/soundEffects/source/animal/cow/cow.png","key":"cow","description":MSG.cow},
            {"icon":"ionicPopup/soundEffects/source/animal/dog/dog.png","key":"dog","description":MSG.dog},
            {"icon":"ionicPopup/soundEffects/source/animal/elephant/elephant.png","key":"elephant","description":MSG.elephant},
            {"icon":"ionicPopup/soundEffects/source/animal/giraffe/giraffe.png","key":"giraffe","description":MSG.giraffe},
            {"icon":"ionicPopup/soundEffects/source/animal/horse/horse.png","key":"horse","description":MSG.horse},
            {"icon":"ionicPopup/soundEffects/source/animal/lion/lion.png","key":"lion","description":MSG.lion},
            {"icon":"ionicPopup/soundEffects/source/animal/monkey/monkey.png","key":"monkey","description":MSG.monkey},
            {"icon":"ionicPopup/soundEffects/source/animal/pig/pig.png","key":"pig","description":MSG.pig},
            {"icon":"ionicPopup/soundEffects/source/animal/rhinoceros/rhinoceros.png","key":"rhinoceros","description":MSG.rhinoceros},
            {"icon":"ionicPopup/soundEffects/source/animal/sealions/sealions.png","key":"sealions","description":MSG.sealions},
            {"icon":"ionicPopup/soundEffects/source/animal/tiger/tiger.png","key":"tiger","description":MSG.tiger},
            {"icon":"ionicPopup/soundEffects/source/animal/walrus/walrus.png","key":"walrus","description":MSG.walrus}
        ],
        "machine":[
            {"icon":"ionicPopup/soundEffects/source/machine/ambulance/ambulance.png","key":"ambulance","description":MSG.ambulance},
            {"icon":"ionicPopup/soundEffects/source/machine/busy_tone/busy_tone.png","key":"busy_tone","description":MSG.busy_tone},
            {"icon":"ionicPopup/soundEffects/source/machine/carhorn/carhorn.png","key":"carhorn","description":MSG.carhorn},
            {"icon":"ionicPopup/soundEffects/source/machine/carhorn1/carhorn1.png","key":"carhorn1","description":MSG.carhorn1},
            {"icon":"ionicPopup/soundEffects/source/machine/doorbell/doorbell.png","key":"doorbell","description":MSG.doorbell},
            {"icon":"ionicPopup/soundEffects/source/machine/engine/engine.png","key":"engine","description":MSG.engine},
            {"icon":"ionicPopup/soundEffects/source/machine//laser/laser.png","key":"laser","description":MSG.laser},
            {"icon":"ionicPopup/soundEffects/source/machine/meebot/meebot.png","key":"meebot","description":MSG.meebot},
            {"icon":"ionicPopup/soundEffects/source/machine/police_car_1/police_car_1.png","key":"police_car_1","description":MSG.police_car_1},
            {"icon":"ionicPopup/soundEffects/source/machine/police_car_2/police_car_2.png","key":"police_car_2","description":MSG.police_car_2},
            {"icon":"ionicPopup/soundEffects/source/machine/ringtones/ringtones.png","key":"ringtones","description":MSG.ringtones},
            {"icon":"ionicPopup/soundEffects/source/machine/robot/robot.png","key":"robot","description":MSG.robot},
            {"icon":"ionicPopup/soundEffects/source/machine/telephone_call/telephone_call.png","key":"telephone_call","description":MSG.telephone_call},
            {"icon":"ionicPopup/soundEffects/source/machine/touch_tone/touch_tone.png","key":"touch_tone","description":MSG.touch_tone},
            {"icon":"ionicPopup/soundEffects/source/machine/wave/wave.png","key":"wave","description":MSG.wave}
        ],
        "emotion":[
            {"icon":"ionicPopup/soundEffects/source/emotion/happy/happy.png","key":"happy","description":MSG.happy},
            {"icon":"ionicPopup/soundEffects/source/emotion/surprise/surprise.png","key":"surprise","description":MSG.surprise},
            {"icon":"ionicPopup/soundEffects/source/emotion/cheerful/cheerful.png","key":"cheerful","description":MSG.cheerful},
            {"icon":"ionicPopup/soundEffects/source/emotion/actingcute/actingcute.png","key":"actingcute","description":MSG.actingcute},
            {"icon":"ionicPopup/soundEffects/source/emotion/nonsense/nonsense.png","key":"nonsense","description":MSG.nonsense},
            {"icon":"ionicPopup/soundEffects/source/emotion/snoring/snoring.png","key":"snoring","description":MSG.snoring},
            {"icon":"ionicPopup/soundEffects/source/emotion/yawn/yawn.png","key":"yawn","description":MSG.yawn},
            {"icon":"ionicPopup/soundEffects/source/emotion/doubt/doubt.png","key":"doubt","description":MSG.doubt},
            {"icon":"ionicPopup/soundEffects/source/emotion/angry/angry.png","key":"angry","description":MSG.angry},
            {"icon":"ionicPopup/soundEffects/source/emotion/lose/lose.png","key":"lose","description":MSG.lose},
            {"icon":"ionicPopup/soundEffects/source/emotion/fail/fail.png","key":"fail","description":MSG.fail},
            {"icon":"ionicPopup/soundEffects/source/emotion/come_and_play/come_and_play.png","key":"come_and_play","description":MSG.come_and_play},
            {"icon":"ionicPopup/soundEffects/source/emotion/flexin/flexin.png","key":"flexin","description":MSG.flexin},
            {"icon":"ionicPopup/soundEffects/source/emotion/london_bridge/london_bridge.png","key":"london_bridge","description":MSG.london_bridge},
            {"icon":"ionicPopup/soundEffects/source/emotion/yankee_doodle/yankee_doodle.png","key":"yankee_doodle","description":MSG.yankee_doodle}
        ],
        "command":[
            {"icon":"ionicPopup/soundEffects/source/command/yes/yes.png","key":"yes","description":MSG.yes},
            {"icon":"ionicPopup/soundEffects/source/command/received/received.png","key":"received","description":MSG.received},
            {"icon":"ionicPopup/soundEffects/source/command/complete/complete.png","key":"complete","description":MSG.complete},
            {"icon":"ionicPopup/soundEffects/source/command/transfiguration/transfiguration.png","key":"transfiguration","description":MSG.transfiguration},
            {"icon":"ionicPopup/soundEffects/source/command/cover/cover.png","key":"cover","description":MSG.cover},
            {"icon":"ionicPopup/soundEffects/source/command/support/support.png","key":"support","description":MSG.support},
            {"icon":"ionicPopup/soundEffects/source/command/move/move.png","key":"move","description":MSG.move}
        ],
        "recording":[
           /* {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice1","description":"录音1"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice2","description":"录音2"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice3","description":"录音3"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice4","description":"录音4"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice5","description":"录音5"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice6","description":"录音6"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice7","description":"录音7"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice8","description":"录音8"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice9","description":"录音9"},
            {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice10","description":"录音10"}*/
        ]
    };
    var temp_recordingData = [
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice1","description":"录音1"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice2","description":"录音2"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice3","description":"录音3"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice4","description":"录音4"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice5","description":"录音5"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice6","description":"录音6"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice7","description":"录音7"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice8","description":"录音8"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice9","description":"录音9"},
        {"icon":"images/popup/emotion/luyin@1x.png","key":"vorice10","description":"录音10"}
    ];

    /**
     * @params url 载入脚本的url
     * @params callback 载入脚本的回调函数
     *
     * 载入脚本的功能
     *
     *
     */
    SoundSource.prototype.data = function () {
        var temp_data = {};
        temp_data = angular.copy(soundSource_data);
        temp_data.recording = [];
        //从底层获取录音文件
        if(window.blocklyObj != undefined){
            var recordData = window.blocklyObj.customSoundList();
            if(recordData != ""){
                temp_data.recording = JSON.parse(recordData);
                console.log(recordData);
            }
        }else{
            temp_data.recording = temp_recordingData;
        }

        return temp_data;
    };


    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new SoundSource;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new SoundSource; });
    } else {
        this.soundSource = new SoundSource;
    }

}).call(this);