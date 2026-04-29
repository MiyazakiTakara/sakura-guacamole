(function () {
  var BASE = '/app/ext/sakura';
  var SPRITES = ['sakura1.png', 'sakura2.png', 'sakura3.png', 'sakura4.png'];
  var PETAL_COUNT = 22, PETAL_H = 36;
  var SPEED_MIN = 0.25, SPEED_MAX = 0.6;
  var SWING_AMP = 40, SWING_SPEED = 0.006;
  var ROT_SPEED_MIN = 0.001, ROT_SPEED_MAX = 0.006;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function spawnPetal(fromTop) {
    return {
      x: rand(0, window.innerWidth),
      y: fromTop ? rand(-100, -10) : rand(-window.innerHeight, 0),
      speedY: rand(SPEED_MIN, SPEED_MAX),
      swingPhase: rand(0, Math.PI * 2),
      swingOriginX: rand(0, window.innerWidth),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(ROT_SPEED_MIN, ROT_SPEED_MAX) * (Math.random() < 0.5 ? 1 : -1),
      spriteIndex: Math.floor(Math.random() * SPRITES.length),
      h: rand(PETAL_H * 0.7, PETAL_H * 1.3),
      opacity: rand(0.3, 0.6),
    };
  }

  window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('sakura-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'sakura-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
    }
    var ctx = canvas.getContext('2d');

    var imgs = SPRITES.map(function (s) {
      var i = new Image();
      i.src = BASE + '/img/sakura/' + s;
      return i;
    });

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    var petals = [];
    function init() { resize(); petals = Array.from({ length: PETAL_COUNT }, function () { return spawnPetal(false); }); }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.swingPhase += SWING_SPEED;
        p.x = p.swingOriginX + Math.sin(p.swingPhase) * SWING_AMP;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        var img = imgs[p.spriteIndex];
        if (!img.complete || img.naturalWidth === 0) continue;
        var aspect = img.naturalWidth / img.naturalHeight;
        var dH = p.h, dW = dH * aspect;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(img, -dW / 2, -dH / 2, dW, dH);
        ctx.restore();
        if (p.y > canvas.height + dH) Object.assign(p, spawnPetal(true));
      }
      requestAnimationFrame(loop);
    }

    Promise.all(imgs.map(function (img) {
      return new Promise(function (res) {
        if (img.complete) res();
        else img.onload = function () { res(); };
      });
    })).then(function () { init(); loop(); });

    window.addEventListener('resize', resize);
  });
})();
