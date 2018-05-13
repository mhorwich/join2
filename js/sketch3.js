var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var myAudio = document.querySelector('audio');
var source = audioCtx.createMediaElementSource(myAudio);


var oscillator = audioCtx.createOscillator();
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var gainNode2 = audioCtx.createGain();

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

distortion.curve = makeDistortionCurve(400);
distortion.oversample = '4x';

gainNode.connect(distortion);
source.connect(audioCtx.destination);
oscillator.connect(distortion);
distortion.connect(gainNode2);
gainNode2.connect(audioCtx.destination);

oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
oscillator.frequency.value = 300; // value in hertz
gainNode2.gain.value=.2
oscillator.start();
