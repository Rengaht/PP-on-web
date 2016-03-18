
var frameCount=0;
var width=window.innerWidth;
var height=window.innerHeight;

var renderer;


var _scene_screen;
var _camera;

var _scene_rt;
var _rtTexutre;


var _sub_plane;
var _sub_geo;
var _sub_material;
// var _texture;

var _full_geo;
var _full_src_geo;
var _full_material;
var _full_plane;

var _phi;

var _pas;
// var _obj;


var stats;

init();
animate();

function init(){

	console.log(width+' '+height);

	_scene_screen=new THREE.Scene();
	//_camera=new THREE.PerspectiveCamera(75,width/height,0.1,1000);
	_camera=new THREE.OrthographicCamera(-width,width,height,-height,1,1000);

	renderer=new THREE.WebGLRenderer();
	renderer.setSize(width,height);
	renderer.setClearColor(0xffffff);

	document.body.appendChild(renderer.domElement);


	_scene_rt=new THREE.Scene();
	_rtTexture=new THREE.WebGLRenderTarget(width,height,{format:THREE.RGBAFormat});


	// _texture=new THREE.TextureLoader().load("image/test.png");
	// _texture.wrapS=THREE.RepeatWrapping;
	// _texture.wrapT=THREE.RepeatWrapping;

	_sub_geo=new THREE.PlaneGeometry(width/8,height/8);
	_sub_material=new THREE.MeshBasicMaterial({color: 0xff0000});
	_sub_plane=new THREE.Mesh(_sub_geo,_sub_material);
	//_scene_rt.add(_sub_plane);

	_full_src_geo=new THREE.PlaneGeometry(width,height,10,10);
	_full_geo=new THREE.PlaneGeometry(width,height,10,10);
	_full_material=new THREE.MeshBasicMaterial({map:_rtTexture});
	_full_plane=new THREE.Mesh(_full_geo,_full_material);
	_scene_screen.add(_full_plane);
	
	//console.log(_geometry.vertices);

	// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// cube = new THREE.Mesh( geometry, material );
	//scene.add( cube );

	_camera.position.z = 100;

	var len=_full_geo.vertices.length;
	_phi=[];
	for(var i=0;i<len;++i) _phi[i]=Math.random()*Math.PI*2.0;


	_pas=new Array();
	for(var i=0;i<5;++i){
		_pas[i]=new PAnimal(-width+width*2/5*i,height/2);
	}
	for(var pa in _pas){
		_pas[pa].Init(_scene_rt);	
		 console.log(_pas[pa]._x+','+_pas[pa]._y);
	} 
	//_pas=new PAnimal(width/2,height/2);
	// _pas.Init(_scene_rt);
	// console.log(_pas._x,_pas._y);

	// _obj=new AniObject(0,0);
	// _obj.Init(_scene_rt);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	var container=document.getElementById('container');
	container.appendChild(stats.domElement);

}
function drawScene(scene_,target_){
	
}
function twistVertex(dest_geo,src_geo){

	var len=dest_geo.vertices.length;
	var mag=8;
 	for(var i=0;i<len;++i){
 		var vertex=dest_geo.vertices[i];
 		
 		var theta=frameCount/10.0+_phi[i]+(Math.random()*1-.5);

 		vertex.x=src_geo.vertices[i].x+Math.sin(theta)*mag;
	 	vertex.y=src_geo.vertices[i].y+Math.sin(theta)*mag;
 		
 	}

 	//console.log(geometry.faceVertexUvs[0]);
    dest_geo.verticesNeedUpdate = true;
}
function animate(){

	
	requestAnimationFrame(animate);
	frameCount++;

	//twistVertex(_full_plane.geometry,_full_src_geo);	
	for(var pa in _pas) _pas[pa].Update(_scene_rt);
	// _obj.Update(_scene_rt);

	render();
	
	stats.update();

	
}
function render(){

	renderer.render(_scene_rt,_camera,_rtTexture);
	renderer.render(_scene_screen,_camera);


}

// render();