// Default Settings
settings = {
  touch: false, // Determines if touch controls are visible
}

images_loading = 0;

/*******************************
* Cat character object         *
********************************/
cat = {
    still:[], // Stores array of still frames
    walk:[], // Stores array of walking frames
    jump:[], // Stores array of jump frames
    fall:[], // stores array of fall frames
    slide:[], // Stores array of sliding frames
    frame:0, // Stores which frame is to be displayed
    x:0,
    y:0,
    height:271,
    width:250,
    speedx:0,
    speedy:0,
    direction:2, // 1=right, 2=left
    movement:[0,0,0,0], // [a, s, d, w]
}

/*******************************
* Forest Scene Object          *
********************************/
forest_scene = {
  layers:[],
  char_layer:0,
  height:1856,
  width:1584,
  floor:390,
};


// Object that stores mouse info to control clickable objects
mouse = {
  x:-99999,
  y:-99999,
  waiting:false,
};

window.onload = function(){
    // Initialize canvas
    c=document.getElementById("gc");
    cc=c.getContext('2d');
    setInterval(update, 1000/30);

    // Update Canvas Size
    cc.canvas.width  = window.innerWidth;
    cc.canvas.height = window.innerHeight;

    // Load characters and scenes
    scene = forest_scene;
    loadCharacterAnimations("cat", cat); // Load Cat animations
    loadScene("forest", 2, forest_scene); // Load Forest Scene

    // Load UI elements
    ui = {
      right_arrow:{
        im:new Image(),
        height:-1,
        width:-1,
        x:-1,
        y:-1,
      },
      left_arrow:{
        im:new Image(),
        height:-1,
        width:-1,
        x:-1,
        y:-1,
      },
    };

    // Right Arrow for touch Controls
    ui.right_arrow.im.src = "webp/ui/arrow.webp";
    ui.right_arrow.height = c.height/6;
    ui.right_arrow.width = c.height/6;
    ui.right_arrow.x = c.width-c.height/6;
    ui.right_arrow.y = c.height-(c.height/6);
    // Left Arrow for touch Controls
    ui.left_arrow.im.src = "webp/ui/arrow.webp";
    ui.left_arrow.height = c.height/6;
    ui.left_arrow.width = c.height/6;
    ui.left_arrow.x = 0
    ui.left_arrow.y = c.height-(c.height/6);


    window.addEventListener('resize', function(){
      //Update Canvas Size
      cc.canvas.width  = window.innerWidth;
      cc.canvas.height = window.innerHeight;
      ui.right_arrow.height = c.height/6;
      ui.right_arrow.width = c.height/6;
      ui.left_arrow.height = c.height/6;
      ui.left_arrow.width = c.height/6;
      ui.right_arrow.x = c.width-c.height/6;
      ui.right_arrow.y = c.height-(c.height/6);
      ui.left_arrow.x = 0
      ui.left_arrow.y = c.height-(c.height/6);
      console.log(ui.left_arrow.y);
      console.log(c.height-(c.height/6));
    }, false);

    document.addEventListener('keydown', function(e){
        if (e.key == "a") {
          if(!cat.movement[0]) // Left
          {
              cat.movement[0]=1;
              cat.direction = 2;
          }
        } else if(e.key == "s"){ // Down
          if(!cat.movement[1])
          {
              cat.movement[1]=1;
          }
        } else if(e.key == "d"){ // Right
          if(!cat.movement[2])
          {
              cat.movement[2]=1;
              cat.direction = 1;
          }
        } else if (e.key == "w"){ // Up
          if(!cat.movement[3])
          {
              cat.movement[3]=1;
          }
        }
    });
    document.addEventListener('keyup', function(e){
        if (e.key == "a") { // Left
          if(cat.movement[0])
          {
              cat.movement[0] = 0;
          }
        } else if(e.key == "s"){ //  Down
          if(cat.movement[1])
          {
              cat.movement[1] = 0;
          }
        } else if(e.key == "d"){ // Right
          if(cat.movement[2])
          {
              cat.movement[2] = 0;
          }
        } else if (e.key == "w"){ // Down
          if(cat.movement[3]) {
              cat.movement[3] = 0;
          }
        }
    });

    c.addEventListener('mousedown', (e) => {

      mouse.x = e.clientX;
      mouse.y = e.clientY;

    });
    c.addEventListener('mouseup', (e)=>{
      mouse.x = -99999;
      mouse.y = -99999;

    });
    c.addEventListener('touchstart', (e) => {
      console.log("Touch Start");
      mouse.x = e.touches[0].pageX
      mouse.y = e.touches[0].pageY;

    });
    c.addEventListener('touchend', (e)=>{
      console.log("Touch End");
      mouse.x = -99999;
      mouse.y = -99999;

    });
}

function checkLoading(event){
  console.log(event.srcElement);
  images_loading--;
  console.log(images_loading);
  if(images_loading == 0){
    c.style.display = "block";
    document.getElementById("loading-screen").style.display = "none";
  }
}

function loadCharacterAnimations(name, object){
    /*
    Loads animations from webp folder based on object name.These animations are
    loaded into the object under the animations key.

    Only Loads 2 types of animations, still and walk

    name: animation name
    layers: number of layers to be loaded
    object: object to load animations into
    */
    folder = "webp/"+name+"/";
    for (i=1; i <= 10; i++){
        object.still[i-1] = new Image();
        object.still[i-1].src = folder + "Idle (" + i + ").webp";
        images_loading++;
        object.still[i-1].onload = checkLoading;
    }

    for (i=1; i <= 10; i++){
        object.walk[i-1] = new Image();
        object.walk[i-1].src = folder + "Walk (" + i + ").webp";
        images_loading++;
        object.walk[i-1].onload = checkLoading;
    }

    for (i=1; i <= 8; i++){
        object.jump[i-1] = new Image();
        object.jump[i-1].src = folder + "Jump (" + i + ").webp";
        images_loading++;
        object.jump[i-1].onload = checkLoading;
    }

    for (i=1; i <= 8; i++){
        object.fall[i-1] = new Image();
        object.fall[i-1].src = folder + "Fall (" + i + ").webp";
        images_loading++;
        object.fall[i-1].onload = checkLoading;

    }
    for (i=1; i <= 10; i++){
        object.slide[i-1] = new Image();
        object.slide[i-1].src = folder + "Slide (" + i + ").webp";
        images_loading++;
        object.slide[i-1].onload = checkLoading;
    }
}

function loadScene(scene, layers, object){
  /*
  Loads layers webp folder based on object name. These layers are loaded into the object.


  name: scene name
  layers: number of layers to be loaded
  object: object to load animations into

  */
  folder = "webp/"+scene+"/";
  for (i=0; i <= layers-1; i++){
      object.layers[i] = new Image();
      object.layers[i].src = folder+ "Layer_" + i + ".webp";
      images_loading++;
      object.layers[i].onload = checkLoading;

  }
}

function drawImage(image, x, y, width, height, reverse) {
  /*
  Displays image in cc canvas. Reverse functionality was added to reverse
  images on the fly.

  image: image to be drawn
  x: x position of image
  y: y position of image
  width: width of image
  height: height of image
  reverse: if true, the image will be reversed
  */
  if (reverse){
    // Reversed direction of image
    cc.save(); // Save old image config for later use

    // Flip the character image
    cc.translate(x + width/2, 0);
    cc.scale(-1, 1);
    cc.translate(-(x + width/2), 0);

    cc.drawImage(image, x, y, height, width); // Display Image

    cc.restore(); // Restore Previous config
  } else {
    cc.drawImage(image, x, y, height, width); // Display Image
  }
}

function isInsideUI(element, x, y){
  /*
  Determines whether given position exists within a UI element's location

  element: element object. See ui variable's elements to see format
  x: x position of given position
  y: y position of given position
  */
  return  x >= element.x &&
          y >= element.y &&
          x <= element.x+element.width &&
          y <= element.height+element.y;
}


function update(){
  /*
  Updates the canvas based on a set interval
  */

  /*******************************
  * Mouse Update                 *
  ********************************/

  if (mouse.y != -99999) {
    if (settings.touch && isInsideUI(ui.left_arrow, mouse.x, mouse.y)){

      cat.movement[0] = 1;
      cat.direction = 2;

    } else if (settings.touch && isInsideUI(ui.right_arrow, mouse.x, mouse.y)){

      cat.movement[2] = 1;
      cat.direction = 1;

    }
    mouse.waiting = true;
  } else if (mouse.waiting){
    if(settings.touch) {
      cat.movement = [0,0,0,0];
      mouse.waiting = false;
    }
  }

  /*******************************
  * Movement Functions           *
  ********************************/
  if(cat.movement[0]){ // Moves Character Left
    if(!(cat.movement[1] == 1 && cat.y == scene.floor)){

      cat.speedx = -8;

    }
  }

  if(cat.movement[2]){ // Moves character right
      if(!(cat.movement[1] && cat.x == scene.floor)){

        cat.speedx = 8;

      }
  }

  if(cat.movement[3]){ // jump if the character is on the ground
      if (cat.speedy == 0 && cat.y == scene.floor)
      {
        cat.frame = 0;
        cat.speedy = 8; //set initial upward speed
        cat.y = 416; // set y coordinate to 1 more so the program doesn't force the character on the ground

      }
  }

  /*******************************
  * Y axis manipulation          *
  ********************************/
  if (cat.y > scene.floor) { // If the character is in the air increase speed towards ground and lower character

    // update speedy and y
    cat.speedy = cat.speedy - 0.5;
    cat.y += cat.speedy;

  } else if(cat.y != scene.floor){

    //Reset speedy and y
    cat.speedy = 0;
    cat.y=scene.floor;

  }

  /*******************************
  * X axis manipulation          *
  ********************************/
  if (cat.x > cc.canvas.width){

    cat.x = -1*cat.width;

  } else if(cat.x < -1.01*cat.width) {

    cat.x = cc.canvas.width;

  }

  if (cat.speedx > 0.01 || cat.speedx < -0.01){

    cat.x += cat.speedx; // Update catx

    if (cat.y == scene.floor){
      if(cat.movement[1]){ // If the cat is sliding

        cat.speedx *= 0.99;

      } else {

        cat.speedx *= 0.78; // Slowdown from floor

      }
    } else {

      cat.speedx *= 0.95; // Slowdown from air friction

    }
  } else if (cat.speedx != 0){ // if the speedx is small enough, set it to 0

    cat.speedx = 0;

  }

  cc.clearRect(0, 0, c.width, c.height); // Clear canvas

  for (i = 1; i>=0; i--){ // display each layer, placing the character at layer 3

    if (i==scene.char_layer){ // Determines which layer the character will be displayed

      if (cat.speedy >= 0 && cat.y != scene.floor){

        /*******************************
        * Character is jumping         *
        ********************************/
        if (cat.frame>=7){ // Reset frame counter

            cat.frame = 7;

        } else { // update frame counter

            cat.frame++;

        }
        if (cat.direction==1){ // Facing Right
            // draw the character
            drawImage(cat.jump[cat.frame], cat.x, cc.canvas.height-cat.y, cat.width, cat.height);

        } else { // Facing Left

            drawImage(cat.jump[cat.frame],cat.x, cc.canvas.height-cat.y, cat.width, cat.height, true);

        }

      } else if (cat.speedy < 0){
        if (cat.frame>=7){ // Reset frame counter

            cat.frame = 7;

        } else { // update frame counter

            cat.frame++;

        }
        if (cat.direction==1){ // Facing Right

            // draw the character
            drawImage(cat.fall[cat.frame], cat.x, cc.canvas.height-cat.y, cat.width, cat.height);

        } else { // Facing Left

            drawImage(cat.fall[cat.frame], cat.x, cc.canvas.height-cat.y, cat.width, cat.height, true);

        }
      } else if (cat.movement[1]){
        /*******************************
        * Character is sliding          *
        ********************************/
        if (cat.frame==9){ // Reset frame counter

            cat.frame = 0;

        } else { // update frame counter

            cat.frame++;

        }
        if (cat.direction==1){ // Facing Right
            // draw the character
            drawImage(cat.slide[cat.frame], cat.x, cc.canvas.height-cat.y, cat.width, cat.height);

        } else { // Facing Left

            drawImage(cat.slide[cat.frame],cat.x, cc.canvas.height-cat.y, cat.width, cat.height, true);

        }
      } else if (cat.y == scene.floor && cat.movement[0] != 0 || cat.movement[2] != 0){

        /*******************************
        * Character is walking          *
        ********************************/
        if (cat.frame==9){ // Reset frame counter

            cat.frame = 0;

        } else { // update frame counter

            cat.frame++;

        }
        if (cat.direction==1){ // Facing Right
            // draw the character
            drawImage(cat.walk[cat.frame], cat.x, cc.canvas.height-cat.y, cat.width, cat.height);

        } else { // Facing Left

            drawImage(cat.walk[cat.frame],cat.x, cc.canvas.height-cat.y, cat.width, cat.height, true);

        }
      } else {
          /*******************************
          * Character is still           *
          ********************************/
          if (cat.frame==9){ // Reset frame counter

              cat.frame = 0;

          } else { // update frame counter

              cat.frame++;

          }
          if (cat.direction==1){ // Facing Right

              // Draw character
              drawImage(cat.still[cat.frame], cat.x, cc.canvas.height-cat.y, cat.width, cat.height);

          } else { // Facing Left
              drawImage(cat.still[cat.frame],cat.x, cc.canvas.height-cat.y, cat.width, cat.height, true);

          }

      }
    }

    cc.drawImage(scene.layers[i], 0,cc.canvas.height-scene.height,scene.width,scene.height); // Display layer

  }

  /*******************************
  * Draw UI Elements             *
  ********************************/
  if (settings.touch){

    // Left Arrow
    drawImage(ui.left_arrow.im, ui.left_arrow.x, ui.left_arrow.y, ui.left_arrow.width, ui.left_arrow.height); // Display layer

    // Right Arrow
    drawImage(ui.right_arrow.im, ui.right_arrow.x, ui.right_arrow.y, ui.right_arrow.width, ui.right_arrow.height, true); // Display layer
  }


}
