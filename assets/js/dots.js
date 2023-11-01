  document.addEventListener("DOMContentLoaded", function() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var dots = [];
      var numDots = 100;
      var dotColor = "#2cd30d"; // Dot color
      var lineColor = "#9eec90"; // Line color

      // Set canvas size to match the window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Dot class
      function Dot(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1; // Random velocity in x direction
        this.vy = Math.random() * 2 - 1; // Random velocity in y direction
      }

      // Initialize dots
      for (var i = 0; i < numDots; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        dots.push(new Dot(x, y));
      }

      // Update the position of dots and draw connections
      function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < numDots; i++) {
          var dot = dots[i];

          // Update dot position
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Bounce off the walls
          if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx *= -1;
          }
          if (dot.y < 0 || dot.y > canvas.height) {
            dot.vy *= -1;
          }

          // Draw dot
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
          ctx.closePath();

          // Draw connections
          for (var j = i + 1; j < numDots; j++) {
            var otherDot = dots[j];
            var dx = otherDot.x - dot.x;
            var dy = otherDot.y - dot.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // Draw a line if the dots are close enough
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(otherDot.x, otherDot.y);
              ctx.strokeStyle = lineColor;
              ctx.stroke();
              ctx.closePath();
            }
          }
        }

        requestAnimationFrame(update);
      }

      // Start the animation
      update();

      // Add event listener for mouse movement
      document.addEventListener("mousemove", function(event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        dots.forEach(function(dot) {
          var dx = mouseX - dot.x;
          var dy = mouseY - dot.y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate the angle to the cursor
          var angle = Math.atan2(dy, dx);

          // Move dots towards the cursor
          if (distance < 200) {
            dot.x += Math.cos(angle) * 2;
            dot.y += Math.sin(angle) * 2;
          }
        });
      });
    });