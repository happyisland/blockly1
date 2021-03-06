var MSG = {
  title: "Code",
  blocks: "Blocks",
  linkTooltip: "Save and link to blocks.",
  runTooltip: "Run the program defined by the blocks in the workspace.",
  badCode: "Program error:\n%1",
  timeout: "Maximum execution iterations exceeded.",
  trashTooltip: "Discard all blocks.",
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  movements:"movements",
  catLists: "Lists",
  catColour: "Colour",
  catVariables: "Variables",
  catFunctions: "Functions",
  listVariable: "list",
  textVariable: "text",
  httpRequestError: "There was a problem with the request.",
  linkAlert: "Share your blocks with this link:\n\n%1",
  hashError: "Sorry, '%1' doesn't correspond with any saved program.",
  xmlError: "Could not load your saved file. Perhaps it was created with a different version of Blockly?",
  badXml: "Error parsing XML:\n%1\n\nSelect 'OK' to abandon your changes or 'Cancel' to further edit the XML.",

  /**Toolbox begin*/
  /** toolbox的开始 */
  id_start: "Start",
  /** toolbox的动作 */
  id_actions: "Moves",
  /** toolbox的运动 */
  id_moves : "Moves",
  /** toolbox的感知 */
  id_sensors : "Sensors",
  /** toolbox的事件 */
  id_events : "Events",
  /** toolbox的数学 */
  id_math : "Math",
  /** toolbox的控制 */
  id_control : "Control",
  /** toolbox的展示 */
  id_show : "Show",
  /**Toolbox end*/

  /**Start Category begin */
  id_when_start : "Click 'Run' to start",
  id_go_to_start : "Go to start",
  /**Start Category end */

  /** Movement Category begin */
  servo_angle_popup_title :"Set rotation angle for servo motor",
  servo_angle_popup_close:"Close",
  servo_angle_popup_variable:"Variable",
  servo_angle_popup_angle:"Angle",
  servo_angle_popup_cancel :"Cancel",
  servo_angle_popup_ok :"OK",

  rotate_servo_popup_clockwise:"Clockwise",
  rotate_servo_popup_anti_clockwise:"Anti-clockwise",
  rotate_servo_popup_stop:"stop",
  rotate_servo_popup_title:"Rotating Mode",
  rotate_servo_popup_cancel:"Cancel",
  rotate_servo_popup_ok:"OK",

  servo_status_popup_title:"Set status of servo motor",
  servo_status_popup_cancel:"Cancel",
  servo_status_popup_ok:"OK",
  servo_status_popup_locking:"Lock",
  servo_status_popup_adjustable:"Unlock",
  servo_status_popup_tips:"You cannot adjust the corresponding servo for the robot when in locked mode",

  posture_named_popup_title :"Name the action",
  posture_named_popup_cancel :"Cancel",
  posture_named_popup_ok :"OK",
  posture_named_popup_placeholder :"Action",
  posture_named_popup_msg :"Action name contains illegal characters",
  posture_named_too_long : "Action name could not exceed %1 characters",

  gyro_rotate_direction_popup_title :"Select rotation direction for servo motor",
  gyro_rotate_direction_popup_cancel :"Cancel",
  gyro_rotate_direction_popup_ok :"OK",
  gyro_rotate_direction_popup_curVal :"Current value",
  gyro_rotate_direction_popup_course :"Heading angle",
  gyro_rotate_direction_popup_horizontal :"Roll angle",
  gyro_rotate_direction_popup_house :"Pitch angle",

  posture_set_desc : "Open the right switch and set action of robot",
  posture_ok_desc : "Pose after input position name",

  id_servo : 'Servo',
  id_rotate : 'rotate',
  id_degree : 'degree',
  id_in : 'during',
  id_millsecond : 'ms',

  id_rotate_circle : 'Rotate servo 360°',
  id_servos : 'Rotate servos',
  id_run_to : 'Run to',
  id_all: 'All',
  id_lock : 'lock',
  id_unlock : 'unlock',

  servo_id : 'ID',
  servo_angle : 'Angle',
  movement_gesture: 'Action', 
  servo_direction : 'direction',
  servo_speed : 'speed',
  /** Movement Category end */

  /**Control Category begin */
  id_control_wait_for : 'wait for',
  id_control_repeat : 'repeat',
  id_control_repeat_times: 'times',
  id_control_wait:'wait',
  id_control_seconds:'ms',
  id_math_not:'not',
  id_while : 'while',
  id_until : 'until',
  id_repeat : 'repeat',
  /**Control Category end */

  /*Event Category begin*/
  maincontrol_box :"Maincontrol box",
  low_power :"Low power",
  ir_sensor : "IR Sensor",
  reflectance : "reflectance",
  touch_sensor:"Touch sensor",
  status : "status is",
  title_touch_sensor : "Touch sensor setting",
  click : "Click",
  db_click : "Double Click",
  press_hold : "Press Hold",
  release : "Release",
  gyroscope : "Gyroscope",
  angle : "angle",
  axie : 'axie',
  title_device_tilt : "Phone/Tablet status setting",
  phone_pad :"Phone/Tablet",
  tilt_left : "Tilt left",
  tilt_right : "Tilt right",
  tilt_up : "Tilt up",
  tilt_down : "Tilt down",
  tilt_swing : "Tilt swing",
  /*Event Category end*/

  /** Show Category start */
  id_show_play_effect:'Play effect',
  id_show_play_tune:'Play tune',
  id_show_show_emoji:'Show emoji',
  id_show_show_LEDs:'Show LEDs',
  id_show_time_during:'for',
  id_show_time_ms:'ms',
  id_show_times:'times',
  sound_effects_popup_title :"Set sound effects",
  sound_effects_popup_cancel :"Cancel",
  sound_effects_popup_ok :"OK",
  sound_effects_recording_add :"Add new recording",
  sound_effects_recording_delete :"Delete",
  title_setting_light : "Setting Light",
  title_setting_tune : "Setting Tune",
  title_setting_emotion : "Setting Emotion",
  id_all_bright: "all bright",
  id_custom: "custom",
  id_smile: 'smile',
  id_cry : 'cry',
  id_sad : 'sad',
  id_wink : 'wink',
  id_dizzy : 'dizzy',
  id_daze : 'daze',
  id_open_eyes : 'open eyes',
  id_close_eyes : 'close eyes',
  /** Show Category end */

  /**Sensor Category begin */
  id_sensor_IR_sensor: 'IR sensor',
  id_sensor_reflectance_between_obstacle:'reflectance between obstacle',
  id_sensor_touch_sensor:'Touch sensor',
  id_sensor_touch_sensor_status:'status',
  id_sensor_gyroscope:'Gyroscope',
  id_sensor_angle:'angle',
  y_axie:'Pitch angle',
  x_axie:'Roll angle',
  z_axie:'Heading angle',
  servo:'Servo',
  id_sensor_set_gyroscope:'Set gyroscope',
  id_sensor_angle_to_zero:'all angle to zero degrees',
  /**Sensor Category end */

  /**Math Category begin */
  id_math_variables_set_add : "%1 + %2",
  id_set : "set",
  id_to : "to",
  /**Math Category end */

  /* Common section begin */
  btn_name_confirm : "ok",
  btn_name_cancel: "cancel",
  /* Common section end*/

  id_start_info : 'Run',
  id_stop_info : 'Stop',

  title_infrared_sensor : "Infrared Sensor Setting",
  current_value : 'current value',
  distance_1: 'too near',
  distance_2:'near',
  distance_3:'middle',
  distance_4:'far',
  distance_5:'too far',

  /* need to be removed, wait to confirm */
  distance_very_near: 'too near',
  distance_near:'near',
  distance_middle:'middle',
  distance_far:'far',
  distance_very_far:'too far',

  title_bluetooth_connect : "Bluetooth Connect",
  title_time_adjust : "Time Adjust",

  index_back:"Back",
  disconnected : "Disconnected",

    /*项目  begin*/
    //保存项目
    input_rule_msg : "Special characters cannot be entered. A maximum of %1 characters or %2 Chinese characters can be entered.",
    variable_inputrule_msg : "Cannot begin with a digit. Special characters cannot be entered. A maximum of %1 characters or %2 Chinese characters can be entered.",
    add_project_placeholder : "Project name",
    project_pop_ok_btn: "OK",
    project_pop_cancel_btn: "Cancel",
    add_project_pop_title : "Project name",
    add_project_input_check : "Can only enter 16 characters",
    project_name_too_long : "Project name could not exceed %1 characters",
    project_name_popup_msg : "Project name contains invalid characters",
    //是否保存项目
    is_add_project_pop_title :"Save project",
    is_add_project_pop_tips :"Save current project?",
    //项目列表
    project_list_title :"My Projects",
    porject_alert_title:"Error",
    porject_alert_tips:"Tips",
    porject_alert_content:"Sorry, wrong parameter for operating target. Please check!",
    porject_alert_content_01:" Item name already exists. Please enter again.",
    porject_alert_content_02:" Error in base service operation. The error message is:",
    porject_alert_content_03:" Error in data received from base!",
    porject_alert_content_04:" Failed to read project ",
    porject_alert_content_05:" Sorry, the program block in the project file contains errors!",
    porject_alert_content_06:"Project saved",
    porject_alert_btnText:"OK",
    /*项目  end*/
    /*设置音效弹出框音效文件国际化  begin*/
    add_recording_ok:"OK",
    recording_tips:"Recording",
    id_control_break : 'Out of circulation',
    id_blue_disconnect : 'Bluetooth is not connected',
    id_ok : 'OK',
    recording_title:"Recording",
    recording_cancel:"Canncel",
    recording_ok:"OK",
    recording_placeholder:"Please enter a recording name",
    recording_popup_title:"Recorded file name input",
    recording_name_popup_msg : "Recording name contains invalid characters",
    animal:"Animal",
    machine:"Machine",
    recording:"Recording",
    bear:"Bear",
    bird:"Bird",
    chicken:"Chicken",
    cow:"Cow",
    dog:"Dog",
    elephant:"Elephant",
    giraffe:"Giraffe",
    horse:"Horse",
    lion:"Lion",
    monkey:"Monkey",
    pig:"Pig",
    rhinoceros:"Rhinoceros",
    sealions:"Sealions",
    tiger:"Tiger",
    walrus:"Walrus",
    ambulance:"Ambulance",
    busy_tone:"Busy tone",
    carhorn:"Carhorn",
    carhorn1:"Carhorn1",
    doorbell:"Doorbell",
    engine:"Engine",
    laser:"Laser",
    meebot:"Meebot",
    police_car_1:"Police_car_1",
    police_car_2:"Police_car_2",
    ringtones:"Ringtones",
    robot:"Robot",
    telephone_call:"Telephone Call",
    touch_tone:"Touch Tone",
    wave:"Wave",
     /*情绪  */

    /*设置音效弹出框音效文件国际化  end*/

    variable_named_popup_placeholder :"Variable",
    title_variable_set : 'Set Variable',
    variable_named_popup_msg :"variable name contains illegal characters",
    variable_named_too_long : "variable name could not exceed %1 characters",
    speed:"speed",
    speed_VS:"very slow",
    speed_S:"slow",
    speed_M:"middle",
    speed_V:"fast",
    speed_VF:"very fast",
    speed_no_value:"Current equipment wheelless steering",
    speed_only_360_value:"Current equipment has no angle mode servo",
    lights_tips:"The current model is not connected to any light",
    exit_tips:"The current program is not saved, whether to continue to exit？",
    project_has_no_change:"The current program has not changed",
    close_blue:"Bluetooth is connected, it does disconnect?",
    posture_link:"The model is not connected. Please connect the model first",
    posture_link_popup_title:"The model connect",
    posture_link_popup_cancel:"cancel",
    posture_link_popup_ok:"ok",
    recording_name_repeat:"Recorded Name Repeat",
    recording_named_too_long : "The name is too long, please input again",
    recording_alert_title:"Error",
    recording_alert_content:"privilege grant failed",
    recording_alert_ok:"OK",
    help_title:"Block introduction",
    newProjectName:"NewProject",
    sysVoiceName:"voice",
    exit_popup_cancel:"Cancel",
    exit_popup_ok:"OK",
    exit_popup_title:"Tips",
    recording_data_tips:"No records",
    infrared_tips:"Infrared sensor is not connected to the current model",
    touch_tips:"The touch sensor is not connected to the current model",
    gyroscope_tips:"The gyro sensor is not connected to the current model",


    id_infinite_loop_error:'Program exit due to out of memory, please return back and retry',
    // 新手指引
    save_project_msg:"Tap here to save your program!",
    projectlist_msg:"View the programs Jimu has learned and mastered and create new programs for it!",
    swift_msg:"Tap here to view the swift code!",
    help_msg:"Tap here if you have any questions!",
    run_msg:"Let Jimu move as you have programmed it!",
    go_skip:"Skip",
    // 舵机模式错误的提示
    servo_mode_error : 'servo mode error',
    // 设置舵机模式的title
    set_servo_mode : 'Set Servo Mode',

    id_show_scenelight:'Show Light Display',
    title_setting_scenelight : "Set Up Light Display",
    id_happy:"Happy",
    id_jingya:"Surprised",    
    id_relei:"Tears",
    id_leiguang:"Flashing Tears",
    id_shangxin:"Sad",
    id_yun:"Dizzy",
    id_fadai:"Dazed",
    id_zhayan:"Blink",
    id_haixiu:"Shy",
    id_shanshuo:"Flash",
    id_huxi:"Breath",
    id_fengshan:"Fan",
    id_yugua:"Wipers",

    id_deng:"7Colored Lights",
    id_disco:"Disco",
    id_caise:"Color Stacking",
    id_sanyuanse:"Primary Colors",
    select_all:"All",
    // 没有普通舵机，切换舵机模式的提示
    no_common_servo_info : "There is currently no angle mode servo (can rotate within a designated range). Do you need to set one up?",
    // 没有轮模式舵机，切换舵机模式的提示
    no_circle_servo_info : "There is currently no wheel mode servo (can rotate 360°). Do you need to set one up?",
    //当前的块ID不对，请删除后重新设置
    touch_tips_error : 'The current block ID is not correct, please delete it and reset',

	shumaguan:"Digital Tube",
    show_time:"Show time",
    show_number:"Show number",
    show_count:"Show timer",
    stop_count:"Stop timer",
    show_countdown:"Show countdown",
    set_countdown:"Countdown setting",
    let_show_number:"Show number with nixie tube",
    let_show_time:"Show time with nixie tube",
    let_show_count:"Show timer with nixie tube",
    let_stop_count:"Stop timer with nixie tube",
    let_show_countdown:"Show countdown with nixie tube",
    let_led_scenelight:"Show scene lighting with LED lights",
    long_lighton:"Always on",
    no_project_tip:"No project, click + on the upper right corner to create one!",
    block_error_info : 'Current block exist error, please check it and try again.',


    delay : "delay",
  /*音效--情绪  begin  */
    command:"Command",
    emotion:"Emotion",
    transfiguration:"Transform",
    happy:"Happy",
    yawn:"Yawn",
    snoring:"Snoring",
    surprise:"Surprise",
    actingcute:"Cute",
    angry:"Angry",
    fail:"Failure",
    lose:"Lost",
    received:"Receive",
    complete:"Complete",
    cover:"Shield",
    move:"Move",
    doubt:"Doubt",
    nonsense:"Raving",
    emotion_engine:"Engine",
    cheerful:"Cheerful",
    support:"Support",
    yes:"Yes",
    come_and_play:"Song 1",
    flexin:"Song 2",
    london_bridge:"Song 3",
    yankee_doodle:"Song 4",
  /*音效--情绪  end  */

  /*------------------新增课程翻译 start-------------------------------------*/
  /*--课程指引翻译--*/
    video_desc:"Tap here to have a look at task description videos!",
    help_desc:"Tap here to view helpful tips when you have a problem!",

  /*课程公共翻译 start*/
    course_show:"View",
    course_hide:"Hide",
    see_example:"View sample",
    course_tips:"Cannot be viewed now!",
    step_1:"Step 1",
    step_2:"Step 2",
    step_3:"Step 3",
    step_4:"Step 4",
    task:"Mission",
  /*课程公共翻译 end*/

  /*------请按照这个规范来命名课程key------*/
  /*----课程2 翻译 start----*/
    course2_title:"Wake-up Astron",
    c2_startstory_1:"Next, install the program for Astron.",
    c2_endstory_1:"Hey, I'm back!",
    c2_endstory_2:"Hello, Astron!",
    c2_step_page1_1:"Mission",
    c2_step_page1_2:"Combine the program block in correct order to wake up Astron:",
    c2_step_page1_3:"1.Show emoji: blink 3 times",
    c2_step_page1_4:"2.Play effect (Emotion: Doubt)",
    c2_step_page1_5:"3.Wait for 5000 milliseconds",
    c2_step_page2_1:"Step 1",
    c2_step_page2_2:"Combine the program block in order",
    c2_step_page3_1:"Step 2",
    c2_step_page3_2:"Click 'Run' to start",
  /*-----课程2 翻译 end-----*/

  /*----课程3 翻译 start----*/
    course3_title:"Working test",
    c3_startstory_1:"After working test, we need to test the performance of Rover.",
    c3_endstory_1:"Great! Astron's motion ability is normal!",
    c3_endstory_2:"Ok, let's get going!",
    c3_step_page1_1:"Mission",
    c3_step_page1_2:"Help Astron learn the basic movement like walking:",
    c3_step_page1_3:"1.Move Forward",
    c3_step_page1_4:"2.Back Off",
    c3_step_page1_5:"3.Wait for 2000 milliseconds",
    c3_step_page1_6:"4.Move Left",
    c3_step_page1_7:"5.Move Right",
    c3_step_page2_1:"Combine the program block in order",
    c3_step_page3_1:"Set the wait time to 2000 ms",
  /*-----课程3 翻译 end-----*/

  /*----课程4 翻译 start----*/
    course4_title:"Landing planet",
    c4_startstory_1:"The gravity of the Alpha star is 2/5 of the earth.",
    c4_startstory_2:"Quickly switch to low gravity mode for landing.",
    c4_endstory_1:"Yoho, you successfully logged in to the Alpha Star!",
    c4_step_page1_1:"Astron has landed planet, we need to switch to low gravity mode walking on the planet, now Astron has complete four steps including standby, lift right foot, lower right foot, lift left foot, we must help Astron set the last step which is 'lower left foot",
    c4_step_page1_2:"1.Lower left foot",
    c4_step_page1_3:"Servo1:0° Servo2:40° Servo3:40° Servo4:0°",
    c4_step_page2_1:"Lower left foot",
    c4_step_page2_2:"Servoes control Astron walking, we need to set servoes' angle parameters to help Astron lower left foot:",
    c4_step_page2_3:"1.Turn on the steering gear.",
    c4_step_page2_4:"2.Select servo ID.",
    c4_step_page2_5:"3.Set the servo to rotate counterclockwise.",
    c4_step_page2_6:"4.Set the servo to rotate clockwise.",
  /*-----课程4 翻译 end-----*/

  /*----课程5 翻译 start----*/
    course5_title:"Go ahead",
    c5_startstory_1:"There is still some distance from the Alpha base.",
    c5_startstory_2:"We must hurry up to the destination.",
    c5_endstory_1:"We finally reached the Alpha base!",
    c5_step_page1_1:"Mission",
    c5_step_page1_2:"Astron successfully lands the planet, there is still some distance from the base, we must help Astron to the base:",
    c5_step_page1_3:"1. Play effect (Emotion: Cheerful)",
    c5_step_page1_4:"2. Repeat the move forward action for 3 times.",
    c5_step_page2_1:"Step 1",
    c5_step_page2_2:"Astron makes a cheerful sound.",
    c5_step_page3_1:"Step 2",
    c5_step_page3_2:"Repeat the move forward action 3 times.",
  /*-----课程5 翻译 end-----*/

  /*----课程6 翻译 start----*/
    course6_title:"Explore forward",
    c6_startstory_1:"Strange, why is the Alpha star base in darkness?",
    c6_startstory_2:"Let me check with infrared detectors.",
    c6_endstory_1:"Yoho, you successfully entered the base!",
    c6_step_page1_1:"Mission",
    c6_step_page1_2:"Now the Alpha base is in darkness, we must help Astron to avoid obstacles, and enter the base secretly.",
    c6_step_page1_3:"1. Move Forward",
    c6_step_page1_4:"2. Go to start",
    c6_step_page1_5:"1. When the distance between the infrared sensor and the obstacle less than 10",
    c6_step_page1_6:"2. Stand by",
    c6_step_page1_7:"3. Move Right",
    c6_step_page1_8:"4. Move Forward",
    c6_step_page1_9:"5. Go to start",
    c6_step_page2_1:"How does Astron detect obstacles?",
    c6_step_page2_2:"1. Astron is equipped with an infrared sensor.",
    c6_step_page2_3:"2. The infrared sensor can detect obstacles.",
    c6_step_page2_4:"a. The transmitter sends out infrared light.",
    c6_step_page2_5:"b. The infrared light reflects off of obstacles.",
    c6_step_page2_6:"c. The receiver receives the reflected infrared light.",
    c6_step_page2_7:"d. Distance is determined based on light density.",
    c6_step_page2_8:"3. Detect distance",
    c6_step_page2_9:"4. Detect patterns",
    c6_step_page2_10:"a. The closer an object is, the stronger the reflection of light.",
    c6_step_page2_11:"b. The lighter the color of the object, the stronger the reflection of light.",
    c6_step_page3_1:"Infrared sensor program block application 1",
    c6_step_page3_2:"As long as conditions are right for the infrared sensor, the program block criteria will be instantly executed.",
    c6_step_page3_3:"1. Select infrared ID",
    c6_step_page3_4:"2. Set judgment conditions",
    c6_step_page3_5:"3. Set judgment distance",
    c6_step_page4_1:"Step 1",
    c6_step_page4_2:"Astron moves forward again.",
    c6_step_page4_3:"To return to the program block starting point, re-execute the program block.",
    c6_step_page5_1:"Step 2",
    c6_step_page5_2:"Astron avoids obstacles.",
    c6_step_page5_3:"1. Set the distance between the infrared sensor and the obstacle to less than 10.",
    c6_step_page5_4:"2. Astron executes the avoidance action then keep walking forward.",
    c6_step_page6_1:"Step 3",
    c6_step_page6_2:"Astron moves forward again.",
    c6_step_page6_3:"To return to the program block starting point, re-execute the program block.",

  /*-----课程6 翻译 end-----*/

  /*----课程7 翻译 start----*/
    course7_title:"Send a signal",
    c7_startstory_1:"God, this is part of Rover!",
    c7_startstory_2:"Rover must have been in danger.",
    c7_startstory_3:"Report the situation here to Jimu Planet at first.",
    c7_startstory_4:"Send radio signal immediately.",
    c7_endstory_1:"Good, we successfully sent a signal!",
    c7_step_page1_1:"Mission",
    c7_step_page1_2:"Astron have reached the base, quickly send radio signal to the headquarters:",
    c7_step_page1_3:"1. Stand by",
    c7_step_page1_4:"2. Repeat sending the signal for 3 times.",
    c7_step_page1_5:"Sending orange signal for 1000 miniseconds.",
    c7_step_page1_6:"Wait for 1000 miniseconds.",
    c7_step_page1_7:"Sending red signal for 2000 miniseconds.",
    c7_step_page1_8:"Wait for 2000 miniseconds.",
    c7_step_page1_9:"Sending green signal for 1000 miniseconds.",
    c7_step_page1_10:"Wait for 1000 miniseconds.",
    c7_step_page2_1:"How does Astron send a signal?",
    c7_step_page2_2:"Use the 'display light' program block",
    c7_step_page2_3:"1. Set the light color.",
    c7_step_page2_4:"2. Select color.",
    c7_step_page2_5:"3. Check to select, all eyes will start at the same time.",
    c7_step_page2_6:"4. Set the display light duration.",
    c7_step_page3_1:"Step 1",
    c7_step_page3_2:"Astron standby ",
    c7_step_page4_1:"Step 2",
    c7_step_page4_2:"The signal is sent 3 times.",
    c7_step_page5_1:"Step 3",
    c7_step_page5_2:"Set up the signal",
    c7_step_page5_3:"1. Astron sends the orange signal for 1000 ms, waits for 1000 ms.",
    c7_step_page5_4:"2. Astron sends the red signal for 2000 ms, waits for 2000 ms.",
    c7_step_page5_5:"3. Then, Astron sends the green signal for 1000 ms, waits for 1000 ms.",
  /*-----课程7 翻译 end-----*/

  /*----课程8 翻译 start----*/
    course8_title:"Looking for clues",
    c8_startstory_1:"There must be important clues.",
    c8_startstory_2:"I need to find other clues to save Rover.",
    c8_endstory_1:"Great! I found Rover's build drawings!",
    c8_step_page1_1:"Mission",
    c8_step_page1_2:"Astron finds remains of Rover in the base, and decides to search clues to save Rover:",
    c8_step_page1_3:"1. Repeat move forward action, until the distance between the infrared sensor and the obstacle less than 10.",
    c8_step_page1_4:"2. Play effect (Emotion: Happy)",
    c8_step_page1_5:"3. Show a happy emoji for 3 times",
    c8_step_page1_6:"4. Execute a twist action",
    c8_step_page2_1:"Infrared sensor program block application 2",
    c8_step_page2_2:"Get the judgement results from the infrared sensor.",
    c8_step_page2_3:"1. If the value returned by the infrared sensor satisfies the judgement condition you set, the judgment result is true.",
    c8_step_page2_4:"2. If the value returned by the infrared sensor does not satisfy the judgement condition you set, the judgment result is false.",
    c8_step_page3_1:"Step 1",
    c8_step_page3_2:"Repeat the forward value until a clue is discovered.",
    c8_step_page3_3:"Astron repeats the forward value until an infrared event is established.",
    c8_step_page4_1:"Step 2",
    c8_step_page4_2:"Set the distance between the infrared sensor and the obstacle less than 10.",
    c8_step_page5_1:"Step 3",
    c8_step_page5_2:"Astron found a clue and happily twists his body.",
  /*-----课程8 翻译 end-----*/

  /*----课程10 翻译 start----*/
    course10_title:"Radar detection",
    c10_startstory_1:"Rover, what happened?",
    c10_startstory_2:"We were attacked by an alien planet, ",
    c10_startstory_3:"and AstroBot was taken away!",
    c10_startstory_4:"Hurry! Use the radar detector to find AstroBot's location!",
    c10_startstory_5:"Good!",
    c10_endstory_1:"Find AstroBot's last location!",
    c10_endstory_2:"Awesome! My Rover",
    c10_step_page_1:"Now AstroBot has been catched by unknown organism, we must help Rover to search location of AstroBot with radar detector:",
    c10_step_page_2:"1.Play sound effect(Machine:Busy tone).",
    c10_step_page_3:"2.Rotate radar(Servo 5) 3 times.",
    c10_step_page_4:"Firstly rotate to 40° with 400ms",
    c10_step_page_5:"Then rotate to -50° with 400ms",
    c10_step_page_6:"Rover radar",
    c10_step_page_7:"Radar movement can be controlled by setting servo 5",
    c10_step_page_8:"Set sound effects to \"busy tone\"",
    c10_step_page_9:"Rotate radar 3 times.",
    c10_step_page_10:"Control radar rotation range",
    c10_step_page_11:"Set sound effects",
    c10_step_page_12:"1.Rotate radar to 40°",
    c10_step_page_13:"2.Rotate radar to -50°",
  /*-----课程10 翻译 end-----*/
  /*----课程11 翻译 start----*/
    course11_title:"Move forward and back",
    c11_startstory_1:"Let's go rescue AstroBot!",
    c11_startstory_2:"Ok, full speed ahead!",
    c11_startstory_3:"Uh oh, something is wrong with my motion program",
    c11_startstory_4:"I'll help you fix it!",
    c11_endstory_1:"I can play!",
    c11_endstory_2:"Astron, you're great!",
    c11_endstory_3:"Haha, as clever as me!",
    c11_step_page_a:"Now the athletic ability of Rover diminished, we must help Rover to move forward and back:",
    c11_step_page_0:"1.Moves forward at medium speed(M).",
    c11_step_page_1:"servo 1:+M, servo 2:-M servo 3:+M servo 4:-M",
    c11_step_page_2:"2.Wait for 2000ms.",
    c11_step_page_3:"3.Moves backward at medium speed(M).",
    c11_step_page_4:"servo 1:-M, servo 2:+M servo 3:-M servo 4:+M",
    c11_step_page_5:"4.Wait for 3000ms",
    c11_step_page_6:"Rover wheels",
    c11_step_page_7:"Rover pans by rotating the servo",
    c11_step_page_8:"1.Right front wheel (servo 1)",
    c11_step_page_9:"2.Left front wheel (servo 2)",
    c11_step_page_10:"3.Right rear wheel (servo 3)",
    c11_step_page_11:"4.Left rear wheel (servo 4)",
    c11_step_page_12:"How does Rover move forward and back?",
    c11_step_page_13:"1.The wheels rotate forward at the same speed and Rover moves forward",
    c11_step_page_14:"2. The wheels rotate backward at the same speed and Rover moves backward",
    c11_step_page_15:"3. Use the 360° rotation program block to control the rotation direction and speed of the servo",
    c11_step_page_16:"Rover moves forward",
    c11_step_page_17:"1.Rover moves forward at medium speed(M).",
    c11_step_page_18:"2.Set the move forward time to 2000 ms",
    c11_step_page_19:"Rover moves backward",
    c11_step_page_20:"1.Rover moves backward at medium speed(M).",
    c11_step_page_21:"2.Set the move backward time to 3000 ms",
  /*-----课程11 翻译 end-----*/

  /*----课程12 翻译 start----*/
    course12_title:"Turn left and right",
    c12_startstory_1:"There's a bend in the road up ahead.",
    c12_startstory_2:"Don't panic, just watch me.",
    c12_endstory_1:"Hehe, around the bend.",
    c12_endstory_2:"Not bad!",
    c12_step_page1_1:"Mission",
    c12_step_page1_2:"Encounter continuous corners on the way to save AstroBot, We need to help Rover to turn left or right:",
    c12_step_page1_3:"1.Moves forward at medium speed(M).",
    c12_step_page1_4:"servo1:+M servo2:-M servo3:+M servo4:-M",
    c12_step_page1_5:"2.Wait for 1000ms.",
    c12_step_page1_6:"3.Turn left:set Rover's left wheel to the slowest setting(VS) and the right wheel to the fastest setting(VF).",
    c12_step_page1_7:"servp1:+VF servo2:-VS servo3:+VF servo4:-VS",
    c12_step_page1_8:"4.Wait for 3000ms",
    c12_step_page1_9:"5.Turn right:set Rover's left wheel to the fastest setting(VF) and the right wheel to the slowest setting(VS).",
    c12_step_page1_10:"servo1:+VS servo2:-VF servo3:+VS servo4:-VF",
    c12_step_page1_11:"6.Wait for 3000ms",
    c12_step_page2_1:"How does Rover turn left or right?",
    c12_step_page2_2:"1. When the wheels are rotating in the same direction but the right wheel rotates faster, Rover will turn to the left.",
    c12_step_page2_3:"2. When the wheels are rotating in the same direction but the left wheel rotates faster, Rover will turn to the right.",
    c12_step_page3_1:"Step 1",
    c12_step_page3_2:"Rover Moves forward",
    c12_step_page3_3:"1.Moves forward at medium speed(M).",
    c12_step_page3_4:"2.Set the move forward time to 1000 ms",
    c12_step_page4_1:"Step 2",
    c12_step_page4_2:"Rover turns left",
    c12_step_page4_3:"1.Set Rover's left wheel to the slowest setting(VS) and the right wheel to the fastest setting(VF).",
    c12_step_page4_4:"2.Set the move forward time to 3000 ms.",
    c12_step_page5_1:"Step 3",
    c12_step_page5_2:"Rover turn right.",
    c12_step_page5_3:"1.Set Rover's left wheel to the fastest setting(VF) and the right wheel to the slowest setting(VS).",
    c12_step_page5_4:"2.Set the move forward time to 3000 ms."
  /*-----课程12 翻译 end-----*/


  /*------------------新增课程翻译 end-------------------------------------*/
};
