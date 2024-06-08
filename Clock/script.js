window.onload = function() {
  const d = new Date();

  let hour = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  // Calculate initial rotation angles
  const hourAngle = hour * 30 + minutes / 2 + seconds / 120;
  const minuteAngle = minutes * 6 + seconds / 60;
  const secondAngle = seconds * 6;

  // Set initial positions
  document.getElementById('hourhand').style.transform = `rotate(${hourAngle}deg)`;
  document.getElementById('minutehand').style.transform = `rotate(${minuteAngle}deg)`;
  document.getElementById('secondhand').style.transform = `rotate(${secondAngle}deg)`;

  // Adjust animations to start from current position
  document.getElementById('hourhand').style.animationDelay = `-${((hour * 3600 + minutes * 60 + seconds) % 43200)}s`;
  document.getElementById('minutehand').style.animationDelay = `-${((minutes * 60 + seconds) % 3600)}s`;
  document.getElementById('secondhand').style.animationDelay = `-${seconds%60}s`;
};