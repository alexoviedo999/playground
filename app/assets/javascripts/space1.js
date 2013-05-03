console.clear();
(function() {
  //setup document
  var w = document.width > 200 ? document.width : 600;
  var h = document.height > 200 ? document.height : 600;
  var hyp = Math.sqrt((w*w)+(h*h)) / 2;
  var canvas = document.getElementById('area');
  canvas.width = w; canvas.height = h;
  var ctx = canvas.getContext("2d");

  var color = [58, 213, 228];

  //get particle origin
  var origin = [w/2, h/4];

  var getParticle = function() {
    return [origin[0], origin[1], Math.random()*360, Math.random()*2+1];
  };

  var particles = (function() {
    var arr = [],i=0;
    while(i++ < 200)
      arr.push(getParticle());
    return arr;
  })();

  var fountain = function() {
    if (particles.length < 1500)
      particles.push(getParticle(), getParticle());
  };


  var render = function() {
    [].forEach.call(particles, function(particle, i) {
      //get new position for particle
      particle[0] += particle[3] * Math.cos(particle[2]);
      particle[1] += particle[3] * Math.sin(particle[2]);

      //get distance from origin
      var diffX = particle[0] - origin[0];
      var diffY = particle[1] - origin[1];
      var dis = Math.sqrt((diffX*diffX)+(diffY*diffY));

      //add twirl at 30% distance from origin
      if (dis > hyp*0.3)
        particle[2] += 0.05;

      //fade out at distance
      var alpha = 1 - (dis/(hyp*0.5));

      //determine particle size
      var size = i%2 == 0 ? 1 : 2;

      //draw this particle
      ctx.fillStyle = 'rgba('+color.join()+','+alpha+')';
      ctx.fillRect(particle[0],particle[1],size,size);
    });
  };

  (function step() {
    requestAnimationFrame(step);
    ctx.clearRect(0,0,w,h);
    fountain();
    render();
  })();

})();