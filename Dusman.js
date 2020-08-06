
function Dusman(x, y, img){

	this.x = x; 
	this.y = y;
	this.img = img;
	this.dir = 1;
	this.crashed = false;
	this.cap = KafaCapi

	this.display = function(){
		imageMode(CENTER);
		
		if (this.crashed)
		{ 	

			this.cap = this.cap -5;
			

		}
			image(this.img, this.x, this.y, this.cap, this.cap);	
	}
	this.update = function(){
		this.x = this.x -1/2;
		this.y = this.y + this.dir;

		if (this.y>250){this.dir = -1;}
		if (this.y<30){this.dir = 1;}
		if (dist(TOP.x, TOP.y, this.x, this.y)<50 && TopuFirlat){
			if (Ses){vurdu.play();}
			this.crashed = true;
		}
		if (this.x<0){HataSayisi++;this.x = 2000;}

	}

	
}