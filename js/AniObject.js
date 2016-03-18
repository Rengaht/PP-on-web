function AniObject(x_,y_){
	this.x=x_;
	this.y=y_;

	//this.geo;
	// this.mat;
	this.curve;
	this.curveObject;
}
AniObject.prototype.Init=function(scene_){
	this.Update();
	scene_.add(this.curveObject);
};
AniObject.prototype.Update=function(scene_){

	if(scene_!==undefined) scene_.remove(this.curveObject);

	this.curve = new THREE.CubicBezierCurve(
		new THREE.Vector3(-100,0,0),
		new THREE.Vector3(-50,150+random(-100,100),0),
		new THREE.Vector3(200,150+random(-100,100),0),
		new THREE.Vector3(100,0,0 )
	);

	var path = new THREE.Path(this.curve.getPoints(50));

	var geometry = path.createPointsGeometry( 50 );
	geometry.verticesNeedUpdate=true;
	var material = new THREE.LineBasicMaterial({color:0xff0000});

	// Create the final Object3d to add to the scene
	this.curveObject = new THREE.Line(geometry,material);

	if(scene_!==undefined) scene_.add(this.curveObject);
};