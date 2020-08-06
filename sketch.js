
var Pembe, KoyuYesil, AcikYesil, Turuncu; 	//ARKAPLAN RENKLERÝ
var Skor, HataSayisi, Ses, Giris;			//HAFIZADAKÝ DEÐÝÞKENLER

var Img_Kafa = [];				//KAFA FOTOLARI
var Img_EylulSinirli, Img_EylulUyuyor; 		//EYLÜL FOTOLARI
var Img_Kaka, Img_Sigara, Img_Ses, Img_Bez;	//DÝÐER FOTOLAR
var Img_CarpiBos, Img_CarpiDolu;		//ÇARPILAR
var Img_Tebrikler;				//AÝLE FOTOÐRAFI
var Img_Intro0,Img_Intro1,Img_Intro2,Img_Intro3;//INTROLAR
var Img_Intro4,Img_Intro5,Img_Intro5_1,Img_IntroDevam;
var Snd_Main,Snd_Atis,Snd_Vurdu,Snd_Aglama;	//SES DOSYALARI
var Snd_Zil,Snd_SigaraUyari,Snd_GameOver;
var Snd_Tebrikler;

//-------------------------------------------
//--------------OBJELER----------------------
//-------------------------------------------

var Obj_Kafa = [];
var Obj_Kaka;
var Obj_Top;
var Obj_Eylul;
var Obj_Sigara;
var Obj_Bez;




function preload(){ 


	//FOTOÐRAF VE SES DOSYALARININ TAMAMI BURADA YÜKLENECEK

	Img_Kafa[0] = loadImage('images/kafa1.png');
	Img_Kafa[1] = loadImage('images/kafa2.png');
	Img_Kafa[2] = loadImage('images/kafa3.png');
	Img_Kafa[3] = loadImage('images/kafa4.png');

	Img_EylulSinirli = loadImage('images/es.png');
	Img_EylulUyuyor = loadImage('images/eu.jpg');
		
	Img_Kaka = loadImage('images/kaka.png');
	Img_Sigara = loadImage('images/sigara.png');
	Img_Ses = loadImage('images/ses.png');
	Img_Bez = loadImage('images/bez.png');

	Img_CarpiBos = loadImage('images/cbos.png');
	Img_CarpiDolu = loadImage('images/cdolu.png');

	Img_Tebrikler = loadImage('images/tebrikler.png');

	Img_Intro0 = loadImage('images/introa.png');
	Img_Intro1 = loadImage('images/introb.png');
	Img_Intro2 = loadImage('images/introc.png');
	Img_Intro3 = loadImage('images/introd.png');
	Img_Intro4 = loadImage('images/introe.png');
	Img_Intro5 = loadImage('images/introf.png');
	Img_Intro5_1 = loadImage('images/introg.png');
	Img_IntroDevam = loadImage('images/introdevam.png');

	//SES DOSYALARI BURADA YÜKLENÝYOR

	Snd_Main = loadSound("Sounds/main.mp3");
	Snd_Atis = loadSound('Sounds/atis.wav');
	Snd_Vurdu = loadSound("Sounds/vurdu.wav");
	Snd_Aglama = loadSound("Sounds/aglama.wav");
	Snd_Zil = loadSound("Sounds/zil.wav");
	Snd_SigaraUyari = loadSound("Sounds/sigara.wav");
	Snd_GameOver = loadSound("Sounds/gameover.mp3");
	Snd_Tebrikler = loadSound("Sounds/tebrikler.mp3");

	//RENK TANIMLAMALARI 
	
	KoyuYesil = color(131,163,54);	
	Pembe = color(254,154,204);	
	AcikYesil = color(142,176,64);	
	Turuncu = color(255,178,38);
	TekrarOynaRenk = (255,255,255);
	
	
	//SES ÝLK BAÞTA AÇIK OLARAK BAÞLAYACAK
	Ses = true;	


	

	// BAÞTAN BAÞLADIÐINDA BUNLARIN TEKRAR DÜZELTÝLMESÝ GEREKÝYOR



}

function setup(){
	createCanvas(windowWidth*9/10, windowHeight*9/10);

	frameRate(1);			// DEFAULT AYARI 60 FPS
	Giris=0;			// Introlar için giriþ deðiþkeni
	Obj_Top = new BALL(); 		// TURUNCU TOP NESNESÝNÝ OLUÞTUR
	Obj_Bez = new BEZ();		// BEZ NESNESÝNÝ OLUÞTUR
	Obj_Kaka = new KAKA();		// DÜÞEN KAKA SADECE 1 TANE OLUÞTURULDU
	Obj_Sigara = new SIGARA();	// SÝGARA NESNESÝ OLUÞTURULDU
	OyunReset();
}

function draw(){
	
	background(Pembe);	//ARKAPLAN RENGÝ SEÇ	
	
	//______________________________________
	//------ DAÝMÝ DURAN SES VE EYLÜL ------
	
	push();
	image(Img_Ses,50,15,70,40);
	imageMode(CENTER);
	image(Img_EylulUyuyor,79,450,140,140);
	pop();
	if(!Ses){push();strokeWeight(3);line(70,20,100,50);pop();}
	SesDurumu();

	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//---------- SAPAN KURULUMU ------------
	//--------------------------------------

	push();
	fill(KoyuYesil);
	rect(100,100,10,70); 	// SABÝT SAPAN 
	line(80,170,130,170);
	line(80,170,70,180);
	line(90,170,80,180);
	line(100,170,90,180);
	line(110,170,100,180);
	line(120,170,110,180);
	line(130,170,120,180);
	strokeWeight(3);
	point(105,105);
	pop();
	Obj_Top.display();	//Turuncu Topu Göster
	
	if(Obj_Top.hareket){
		push();
		stroke(KoyuYesil);
		strokeWeight(3);
		line(Obj_Top.x, Obj_Top.y, 105,105);
		pop();
		Obj_Top.rota();
	}
	Obj_Top.shoot();

	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//KAFA OBJESÝ OLUÞTURMA ve GÖSTERME BÖLÜMÜ
	//--------------------------------------
	if(frameCount%100==0){
		var RastK = new KAFA(Img_Kafa[floor(random(1,4))]);	//RASTGELE KAFA SEÇ
		Obj_Kafa.push(RastK);					//SEÇTÝÐÝN KAFAYI OLUÞTUR
			
	}

	for(var i=Obj_Kafa.length-1; i>=0;i--)				//KAFALARI GÖSTER VE GÜNCELLE
		{
			Obj_Kafa[i].display();
			Obj_Kafa[i].update();
			Obj_Kafa[i].crashcheck();
			if(Obj_Kafa[i].cap<6){Obj_Kafa.splice(i,1);}
		}
	
	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//---------- BEZ YERLEÞTÝRME -----------
	//--------------------------------------
		
	Obj_Bez.display();


	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//---------- KAKA YERLEÞTÝRME -----------
	//--------------------------------------
	
	Obj_Kaka.display();
				
	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//------------- ÇARPILAR ---------------
	//--------------------------------------
	push();
		imageMode(CENTER);
		for(var i=1; i<6;i++)
		{
			if(HataSayisi>=i)
			{image(Img_CarpiDolu,150+i*50,35,40,40);}
			else
			{image(Img_CarpiBos,150+i*50,35,40,40);}
			
			
		}
	pop();
	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//---------- SKOR YAZISI ---------------
	//--------------------------------------
	push();
	fill(255);
	stroke(AcikYesil);
	strokeWeight(5);
	textSize(26);
	textStyle(BOLD);
	
	if(frameCount%10==0){Skor++;}
	text("Skor : "+Skor,950,50);	


	pop();
	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//----------- SÝGARA KONTROL -----------
	//--------------------------------------
	
	Obj_Sigara.checked();



	////////////////////////////////////////
	//______________________________________
	//------- OYUN BÝTTÝ MÝ KONTROL --------
	//--------------------------------------
	
	SonucKontrol();	

	//______________________________________
	//______________________________________
	////////////////////////////////////////
	//______________________________________
	//----------- INTRO KONTROL ------------
	//--------------------------------------
	
	IntroKontrol();
	

	//______________________________________

}

function IntroKontrol(){
	
	if(Giris<6){
		background(Pembe);
		push();
		textAlign(CENTER);
		fill(KoyuYesil);
		textStyle(BOLD);
		noStroke();
		textSize(15);
		text("DEVAM ETMEK ICIN HERHANGI BIR YERE TIKLAYIN",windowWidth*9/20,windowHeight*9/10-30);
		pop();
		if(Snd_Main.isPlaying()){Snd_Main.stop();}
	}

	if(Giris==0){push();imageMode(CENTER);image(Img_Intro0,windowWidth*9/20,windowHeight*9/20,300,450);pop();if(Snd_Main.isPlaying()){Snd_Main.stop();}}
	if(Giris==1){push();imageMode(CENTER);image(Img_Intro1,windowWidth*9/20,windowHeight*9/20);image(Img_EylulUyuyor,79,450,140,140);pop();}
	if(Giris==2){
		push();
		imageMode(CENTER);
		image(Img_Intro2,windowWidth*9/20,windowHeight*9/20);
		pop();
		push();
		fill(KoyuYesil);
		rect(100,100,10,70); 	// SABÝT SAPAN 
		line(80,170,130,170);
		line(80,170,70,180);
		line(90,170,80,180);
		line(100,170,90,180);
		line(110,170,100,180);
		line(120,170,110,180);
		line(130,170,120,180);
		strokeWeight(3);
		point(105,105);
		pop();
		Obj_Top.display();
		image(Img_Kafa[0],600, 100, 100,100);
		image(Img_Kafa[1],1100, 350, 100,100);
		image(Img_Kafa[2],800, 150, 100,100);
		image(Img_Kafa[3],400, 150, 100,100);
	}
	if(Giris==3){
		push();imageMode(CENTER);image(Img_Intro3,windowWidth*9/20,windowHeight*9/20);pop();
		image(Img_Bez,210,500, 100,100);
		image(Img_Kaka, 200,100,70,70);
		
	}
	if(Giris==4){push();imageMode(CENTER);image(Img_Intro4,windowWidth*9/20,windowHeight*9/20);image(Img_Sigara,1000,440,150,150);pop();}
	if(Giris==5){
		push();
		imageMode(CENTER);
		image(Img_Intro5,windowWidth*9/20-100,windowHeight*9/20-100);
		for(var i=1; i<3;i++)
		{image(Img_CarpiDolu,150+i*50,35,40,40);}
		for(var i=3; i<6;i++)
		{image(Img_CarpiBos,150+i*50,35,40,40);}
		image(Img_Intro5_1,980,230);

		pop();
		push();
		fill(255);
		stroke(AcikYesil);
		strokeWeight(5);
		textSize(26);
		textStyle(BOLD);
		text("Skor : 289",950,50);	
		pop();	
	}
	if(Giris==6){frameRate(60);if(!Snd_Main.isPlaying())Snd_Main.play();}
	

}




function mouseMoved(){
	if (dist(mouseX,mouseY,windowWidth*9/10-300, 50)<70)
		{TekrarOynaRenk = KoyuYesil;}
	else
		{TekrarOynaRenk = color(255,255,255);}
	
}


function mousePressed(){

	Obj_Top.clicked();		//TOP HAREKET ETTÝRMEK ÝÇÝN
	Obj_Bez.clicked();		//BEZÝ YERÝNDEN OYNATMAK ÝÇÝN
	
	if((Kazanildi || Kaybedildi))	//TEKRAR OYNA BUTONU ÝÇÝN
		{
			if (TekrarOynaRenk==KoyuYesil){OyunReset();}
		}
	if(dist(mouseX,mouseY,85,35)<30){//SES KAPAMA BUTONUNA BASILDI MI?
		
		Ses = !Ses;
	}

	if(dist(mouseX,mouseY,Obj_Sigara.x,Obj_Sigara.y)<100)	//SÝGARAYI DEFETME ÇABASI
	{
		if(Obj_Sigara.alert)
		{Obj_Sigara.deger+=5;Snd_Zil.play();}
	}


	Giris++;	//Intro Sayfalarý Geçiþi Ýçin 

}

function mouseDragged(){
	
	if(Obj_Top.hareket){	// TOP BASILI ÝSE DRAG OLAYINA GÝREBÝLÝRSÝN
		Obj_Top.x = mouseX;
		if(mouseY<200){	
			Obj_Top.y = mouseY;
		}
	}
	
	if(Obj_Bez.hareket){	// BEZE BASILI ÝSE HAREKET ETMESÝ GEREKÝR
		if(mouseX<610 && mouseX>210){Obj_Bez.x = mouseX;}	
	}




	
}

function mouseReleased(){
	
	Obj_Top.released();
	
}

function KAFA(img){
	this.x = random(windowWidth-100, windowWidth+ 100);
	this.y = random(200,600);
	this.img = img;	
	this.crashed = false;
	this.cap = 100;
	this.Xspeed = random(0.4,2);
	this.Yspeed = random(0.4,2);
	this.dir = 1; // UP Selected, or down
	this.crashed = false;

	this.top =30;
	this.bottom =250;
	this.display = function (){
	
		push();
		imageMode(CENTER);
		if(this.crashed){this.cap = this.cap-5;} // ÇARPTIYSA YOK OLSUN!
	
		image(this.img,this.x, this.y, this.cap,this.cap);
		pop();
	}
	
	this.update = function(){
	
		this.x = this.x - this.Xspeed;
		this.y = this.y + this.Yspeed*this.dir;
		
		if(this.y>this.bottom){this.dir=-1;}
		if(this.y<this.top){this.dir=1;}
		if(this.crashed){this.cap = this.cap-5;}
		if(this.x<0){HataSayisi++;this.x=2000;this.crashed=true;}	

	}
	this.crashcheck = function(){
		if (dist(this.x, this.y, Obj_Top.x, Obj_Top.y)< (Obj_Top.cap + this.cap)/2)
		{
			if(Obj_Top.firlatildi){this.crashed=true;Snd_Vurdu.play();}
		}
	}
}

function BALL(){

	this.x = 105;
	this.y = 105;
	this.cap = 25;
	this.Xhiz = 0;
	this.YHiz = 0;
	this.hareket = false;	// MOUSE ÜZERÝNE BASTI MI?
	this.firlatildi = false;

	this.rotaX = 0;
	this.rotaY = 0;

	this.display = function(){
		push();
		fill(Turuncu);
		ellipseMode(CENTER);
		ellipse(this.x, this.y, this.cap, this.cap);	
		fill(KoyuYesil);
		strokeWeight(3);
		point(this.x,this.y);
		pop();
	}
	
	this.clicked = function(){
		var TopaBasildiMi = dist(mouseX,mouseY,this.x,this.y);
		if (TopaBasildiMi<this.cap/2){this.hareket=true;}else{this.hareket=false;}
	
	}
	this.shoot = function(){
		if(this.firlatildi) {
			this.x = this.x + this.Xhiz/5;
			this.y = this.y + this.Yhiz/5;	
			this.Yhiz = this.Yhiz +1;	//YERÇEKÝMÝNDEN KAYNAKLI
			if(this.x>2000 || this.y > 1000 ||  this.x<-500 || this.y<-500) {this.x = 105;this.y=105;this.firlatildi = false;}	
				
		}
	}
	
	this.released = function(){
		
		if (this.hareket){
		
			this.Xhiz = 105-this.x;
			this.Yhiz = 105-this.y;
			this.shoot();
			this.firlatildi = true;
			Snd_Atis.play();
		}
		
		
		
		this.hareket=false;
	}	

	this.rota = function(){
		this.rotaX = 105-this.x;
		this.rotaY = 105-this.y;
		for (var i=2; i<20;i+=2){
			this.rotaY++;			
			this.rotaY++;			
			this.rotaY++;			
			this.rotaY++;					
			this.rotaY++;					
			ellipse(this.rotaX*i+this.x, this.y+this.rotaY*i,15,15);
		}		
		
		
	}

}


function BEZ(){
	this.x = 210; 	// 210 ÝLE 610 ARASINDA GÝDÝP GELEBÝLÝR
	this.y = 500;
	this.cap = 100;
	this.hareket = false;

	this.display = function(){
		imageMode(CENTER);
		image(Img_Bez,this.x,this.y,this.cap,this.cap);
				
	}
	this.clicked = function(){
		var d = dist(mouseX,mouseY,this.x,this.y);
		if (d<this.cap/2){this.hareket=true;}else{this.hareket=false;}
		
		
		
	}
}

function KAKA(){
	this.x = 400 + random(-200,200);
	this.y = -150;
	this.rotation = 0;		//BU DEÐERÝ DÜZELT
	this.img = Img_Kaka;
	this.cap = 70;
	this.rotdir = true;

	this.display = function(){
		push();	
			imageMode(CENTER);
			translate(this.x,this.y);
			rotate(PI*this.rotation/50);
			image(this.img, 0,100,this.cap,this.cap);
		pop();	


		if(abs(this.y+110-abs(this.rotation)*2-Obj_Bez.y)<20)
		{	
			if(floor(abs(this.x-this.rotation*6-Obj_Bez.x))<15)
			{this.y = random(-100,-500);this.x=random(210,610);}
		}
		

		this.y = this.y+1;
		

	if(this.rotdir){this.rotation = this.rotation + 0.3;}
	else{this.rotation = this.rotation - 0.3;}
	
	if(this.rotation>10){this.rotdir=false;}
	if(this.rotation<-10){this.rotdir=true;}

	if(this.y>windowHeight*9/10){this.y=random(-100,-500);this.x=random(210,610);HataSayisi++;}



	}


}



function SonucKontrol(){
	//Img_EylulSinirli, Img_EylulUyuyor

	if (HataSayisi>4) {var img = Img_EylulSinirli;Kaybedildi = true;En = 300;}
	if (Skor>999){var img = Img_Tebrikler; Kazanildi=true;En=500;}
	
	if(Kazanildi || Kaybedildi){
		background(Pembe); 	//EKRANI KAPATALIM

		Snd_Main.stop(); 	//TÜM SESLERÝ STOPLA
		Snd_Atis.stop(); 
		Snd_Vurdu.stop(); 
		Snd_Zil.stop(); 
		Snd_SigaraUyari.stop(); 
		Snd_GameOver.stop(); 
		
		
		if(Kazanildi){if(!Snd_Tebrikler.isPlaying()){Snd_Tebrikler.play();}}
		if(Kaybedildi){if(!Snd_Aglama.isPlaying()){Snd_Aglama.play();}}
		
		
		if (GameOverY>windowHeight*9/20) {GameOverY-=5;}
		push();
		imageMode(CENTER);
		image(img,windowWidth*9/20,GameOverY, En,En);
		fill(TekrarOynaRenk);

		stroke(AcikYesil);
		strokeWeight(5);
		textSize(26);
		textStyle(BOLD);
		textAlign(CENTER);
		text("TEKRAR OYNA", windowWidth*9/10-300,50);
		pop();

	}
	
	

	

	
	
	
}

function OyunReset(){

	Skor=0;
	HataSayisi=0;
	GameOverY = windowHeight+200;
	Kazanildi = false;
	Kaybedildi = false;
	

	for(var i=Obj_Kafa.length-1; i>=0;i--)				//KAFALARI SÝL
	{Obj_Kafa.splice(i,1);}
	
	Obj_Kaka.y = -500;


	Snd_Main.stop(); 	//TÜM SESLERÝ STOPLA
	Snd_Atis.stop(); 
	Snd_Vurdu.stop(); 
	Snd_Aglama.stop(); 
	Snd_Zil.stop(); 
	Snd_SigaraUyari.stop(); 
	Snd_GameOver.stop(); 
	Snd_Tebrikler.stop(); 
	
	Snd_Main.play();

	Obj_Sigara.deger=20;
	Obj_Sigara.alert=false;

	
}

function SesDurumu(){



	if(!Ses){
		Snd_Main.setVolume(0);
		Snd_Atis.setVolume(0);
		Snd_Vurdu.setVolume(0);
		Snd_Aglama.setVolume(0);
		Snd_Zil.setVolume(0);
		Snd_SigaraUyari.setVolume(0);
		Snd_GameOver.setVolume(0);
		Snd_Tebrikler.setVolume(0);
	}
	else
	{
		Snd_Main.setVolume(1);
		Snd_Atis.setVolume(1);
		Snd_Vurdu.setVolume(1);
		Snd_Aglama.setVolume(1);
		Snd_Zil.setVolume(1);
		Snd_SigaraUyari.setVolume(1);
		Snd_GameOver.setVolume(1);
		Snd_Tebrikler.setVolume(1);
	}




}


function SIGARA(){
	this.x = 1000;
	this.y = 440;
	this.alert = false;
	this.nextalerttime = random(1000,3000);
	this.deger = 20;

	this.checked =function(){

		if(frameCount>this.nextalerttime)
		{
			this.alert=true;
		}
		if(this.deger<=0)
		{
			this.alert=false;
			HataSayisi++;
			this.deger=20;
			this.nextalerttime = frameCount + random(500,3000);
		}


		if(this.alert){
			push();
			imageMode(CENTER);
			image(Img_Sigara,this.x,this.y,150,150);
			
			pop();
			if(!Snd_SigaraUyari.isPlaying()){Snd_SigaraUyari.play();}



			rect(this.x+120,this.y-125,15,200);
			push();
			fill(255-this.deger*2.5,this.deger*2.5,0);
			fark = this.deger*2; 			// geçici deðiþken dengelemek için			

			rect(this.x+120,this.y+75-fark,15,fark);


			pop();



			if(frameCount%30==0)
			{this.deger-=1};
			
		}
					
		if (this.deger>100)
		{
			this.deger=20;
			this.nextalerttime = frameCount + random(500,3000);
			this.alert = false;


		}
			

	}
}








