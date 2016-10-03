(function(){

  let generic = document.querySelector('.generic');
  let square = document.querySelector('#square');
  let counter = 0;
  let counter2 = 0;

  function randomiseObstacles() {
    let params = [[0, 0]];
    let invalid = 0;
    let invalid2 = 0;
    let i = 1;
    while(counter < 30){
      let obstacle = document.createElement('div');
      obstacle.setAttribute('class', 'obstacle');
      obstacle.setAttribute('id', 'obstacle_' + i);
      let obstacle_left = Math.floor(Math.random() * 615);
      let obstacle_top = Math.floor(Math.random() * 455);

      for(let k = 0; k < params.length; k++){
        if(obstacle_left < params[k][0] + 45 && obstacle_left > params[k][0] - 45 &&
           obstacle_top < params[k][1] + 45 && obstacle_top > params[k][1] - 45){
             console.log('invalid position');
             invalid++;
           }
      }

      if(invalid === 0){
        params.push([obstacle_left, obstacle_top]);
        obstacle.style.top = obstacle_top + 'px';
        obstacle.style.left = obstacle_left + 'px';
        generic.appendChild(obstacle);
        counter++;
        i++;
      } else {
        invalid = 0;
      }
    }

    while(counter2 < 1){
      let gem = document.createElement('div');
      gem.setAttribute('class', 'gem');
      gem.setAttribute('id', 'gem_1');
      let param_left = Math.floor(Math.random() * 500);
      let param_top =  Math.floor(Math.random() * 500);

      for(let k = 0; k < params.length; k++){
        if(param_left < params[k][0] + 20 && param_left > params[k][0] - 20 &&
           param_top < params[k][1] + 20 && param_top > params[k][1] - 20){
             invalid2++;
           }
      }

      if(invalid2 === 0){
        params.push([param_left, param_top]);
        gem.style.top = param_top + 'px';
        gem.style.left = param_left + 'px';
        generic.appendChild(gem);
        counter2++;
      } else {
        invalid2 = 0;
      }
    }

  }
  randomiseObstacles();



  console.log(counter);
  let obstacles = document.getElementsByClassName('obstacle');
  let gems = document.getElementsByClassName('gem');

  let params = [];
  let gems_params = [];

  for(let i = 0; i < obstacles.length; i++){
    let t = obstacles[i].offsetTop;
    let l = obstacles[i].offsetLeft;
    params.push([t, l]);
  }

  for(let i = 0; i < gems.length; i++){
    let t = gems[i].offsetTop;
    let l = gems[i].offsetLeft;
    gems_params.push([t, l]);
  }

  let left = 0;
  let top = 0;
  let width = generic.scrollWidth;
  let height = generic.scrollHeight;
  let intervalId;

  let score = 0;

  function crash() {
    for(let i = 0; i < params.length; i++){
      if(left > params[i][1] - 20 && left < params[i][1] + 20 && top > params[i][0] - 20 && top < params[i][0] + 20){
        clearInterval(intervalId);
        square.style.backgroundColor = 'red';
      }
    }
  }

  function point() {
    for(let i = 0; i < gems_params.length; i++){
      if(left > gems_params[i][1] - 20 && left < gems_params[i][1] + 20 && top > gems_params[i][0] - 20 && top < gems_params[i][0] + 20){
        score++;
        if(document.getElementById('gem_1')){
          let parent = document.getElementsByClassName('generic')[0];
          let child = document.getElementById('gem_1');
          parent.removeChild(child);
          gems_params = [];

          let gem = document.createElement('div');
          gem.setAttribute('class', 'gem');
          gem.setAttribute('id', 'gem_1');
          generic.appendChild(gem);
          document.getElementById('gem_1').style.top = Math.floor(Math.random() * 500) + 'px';
          document.getElementById('gem_1').style.left = Math.floor(Math.random() * 660) + 'px';

          let gems = document.getElementsByClassName('gem');
          for(let i = 0; i < gems.length; i++){
            let t = gems[i].offsetTop;
            let l = gems[i].offsetLeft;
            gems_params.push([t, l]);
          }
          document.getElementById('score').innerHTML = score;
        }
      }
    }
  }

  function startInvervalRight() {
    clearInterval(intervalId);
    intervalId = setInterval(moveRight, 5);
  }

  function moveRight() {
    crash();
    point();

    square.style.left = left + 'px';
    if (left < width - 20) {left++}
    else{clearInterval(intervalId)}
  }

  function startInvervalLeft() {
    clearInterval(intervalId);
    intervalId = setInterval(moveLeft, 5);
  }

  function moveLeft() {
    crash();
    point();

    square.style.left = left + 'px';
    if (left>0) {left--}
    else{clearInterval(intervalId)}
  }

  function startIntervalUp() {
    clearInterval(intervalId);
    intervalId = setInterval(moveUp, 5);
  }

  function moveUp() {
    crash();
    point();

    square.style.top = top + 'px';
    if (top>0) {top--}
    else{clearInterval(intervalId)}
  }

  function startIntervalDown() {
    clearInterval(intervalId);
    intervalId = setInterval(moveDown, 5);
  }

  function moveDown() {
    crash();
    point();

    square.style.top = top + 'px';
    if (top < height - 20) {top++}
    else{clearInterval(intervalId)}
  }

  function stopInterval() {
    clearInterval(intervalId);
  }

  document.onkeydown = function(){
    switch(window.event.keyCode){
      case 37: startInvervalLeft(); break;
      case 38: startIntervalUp(); break;
      case 39: startInvervalRight(); break;
      case 40: startIntervalDown(); break;
    }
  }
})();
