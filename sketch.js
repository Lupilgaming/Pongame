// function preload(){
// 	song = loadSound("d_back.mp3")
// }
function setup() {
  // put setup code here
  width = 1280
  height = 720

  // createCanvas(width, height)
  const canvasHolder = select('#canvasHolder'),
  canvasWidth  = canvasHolder.width,
  canvasHeight = canvasHolder.height;
  createCanvas(canvasWidth,canvasHeight).parent('canvasHolder');
  left_pos = [10, height/2]
  right_pos = [width-15, height/2]
  ball = [width/2, height/2]
  movement = [0, 0]
  state = 0 // 0 - start 1-play 2-serve 3-game-over state
  chance = 0 // -1-left 1-right
  counter = [0, 0]
  fps = 30
  scoreP = false
  frameRate(20)
  song = document.getElementById("back_m")
}

function draw() {
  // put drawing code here
  (frameCount%50)?background(50, 50, 50, 100):background(50, 50, 50);
  if(counter[0] == 10 || counter[1] == 10) state =3;
  if(state == 3){
  	state = 0
  	chance = 0
  	scoreP = true
  }
  if(state == 0){
  	scoreP?scorePage():frontPage();  		
  	function l() { counter = [0, 0];
  	}
  	setTimeout(l, 5100*2)
  	ball=[width/2, height/2]; movement = [0, 0];
  	if(chance == -1)velocity = [random(1, 10), random(-10, 10)]
  	if(chance == 1)velocity = [random(-10, -1), random(-10, 10)]
  	if(chance!=0){state=1;   setTimeout(function(){song.play()}, 1000)}
  }
  else{
  	f = document.getElementById('fps_show')
  	f.innerHTML = fps
  	if(frameCount%20 == 0)
  	  fps = "FPS: "+int(frameRate())
  	  push()
  	  textSize(32)
  	  text(fps, 50, 50)
  	  pop()  	
  }
  if(state==1){
  	// f = select('fps_show')
	  fill(255, 192, 203)
	  velocity = setVelocity(velocity, ball)

	  ball[0] += velocity[0] * deltaTime * 0.05
	  ball[1] += velocity[1] * deltaTime * 0.05

	  if(ball[1]<=0 || ball[1] >= height){velocity[1]=-velocity[1]; ball[0] += velocity[0] * deltaTime * 0.05; ball[1] += velocity[1] * deltaTime * 0.05}
	  // ball
	  if(ball[0]<left_pos[0]-1){chance=1; state=2}
	  if(ball[0]>right_pos[0]+1){chance=-1; state=2}
	  circle(ball[0], ball[1], 20)
	  
	  rectMode(CENTER)

	  if(keyIsDown(UP_ARROW)){movement[1] -= (deltaTime/2); if(movement[1] < (-height/2+100)){movement[1] += (deltaTime/2)}}
	  if(keyIsDown(DOWN_ARROW)){movement[1] += (deltaTime/2); if(movement[1] > (height/2-100)){movement[1] -= (deltaTime/2)}}
		// w = 87 and s = 83
	  if(keyIsDown(87)){movement[0] -= (deltaTime/2); if(movement[0] < (-height/2+100)){movement[0] += (deltaTime/2)}}
	  if(keyIsDown(83)){movement[0] += (deltaTime/2); if(movement[0] > (height/2-100)){movement[0] -= (deltaTime/2)}}

	  // left paddle
	  rect(left_pos[0], left_pos[1] + movement[0], 10, 200, 20);
	  // right paddle
	  rect(right_pos[0], right_pos[1] + movement[1], 10, 200, 20);
  }
  if(state == 2){
  	circle(ball[0], ball[1], 20)
  	rectMode(CENTER)
  	rect(left_pos[0], left_pos[1], 10, 200, 20);
  	rect(right_pos[0], right_pos[1], 10, 200, 20);
  	if(chance == -1){counter[0]+=1; velocity = [random(1, 10), random(-10, 10)]; ball=[width/2, height/2]; movement = [0, 0]; state = 1}
  	if(chance == 1){counter[1]+=1; velocity = [random(-10, -1), random(-10, 10)]; ball=[width/2, height/2]; movement = [0, 0]; state = 1}

  }
  if(state == 5){
  	circle(ball[0], ball[1], 20)
  	rectMode(CENTER)
  	rect(left_pos[0], left_pos[1] + movement[0], 10, 200, 20);
  	rect(right_pos[0], right_pos[1] + movement[1], 10, 200, 20);
  }
}

function frontPage(){
	push()
	background(50)
	rectMode(CENTER)
	fill('#75c920')
	fill(255, 192, 203)
	textSize(128)
	textStyle(BOLD)
	text("PONG", width/2 , height/2, 120, 120)
	textSize(32)
	text("Choose the serve-to side via arrows", width/2 - 55,height/2 + 75)
	filter(BLUR, 1)
	pop()
}

function scorePage(){
	push()
	background(50)
	rectMode(CENTER)
	fill('#75c920')
	fill(255, 192, 203)
	textSize(128)
	textStyle(BOLD)
	text(counter[1], width/2 , height/2, 200, 200)
	text(counter[0], width/2-200 , height/2, 200, 200)
	textSize(32)
	text("Choose the serve-to side via arrows", width/2 - 55,height/2 + 75)
	filter(BLUR, 1)
	pop()
}

function setVelocity(velocity, ball){
	// velocity = [random(-10, 10), random(-10, 10)]
	// collision detection here 
	left = [left_pos[0], left_pos[1]+movement[0]]
	right = [right_pos[0], right_pos[1]+movement[1]]
	// rectbound for left:  left[1]+- 200 in y and left[0]+5 in x
	// rectbound for right:  right[1]+- 200 in y and right[0]-5 in x
	if(ball[1]>left[1]-100 && ball[1]<left[1]+100 && ball[0]<= left[0]+5+10){
		ball[0] = left[0]+5+1+10
		if(velocity[0]<=15)
			velocity = [-velocity[0]*random([1.1, 1.2, 1.3]), velocity[1]]
		else velocity = [-velocity[0]*random(), velocity[1]]
	}
	if(ball[1]>=right[1]-100 && ball[1]<=right[1]+100 && ball[0]>= right[0]-5-10){
		// console.log("askldfjlkasdjf")
		ball[0] = right[0]-5-1-10
		velocity = [-velocity[0], velocity[1]]	
	}
	return velocity
}

function keyPressed(){
	if (keyCode == RIGHT_ARROW && state == 0){
		chance = -1
	}
	if (keyCode == LEFT_ARROW && state == 0){
		chance = 1
	}
	if (keyCode == 32 && state == 1){o_s = state;  state=5; of = frameCount}
	// if(keyCode == 32 && state==5){state = o_s}
}

function keyTyped() {
	if(keyCode == 32 && state==5 && frameCount-of > 2){state = o_s;}
}