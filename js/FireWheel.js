function FireWheel(x,y,rad){
	this._x=x;
	this._y=y;
	this._rad=rad;

	this._mcurve=parseInt(random(8,15));
	this._phi=random(TWO_PI);
	this._phi2=random(TWO_PI);	
}

FireWheel.prototype.SetPos=function(vec){
	this._x=vec.x;
	this._y=vec.y;
}

FireWheel.prototype.Draw=function(draw_fill,sx_,sy_){
	var draw_portion=sin(frameCount/5+this._phi);
	
	if(draw_fill){
		fill(255,this._phi/TWO_PI*255,0,255);
		noStroke();
	}else{
		stroke(0,80);
		noFill();
	}

	push();
	translate(this._x+sx_,this._y+sy_);
	var ang=frameCount/4+this._phi;//q(sin(draw_portion))*PI/4+PI/6;
	//pg.translate(rad/2,0);
	
	//pg.translate(-rad/2,0);
	
		beginShape();

			vertex(this._rad/2,0);
			var etheta=TWO_PI/this._mcurve;
			for(var i=0;i<=this._mcurve;++i){
				var theta=i*etheta;
				var random_strength1=random(1.5,5);
				var random_strength2=random(1.5,5);
				// if(theta>PI){
				// 	random_strength1*=2;
				// 	random_strength2*=2;
				// }
				if(theta>=PI/2 && theta<=PI/2*3){
					// pg.bezierVertex(rad/2*cos(theta+etheta)*random_strength1,rad/2*sin(theta+etheta)*random_strength1,
					// 			rad/2*cos(theta+etheta)*random_strength2,rad/2*sin(theta+etheta)*random_strength2,
					vertex(this._rad/2*cos(theta+etheta/2)-this._rad*random(1.5,(draw_fill)?4.5:2.5)*(1-abs(theta-PI)/PI*2),this._rad/2*sin(theta+etheta/2));
					vertex(this._rad/2*cos(theta)*random(0.5,2.5),this._rad/2*sin(theta));
				}else
					vertex(this._rad/2*cos(theta)*random(0.5,1.5),this._rad/2*sin(theta));
			}
		endShape();

	if(!draw_fill){ 
		rotate(ang);
		beginShape();
			vertex(this._rad/2,0);
			// float etheta=TWO_PI/(float)mcurve;
			for(var i=0;i<=this._mcurve;++i){
				var theta=i*etheta;
				// float random_strength1=random(1,1.5);
				// float random_strength2=random(1,1.5);
				// pg.bezierVertex(rad/2*cos(theta+etheta/2)*random_strength1,rad/2*sin(theta+etheta/2)*random_strength1,
				// 				rad/2*cos(theta+etheta/2)*random_strength2,rad/2*sin(theta+etheta/2)*random_strength2,
				// 				rad/2*cos(theta)*random(.6,1),rad/2*sin(theta)*random(.6,1));
				vertex(this._rad/2*cos(theta),this._rad/2*sin(theta));
			}
		endShape();
		
		//float etheta=TWO_PI/(float)mcurve;
		for(var i=0;i<=this._mcurve;++i){
			var theta=i*etheta;
			bezier(0,0,
					 this._rad/4*cos(theta+etheta/2),this._rad/4*sin(theta+etheta/2),
					 this._rad/4*cos(theta+etheta/2),this._rad/4*sin(theta+etheta/2),
					 this._rad/2*cos(theta)*random(.8,1),this._rad/2*sin(theta)*random(.8,1));

		}
	}
		
	pop();
	//for(int i=0;i<5;++i) drawTurb(x-random(width-x),random(-cur_wid,cur_wid),pg);
	
}