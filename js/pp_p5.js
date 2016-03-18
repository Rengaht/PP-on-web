var M_MODE=3;
var DDEBUG=false;

var mpas=5;
var _pas;

var mid_pos;

var _anim_mode_change=new FrameAnimation(30);
var play_mode=-1;
var mode_ang;

var RoadColor=[];

var button_reset;

var sound_back=[];
var sound_trans=[];

function setup(){
	createCanvas(windowWidth, windowHeight);
	RoadColor[0]=color(186,213,167);
	RoadColor[1]=color(218,218,218);
	RoadColor[2]=color(48,83,139);


	button_reset=createImg("../image/reset.png");//createButton('RE');
	button_reset.position(20,20);
	button_reset.mousePressed(resetPAnimal);

	var button_add=createImg("../image/add.png");
	button_add.position(80,20);
	button_add.mousePressed(addPAnimal);

	var button_dead=createImg("../image/dead.png");
	button_dead.position(140,20);
	button_dead.mousePressed(deadPAnimal);

	var text=createDiv('&copy; 2016 rengtsaipp.com');
	text.position(width/2,height-20);

	sound_back[0]=createAudio('../sound/PIPI_1_1.ogg');
	sound_back[1]=createAudio('../sound/PIPI_1_2.ogg');
	sound_back[2]=createAudio('../sound/PIPI_1_3.ogg');

	sound_trans[0]=createAudio('../sound/PIPI_1_transfer_1.ogg');
	sound_trans[1]=createAudio('../sound/PIPI_1_transfer_2.ogg');
	sound_trans[2]=createAudio('../sound/PIPI_1_transfer_3.ogg');


	mid_pos=createVector(0,0);
	resetPAnimal();

	changeMode(0);
	mode_ang=0;
	mouseX=windowWidth/2;
}
function draw(){
	background(255);

	_anim_mode_change.update();
	var poses=updateMidPos();

	

	push();
	translate(width/2-mid_pos.x,height/2-mid_pos.y);
	
	drawBackLine(mid_pos,poses)

	for(var pa in _pas) _pas[pa].Draw(true);
	for(var pa in _pas) _pas[pa].Draw(false);
	
	pop();
	
	if(DDEBUG){
		fill(0);
		text(frameRate(),100,100);
		text(_anim_mode_change.getPortion(),100,120);
	}

	checkMode();
}


function updateMidPos(){

	var poses=[];
	var len=_pas.length;
	for(var i=0;i<len;++i){
		poses.push(createVector(_pas[i]._x,_pas[i]._y));
	}


	var tmp=createVector(0,0);
	for(var i=0;i<len;++i){
		tmp.add(_pas[i]._x,_pas[i]._y,0);
	}
	tmp.mult(1.0/len);

	if(mid_pos.x==0 && mid_pos.y==0){
		mid_pos=tmp;		
		return poses;
	}

	//float mid_constrain=5;
	// mid_pos.x+=constrain(tmp.x-mid_pos.x,0,mid_constrain);
	// mid_pos.y+=constrain(tmp.y-mid_pos.y,-mid_constrain,mid_constrain);

	mid_pos=tmp;

	
	
	for(var i=0;i<len;++i){
		_pas[i].checkSpeed(mid_pos);
		_pas[i].checkCollide(poses);
	}
	
	return poses;

}

function checkMode(){

	mode_ang=map(mouseX,0,windowWidth,-PI/4,PI/4);

	var new_mode=0;
	if(mode_ang<-PI/8) new_mode=1;
	else if(mode_ang>PI/8) new_mode=2;

	if(new_mode!=play_mode) setMode(new_mode);
	
	
}

function changeMode(){
	setMode((play_mode+1)%M_MODE);
}
function setMode(mode_){

	console.log('change mode:'+mode_)

	if(play_mode>-1) sound_back[play_mode].stop();	

	play_mode=mode_;

	if(play_mode>-1) sound_back[play_mode].loop();

	sound_trans[parseInt(random(3))].play();

	var len=_pas.length;
	for(var i=0;i<len;++i){
	 	_pas[i].Change(mode_);
	 	
	}			
	_anim_mode_change.restart();

}

function keyPressed(){
	switch(key){
		case 'A':		
			changeMode();
			break;
		case 'r':
			resetPAnimal();
			break;
	}	
}

function resetPAnimal(){
	_pas=new Array();
	maps=5;
	var tmp_pos=0;
	for(var i=0;i<mpas;++i){
		var tmp_h=random(0.6,1.2)*height/mpas;
		
		_pas[i]=new PAnimal(0,tmp_pos+tmp_h);
		tmp_pos+=tmp_h;

	}
	setMode(play_mode);
}
function addPAnimal(){
	if(mpas>10) return;

	_pas.push(new PAnimal(0,random(0.6,1.2)*height/mpas));
	_pas[mpas].Change(play_mode);
	mpas++;
}
function deadPAnimal(){
	if(mpas<2) return;

	_pas.splice(mpas-1,1);
	mpas--;
}