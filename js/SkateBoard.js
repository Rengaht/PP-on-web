function SkateBoard(x,y,wid,hei){
	this._x=x;
	this._y=y;
	this._z=random(-20,-10);

	this._wid=wid;
	this._hei=hei;

	this._wheel_rad=random(.3,.6)*hei;
	this._board_rad=random(.2,.6)*wid;
	this._mwind=parseInt(random(2,5));

	
	this._shape;

	this._shapeObject;
	this._lineObject;
	this._geo;
	
	this._weelShape_1;
	this._weelShape_2;
	this._weelLine_1;
	this._weelLine_2;

	
	
}
SkateBoard.prototype.Draw=function(draw_fill,sx_,sy_){



	var draw_portion=Math.abs(Math.sin(frameCount/80));

	push();
	translate(this._x+sx_,this._y+sy_);

	if(draw_fill){
		fill(255,255,255);
		noStroke();
	}else{
		noFill();
		stroke(0,180);
	}

	beginShape();
	vertex(0,0);
	bezierVertex(-this._board_rad,0,
								-this._board_rad*1.3,this._hei,
								0,this._hei);
	bezierVertex(this._wid/3,this._hei+this._hei*.1*draw_portion,
							  this._wid/3*2,this._hei+this._hei*.1*draw_portion,
				 			  this._wid,this._hei);
	bezierVertex(this._wid+this._board_rad*1.3,this._hei,
							  this._wid+this._board_rad,this._hei*.1*draw_portion,
							  this._wid,0);	
	bezierVertex(this._wid/3*2,this._hei*.1*draw_portion,
							  this._wid/3*2,-this._hei*.1*draw_portion,
				 			  0,0);

	endShape();

	

	this.drawWheel(0,this._hei+this._wheel_rad/2);
	this.drawWheel(this._wid,this._hei+this._wheel_rad/2);


	this.drawWind(-this._wid*2,this._hei*1.5,this._wid/3,this._hei/2);

	pop();

};
SkateBoard.prototype.drawWheel=function(wx,wy){


	// for(var i=0;i<3;++i){
	var rad=this._wheel_rad/2;//-wheel_rad*i/10;
	push();
	translate(wx,wy);
	rotate(random(TWO_PI));
	beginShape();
		vertex(0,rad/2);
		bezierVertex(-rad,rad/2,
							-rad,-rad/2,
						 	0,-rad/2);
		bezierVertex(rad,rad/2,
							rad,rad/2,
						 	0,rad/2);		
	endShape();

	pop();
	//shape.rotate((float)frameCount/2+i/2);
	
};
SkateBoard.prototype.drawWind=function(wx,wy,wwid,whei){
	push();
	translate(wx,wy);

	noFill();
	whei/=3;
	for(var i=0;i<this._mwind;++i){
		wwid*=random(.5,2);
		translate(wwid*.3*sin(frameCount),-whei);
		beginShape();
			vertex(wwid,0);
			bezierVertex(wwid*random(.1,.5),whei*.1*random(-1,1),
						 wwid*random(.6,.9),whei*.1*random(-1,1),
						 0,0);

			// PVector ctrl=new PVector(-whei/2,0);
			// ctrl.rotate(PI*sin((float)frameCount));
			// pg.bezierVertex(-wwid/4*random(.5,1.5),0,
			// 			ctrl.x,ctrl.y-whei/4,
			// 			0,-whei/4);
			
		endShape();
		arc(0,-wwid/8,wwid/4,wwid/4,HALF_PI,PI/4+PI/2*3*sin(frameCount/2));
		// arc(0,wwid/8,wwid/4,wwid/4,PI/2*3-PI/2*3*sin(frameCount/2),PI/2*3);
	}

	pop();
};
