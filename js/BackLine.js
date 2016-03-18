



function drawBackLine(mid_,poses_){
	
	var ntheta=(play_mode==1)?PI/4:((play_mode==2)?-PI/8:0);
	var ltheta=(play_mode==1)?0:((play_mode==2)?PI/4:-PI/8);
	var theta=lerp(ltheta,ntheta,_anim_mode_change.getPortion());

	var npos=poses_.length;
	poses_.sort(function(a,b){
		return a.y-b.y;
	});


	push();
	translate(mid_.x,mid_.y);
	rotate(-mode_ang);	
	translate(-mid_.x,-mid_.y);

	noStroke();

	var cy=40/cos(theta);

	if(npos>0){
		fill(238,129,62);
		rect(mid_.x-width,poses_[0].y-cy/2,width*2,cy/2);

		fill(129,162,92);
		rect(mid_.x-width,poses_[0].y-cy*1.7,width*2,cy*1.2);
	}else{
		fill(238,129,62);
		rect(mid_.x-width,height/2-cy/2,width*2,cy/2);

		fill(129,162,92);
		rect(mid_.x-width,height/2-cy*1.7,width*2,cy*1.2);
	}

	//pg.fill(lerpColor(RoadColor[(play_mode-1+3)%3],RoadColor[play_mode],_anim_mode_change.GetPortion()));
	var x=width*2*(1-_anim_mode_change.getPortion());
	for(var i=0;i<npos;++i){
		
		var h=(i+1<npos)?(poses_[i+1].y-poses_[i].y-1):height;

		fill(RoadColor[(play_mode-1+3)%3]);
		rect(mid_.x-width,poses_[i].y,x,h);	
		fill(RoadColor[play_mode]);
		rect(mid_.x-width+x,poses_[i].y,width*2-x,h);	

		//println(poses_.get(i));
	}



	
	var num=floor(mid_.x/300);
	for(var i=0;i<5;++i){
		var k=num-(i-2);
		fill(0);
		textSize(10);
		if(npos>0) text(k.toString(),k*300,poses_[0].y-cy/2-10);
		else text(k.toString(),k*300,height/2-cy/2-10);
	}
	pop();
}