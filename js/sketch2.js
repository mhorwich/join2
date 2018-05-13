var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var camera3D =  camera;

let wid = window.innerWidth;
let hei = window.innerHeight;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// WebVR stuff
var vrDisplay, vrButton;
var effect = new THREE.VREffect(renderer);
effect.setSize(wid, hei);

var controls = new THREE.VRControls( camera );
controls.standing = true;
camera.position.y = controls.userHeight;
controls.update();

renderer.vr.enabled = true;
window.addEventListener('load', setupVRStage)
// setupVRStage();

window.addEventListener('resize', onWindowResize, true );
window.addEventListener('vrdisplaypresentchange', onWindowResize, true);

// sets up the VR stage + button
function setupVRStage(){
	// get available displays
	navigator.getVRDisplays().then( function(displays){
		if(displays.length > 0) {
			// console.log(displays);
			vrDisplay = displays[0];
			// setup button
			vrButton = WEBVR.getButton( vrDisplay, renderer.domElement );
			document.getElementById('vr_button').appendChild( vrButton );
		} else {
			console.log("NO VR DISPLAYS PRESENT");
		}
		window.requestAnimationFrame(animate);
	});
}

function onWindowResize(){
  let wid = window.innerWidth;
  let hei = window.innerHeight;

  effect.setSize(wid, hei);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(wid, hei);
  camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
}


//MUSIC!!
var masterCompressor = new Tone.Compressor({
	"threshold" : -6,
	"ratio" : 3,
	"attack" : 0.5,
	"release" : 0.1
});
var lowBump = new Tone.Filter(200, "lowshelf");
Tone.Master.chain(lowBump, masterCompressor);

var lowPass = new Tone.Filter(800, "lowPass");

var pitchUp = new Tone.PitchShift (12);
var feedbackDelay3 = new Tone.FeedbackDelay("3m", .6).toMaster();
var feedbackDelay2 = new Tone.FeedbackDelay("2m", .5).connect(feedbackDelay3);
var feedbackDelay = new Tone.FeedbackDelay("1m", .4).connect(feedbackDelay2);
var convolver = new Tone.Convolver("CleftRidgeArch.wav").toMaster();

var trebleSphere = new Tone.Panner3D(5, 0, 0).connect(convolver);
var altoSphere = new Tone.Panner3D(-5, 0, 0).connect(convolver);
var tenorSphere = new Tone.Panner3D(0, 0, 5).connect(convolver);
var bassSphere = new Tone.Panner3D(0, 0, -5).connect(convolver);

// var treble = new Tone.Player("2minStems4.mp3").connect(convolver).connect(trebleSphere);
// var alto = new Tone.Player("2minStems3.mp3").connect(convolver).connect(altoSphere);
// var tenor = new Tone.Player("2minStems2.mp3").connect(convolver).connect(tenorSphere);
// var bass = new Tone.Player("2minStems1.mp3").connect(convolver).connect(bassSphere);
// var all = new Tone.Player("2minStems.mp3").connect(convolver);
var twelveMin = new Tone.Player("12minPrint.mp3").connect(convolver);

// treble.loop = true;
// alto.loop = true;
// tenor.loop = true;
// bass.loop = true;
// all.loop = true;
twelveMin.loop = true;


// treble.autostart = true;
// alto.autostart = true;
// tenor.autostart = true;
// bass.autostart = true;
// all.autostart = true;
twelveMin.autostart = true;

//MIC STUFF
mic = new p5.AudioIn();
mic.amp(0.25);
mic.start();
mic.connect();

lowPass = new p5.LowPass();
lowPass.freq(1200);
lowPass.process(mic);

delay = new p5.Delay();
delay.process(lowPass, .12, .7, 2300);


fft = new p5.FFT(0, 16);
fft.setInput(mic);


var sampler1 = new Tone.Sampler({
	"G1": "notes/G1fa.wav",
  "A1": "notes/A1sol.wav",
  "B1": "notes/B1la.wav",
  "C2": "notes/C2fa.wav",
  "D2": "notes/D2sol.wav",
  "E2": "notes/E2la.wav",
  "F#2": "notes/F2mi.wav",
  "G2": "notes/G2fa.wav",
  "A2": "notes/A2sol.wav",
  "B2": "notes/B2la.wav",
  "C3": "notes/C3fa.wav",
  "D3": "notes/D3sol.wav",
  "E3": "notes/E3la.wav",
  "F#3": "notes/F3mi.wav",
  "G3": "notes/G3fa.wav",
  "A3": "notes/A3sol.wav",
  "B3": "notes/B3la.wav",
  "C4": "notes/C4fa.wav",
  "D4": "notes/D4sol.wav",
  "E4": "notes/E4la.wav",
  "F#4": "notes/F4mi.wav",
  "G4": "notes/G4fa.wav",
  "A4": "notes/A4sol.wav",
}, function() {}).connect(convolver).connect(bassSphere).connect(feedbackDelay);

var sampler2 = new Tone.Sampler({
	"G1": "notes/G1fa.wav",
  "A1": "notes/A1sol.wav",
  "B1": "notes/B1la.wav",
  "C2": "notes/C2fa.wav",
  "D2": "notes/D2sol.wav",
  "E2": "notes/E2la.wav",
  "F#2": "notes/F2mi.wav",
  "G2": "notes/G2fa.wav",
  "A2": "notes/A2sol.wav",
  "B2": "notes/B2la.wav",
  "C3": "notes/C3fa.wav",
  "D3": "notes/D3sol.wav",
  "E3": "notes/E3la.wav",
  "F#3": "notes/F3mi.wav",
  "G3": "notes/G3fa.wav",
  "A3": "notes/A3sol.wav",
  "B3": "notes/B3la.wav",
  "C4": "notes/C4fa.wav",
  "D4": "notes/D4sol.wav",
  "E4": "notes/E4la.wav",
  "F#4": "notes/F4mi.wav",
  "G4": "notes/G4fa.wav",
  "A4": "notes/A4sol.wav",
}, function() {}).connect(convolver).connect(tenorSphere).connect(feedbackDelay);

var sampler3 = new Tone.Sampler({
	"G1": "notes/G1fa.wav",
  "A1": "notes/A1sol.wav",
  "B1": "notes/B1la.wav",
  "C2": "notes/C2fa.wav",
  "D2": "notes/D2sol.wav",
  "E2": "notes/E2la.wav",
  "F#2": "notes/F2mi.wav",
  "G2": "notes/G2fa.wav",
  "A2": "notes/A2sol.wav",
  "B2": "notes/B2la.wav",
  "C3": "notes/C3fa.wav",
  "D3": "notes/D3sol.wav",
  "E3": "notes/E3la.wav",
  "F#3": "notes/F3mi.wav",
  "G3": "notes/G3fa.wav",
  "A3": "notes/A3sol.wav",
  "B3": "notes/B3la.wav",
  "C4": "notes/C4fa.wav",
  "D4": "notes/D4sol.wav",
  "E4": "notes/E4la.wav",
  "F#4": "notes/F4mi.wav",
  "G4": "notes/G4fa.wav",
  "A4": "notes/A4sol.wav",
}, function() {}).connect(pitchUp).connect(convolver).connect(altoSphere).connect(feedbackDelay);

var sampler4 = new Tone.Sampler({
	"G1": "notes/G1fa.wav",
  "A1": "notes/A1sol.wav",
  "B1": "notes/B1la.wav",
  "C2": "notes/C2fa.wav",
  "D2": "notes/D2sol.wav",
  "E2": "notes/E2la.wav",
  "F#2": "notes/F2mi.wav",
  "G2": "notes/G2fa.wav",
  "A2": "notes/A2sol.wav",
  "B2": "notes/B2la.wav",
  "C3": "notes/C3fa.wav",
  "D3": "notes/D3sol.wav",
  "E3": "notes/E3la.wav",
  "F#3": "notes/F3mi.wav",
  "G3": "notes/G3fa.wav",
  "A3": "notes/A3sol.wav",
  "B3": "notes/B3la.wav",
  "C4": "notes/C4fa.wav",
  "D4": "notes/D4sol.wav",
  "E4": "notes/E4la.wav",
  "F#4": "notes/F4mi.wav",
  "G4": "notes/G4fa.wav",
  "A4": "notes/A4sol.wav",
}, function() {}).connect(pitchUp).connect(convolver).connect(trebleSphere).connect(feedbackDelay);

sampler1.volume.value = -18;
sampler2.volume.value = -18;
sampler3.volume.value = -18;
sampler4.volume.value = -18;


//CHAINS!!!
var chain1 = new Tone.CtrlMarkov({
  "A1": [{
      "value": "D2",
      "probability": 4 / 8
    },
    {
      "value": "E2",
      "probability": 2 / 8
    },
    {
      "value": "A1",
      "probability": 2 / 8
    }
  ],
  "C3": "B2",
  "G1": [{
      "value": "E2",
      "probability": 2 / 41
    },
    {
      "value": "D2",
      "probability": 7 / 41
    },
    {
      "value": "G1",
      "probability": 10 / 41
    },
    {
      "value": "G2",
      "probability": 22 / 41
    }
  ],
  "C2": [{
      "value": "G1",
      "probability": 1 / 34
    },
    {
      "value": "A1",
      "probability": 1 / 34
    },
    {
      "value": "B1",
      "probability": 1 / 34
    },
    {
      "value": "E2",
      "probability": 3 / 34
    },
    {
      "value": "C2",
      "probability": 15 / 34
    },
    {
      "value": "D2",
      "probability": 13 / 34
    }
  ],
  "A2": [{
      "value": "B1",
      "probability": 1 / 160
    },
    {
      "value": "E2",
      "probability": 3 / 160
    },
    {
      "value": "D3",
      "probability": 2 / 160
    },
    {
      "value": "D2",
      "probability": 13 / 160
    },
    {
      "value": "B2",
      "probability": 34 / 160
    },
    {
      "value": "F#3",
      "probability": 7 / 160
    },
    {
      "value": "G2",
      "probability": 30 / 160
    },
    {
      "value": "A2",
      "probability": 70 / 160
    }
  ],
  "F#3": [{
      "value": "G3",
      "probability": 13 / 49
    },
    {
      "value": "E4",
      "probability": 7 / 49
    },
    {
      "value": "E3",
      "probability": 12 / 49
    },
    {
      "value": "G2",
      "probability": 7 / 49
    },
    {
      "value": "D3",
      "probability": 5 / 49
    },
    {
      "value": "B3",
      "probability": 5 / 49
    }
  ],
  "B2": [{
      "value": "D2",
      "probability": 3 / 194
    },
    {
      "value": "C3",
      "probability": 2 / 194
    },
    {
      "value": "E2",
      "probability": 27 / 194
    },
    {
      "value": "B2",
      "probability": 82 / 194
    },
    {
      "value": "A2",
      "probability": 26 / 194
    },
    {
      "value": "E3",
      "probability": 19 / 194
    },
    {
      "value": "G2",
      "probability": 30 / 194
    },
    {
      "value": "E4",
      "probability": 5 / 194
    }
  ],
  "B1": [{
      "value": "A1",
      "probability": 1 / 180
    },
    {
      "value": "F#2",
      "probability": 1 / 180
    },
    {
      "value": "C2",
      "probability": 5 / 180
    },
    {
      "value": "D2",
      "probability": 11 / 180
    },
    {
      "value": "B1",
      "probability": 88 / 180
    },
    {
      "value": "B3",
      "probability": 12 / 180
    },
    {
      "value": "E2",
      "probability": 57 / 180
    },
    {
      "value": "E3",
      "probability": 5 / 180
    }
  ],
  "D2": [{
      "value": "A1",
      "probability": 4 / 438
    },
    {
      "value": "G1",
      "probability": 24 / 438
    },
    {
      "value": "E2",
      "probability": 47 / 438
    },
    {
      "value": "F#2",
      "probability": 2 / 438
    },
    {
      "value": "A2",
      "probability": 2 / 438
    },
    {
      "value": "C2",
      "probability": 5 / 438
    },
    {
      "value": "D2",
      "probability": 217 / 438
    },
    {
      "value": "G2",
      "probability": 89 / 438
    },
    {
      "value": "D4",
      "probability": 10 / 438
    },
    {
      "value": "B1",
      "probability": 32 / 438
    },
    {
      "value": "A3",
      "probability": 6 / 438
    }
  ],
  "D4": [{
      "value": "E2",
      "probability": 5 / 95
    },
    {
      "value": "B3",
      "probability": 17 / 95
    },
    {
      "value": "F#3",
      "probability": 7 / 95
    },
    {
      "value": "B2",
      "probability": 5 / 95
    },
    {
      "value": "E4",
      "probability": 20 / 95
    },
    {
      "value": "D3",
      "probability": 10 / 95
    },
    {
      "value": "D4",
      "probability": 10 / 95
    },
    {
      "value": "E3",
      "probability": 21 / 95
    }
  ],
  "E4": [{
      "value": "G3",
      "probability": 5 / 99
    },
    {
      "value": "F#3",
      "probability": 5 / 99
    },
    {
      "value": "B2",
      "probability": 7 / 99
    },
    {
      "value": "A2",
      "probability": 7 / 99
    },
    {
      "value": "G2",
      "probability": 5 / 99
    },
    {
      "value": "B3",
      "probability": 5 / 99
    },
    {
      "value": "E4",
      "probability": 16 / 99
    },
    {
      "value": "D3",
      "probability": 10 / 99
    },
    {
      "value": "D4",
      "probability": 28 / 99
    },
    {
      "value": "E3",
      "probability": 11 / 99
    }
  ],
  "F#2": [{
      "value": "B1",
      "probability": 2 / 137
    },
    {
      "value": "F#2",
      "probability": 52 / 137
    },
    {
      "value": "G2",
      "probability": 30 / 137
    },
    {
      "value": "A3",
      "probability": 6 / 137
    },
    {
      "value": "E2",
      "probability": 41 / 137
    },
    {
      "value": "C4",
      "probability": 6 / 137
    }
  ],
  "A3": [{
      "value": "E2",
      "probability": 6 / 89
    },
    {
      "value": "E3",
      "probability": 6 / 89
    },
    {
      "value": "F#3",
      "probability": 5 / 89
    },
    {
      "value": "G3",
      "probability": 17 / 89
    },
    {
      "value": "B3",
      "probability": 33 / 89
    },
    {
      "value": "G2",
      "probability": 22 / 89
    }
  ],
  "D3": [{
      "value": "G2",
      "probability": 2 / 119
    },
    {
      "value": "B1",
      "probability": 7 / 119
    },
    {
      "value": "A3",
      "probability": 5 / 119
    },
    {
      "value": "C4",
      "probability": 5 / 119
    },
    {
      "value": "B3",
      "probability": 11 / 119
    },
    {
      "value": "D4",
      "probability": 5 / 119
    },
    {
      "value": "D3",
      "probability": 12 / 119
    },
    {
      "value": "E3",
      "probability": 39 / 119
    },
    {
      "value": "G3",
      "probability": 33 / 119
    }
  ],
  "C4": [{
      "value": "D4",
      "probability": 5 / 22
    },
    {
      "value": "E4",
      "probability": 5 / 22
    },
    {
      "value": "B3",
      "probability": 6 / 22
    },
    {
      "value": "E3",
      "probability": 6 / 22
    }
  ],
  "G2": [{
      "value": "C3",
      "probability": 2 / 684
    },
    {
      "value": "B1",
      "probability": 5 / 684
    },
    {
      "value": "G1",
      "probability": 6 / 684
    },
    {
      "value": "C2",
      "probability": 6 / 684
    },
    {
      "value": "B2",
      "probability": 12 / 684
    },
    {
      "value": "G2",
      "probability": 355 / 684
    },
    {
      "value": "A2",
      "probability": 49 / 684
    },
    {
      "value": "G3",
      "probability": 10 / 684
    },
    {
      "value": "A3",
      "probability": 5 / 684
    },
    {
      "value": "E2",
      "probability": 95 / 684
    },
    {
      "value": "D4",
      "probability": 10 / 684
    },
    {
      "value": "D2",
      "probability": 70 / 684
    },
    {
      "value": "E4",
      "probability": 6 / 684
    },
    {
      "value": "F#2",
      "probability": 43 / 684
    },
    {
      "value": "B3",
      "probability": 10 / 684
    }
  ],
  "G3": [{
      "value": "B3",
      "probability": 1 / 117
    },
    {
      "value": "F#2",
      "probability": 6 / 117
    },
    {
      "value": "F#3",
      "probability": 13 / 117
    },
    {
      "value": "B2",
      "probability": 5 / 117
    },
    {
      "value": "E3",
      "probability": 30 / 117
    },
    {
      "value": "D4",
      "probability": 10 / 117
    },
    {
      "value": "A3",
      "probability": 35 / 117
    },
    {
      "value": "E2",
      "probability": 17 / 117
    }
  ],
  "E2": [{
      "value": "A2",
      "probability": 6 / 633
    },
    {
      "value": "C2",
      "probability": 3 / 633
    },
    {
      "value": "B1",
      "probability": 36 / 633
    },
    {
      "value": "D3",
      "probability": 2 / 633
    },
    {
      "value": "D2",
      "probability": 86 / 633
    },
    {
      "value": "F#2",
      "probability": 27 / 633
    },
    {
      "value": "E2",
      "probability": 305 / 633
    },
    {
      "value": "G3",
      "probability": 14 / 633
    },
    {
      "value": "B2",
      "probability": 38 / 633
    },
    {
      "value": "E4",
      "probability": 15 / 633
    },
    {
      "value": "G2",
      "probability": 79 / 633
    },
    {
      "value": "B3",
      "probability": 22 / 633
    }
  ],
  "E3": [{
      "value": "E4",
      "probability": 7 / 284
    },
    {
      "value": "D4",
      "probability": 12 / 284
    },
    {
      "value": "F#3",
      "probability": 12 / 284
    },
    {
      "value": "B1",
      "probability": 8 / 284
    },
    {
      "value": "D2",
      "probability": 10 / 284
    },
    {
      "value": "B3",
      "probability": 26 / 284
    },
    {
      "value": "A3",
      "probability": 16 / 284
    },
    {
      "value": "D3",
      "probability": 51 / 284
    },
    {
      "value": "G3",
      "probability": 16 / 284
    },
    {
      "value": "E2",
      "probability": 18 / 284
    },
    {
      "value": "E3",
      "probability": 108 / 284
    }
  ],
  "B3": [{
      "value": "D2",
      "probability": 5 / 166
    },
    {
      "value": "B2",
      "probability": 7 / 166
    },
    {
      "value": "G2",
      "probability": 13 / 166
    },
    {
      "value": "D4",
      "probability": 5 / 166
    },
    {
      "value": "A3",
      "probability": 16 / 166
    },
    {
      "value": "E2",
      "probability": 5 / 166
    },
    {
      "value": "G3",
      "probability": 9 / 166
    },
    {
      "value": "E4",
      "probability": 18 / 166
    },
    {
      "value": "F#2",
      "probability": 6 / 166
    },
    {
      "value": "D3",
      "probability": 27 / 166
    },
    {
      "value": "C4",
      "probability": 11 / 166
    },
    {
      "value": "B3",
      "probability": 17 / 166
    },
    {
      "value": "E3",
      "probability": 27 / 166
    }
  ]
});
var chain2 = new Tone.CtrlMarkov({
  "D#4": "E4",
  "F#4": [{
      "value": "D4",
      "probability": 3 / 28
    },
    {
      "value": "E4",
      "probability": 3 / 28
    },
    {
      "value": "G4",
      "probability": 8 / 28
    },
    {
      "value": "F#4",
      "probability": 14 / 28
    }
  ],
  "G4": [{
      "value": "D4",
      "probability": 2 / 50
    },
    {
      "value": "E4",
      "probability": 21 / 50
    },
    {
      "value": "F#4",
      "probability": 5 / 50
    },
    {
      "value": "G4",
      "probability": 22 / 50
    }
  ],
  "C4": [{
      "value": "A3",
      "probability": 7 / 116
    },
    {
      "value": "C4",
      "probability": 50 / 116
    },
    {
      "value": "E3",
      "probability": 6 / 116
    },
    {
      "value": "B3",
      "probability": 24 / 116
    },
    {
      "value": "E4",
      "probability": 3 / 116
    },
    {
      "value": "D4",
      "probability": 26 / 116
    }
  ],
  "F#2": [{
      "value": "C4",
      "probability": 6 / 24
    },
    {
      "value": "E2",
      "probability": 6 / 24
    },
    {
      "value": "A3",
      "probability": 6 / 24
    },
    {
      "value": "G2",
      "probability": 6 / 24
    }
  ],
  "A3": [{
      "value": "D4",
      "probability": 4 / 327
    },
    {
      "value": "C4",
      "probability": 8 / 327
    },
    {
      "value": "A3",
      "probability": 133 / 327
    },
    {
      "value": "G2",
      "probability": 22 / 327
    },
    {
      "value": "B3",
      "probability": 63 / 327
    },
    {
      "value": "G3",
      "probability": 83 / 327
    },
    {
      "value": "F#3",
      "probability": 5 / 327
    },
    {
      "value": "E3",
      "probability": 3 / 327
    },
    {
      "value": "E2",
      "probability": 6 / 327
    }
  ],
  "D4": [{
      "value": "C4",
      "probability": 18 / 395
    },
    {
      "value": "G3",
      "probability": 11 / 395
    },
    {
      "value": "A3",
      "probability": 15 / 395
    },
    {
      "value": "G4",
      "probability": 8 / 395
    },
    {
      "value": "E3",
      "probability": 8 / 395
    },
    {
      "value": "D4",
      "probability": 200 / 395
    },
    {
      "value": "D3",
      "probability": 10 / 395
    },
    {
      "value": "E4",
      "probability": 62 / 395
    },
    {
      "value": "B2",
      "probability": 5 / 395
    },
    {
      "value": "F#3",
      "probability": 7 / 395
    },
    {
      "value": "B3",
      "probability": 46 / 395
    },
    {
      "value": "E2",
      "probability": 5 / 395
    }
  ],
  "D2": [{
      "value": "A3",
      "probability": 6 / 31
    },
    {
      "value": "B1",
      "probability": 10 / 31
    },
    {
      "value": "D4",
      "probability": 10 / 31
    },
    {
      "value": "G2",
      "probability": 5 / 31
    }
  ],
  "B1": [{
      "value": "E3",
      "probability": 5 / 30
    },
    {
      "value": "E2",
      "probability": 8 / 30
    },
    {
      "value": "B3",
      "probability": 12 / 30
    },
    {
      "value": "B1",
      "probability": 5 / 30
    }
  ],
  "E2": [{
      "value": "B3",
      "probability": 22 / 95
    },
    {
      "value": "G2",
      "probability": 12 / 95
    },
    {
      "value": "E4",
      "probability": 15 / 95
    },
    {
      "value": "B2",
      "probability": 10 / 95
    },
    {
      "value": "G3",
      "probability": 14 / 95
    },
    {
      "value": "E2",
      "probability": 4 / 95
    },
    {
      "value": "F#2",
      "probability": 6 / 95
    },
    {
      "value": "D2",
      "probability": 10 / 95
    },
    {
      "value": "D3",
      "probability": 2 / 95
    }
  ],
  "B3": [{
      "value": "E3",
      "probability": 6 / 517
    },
    {
      "value": "B3",
      "probability": 253 / 517
    },
    {
      "value": "C4",
      "probability": 29 / 517
    },
    {
      "value": "D3",
      "probability": 27 / 517
    },
    {
      "value": "F#2",
      "probability": 6 / 517
    },
    {
      "value": "E4",
      "probability": 13 / 517
    },
    {
      "value": "G3",
      "probability": 36 / 517
    },
    {
      "value": "E2",
      "probability": 5 / 517
    },
    {
      "value": "A3",
      "probability": 75 / 517
    },
    {
      "value": "D4",
      "probability": 42 / 517
    },
    {
      "value": "G2",
      "probability": 13 / 517
    },
    {
      "value": "B2",
      "probability": 7 / 517
    },
    {
      "value": "D2",
      "probability": 5 / 517
    }
  ],
  "D3": [{
      "value": "G3",
      "probability": 4 / 80
    },
    {
      "value": "E3",
      "probability": 23 / 80
    },
    {
      "value": "D3",
      "probability": 20 / 80
    },
    {
      "value": "D4",
      "probability": 5 / 80
    },
    {
      "value": "B3",
      "probability": 11 / 80
    },
    {
      "value": "C4",
      "probability": 5 / 80
    },
    {
      "value": "A3",
      "probability": 5 / 80
    },
    {
      "value": "B1",
      "probability": 7 / 80
    }
  ],
  "E3": [{
      "value": "E3",
      "probability": 108 / 230
    },
    {
      "value": "E2",
      "probability": 18 / 230
    },
    {
      "value": "G3",
      "probability": 28 / 230
    },
    {
      "value": "D3",
      "probability": 27 / 230
    },
    {
      "value": "A3",
      "probability": 2 / 230
    },
    {
      "value": "B3",
      "probability": 10 / 230
    },
    {
      "value": "D2",
      "probability": 10 / 230
    },
    {
      "value": "B1",
      "probability": 8 / 230
    },
    {
      "value": "F#3",
      "probability": 12 / 230
    },
    {
      "value": "D4",
      "probability": 5 / 230
    },
    {
      "value": "E4",
      "probability": 2 / 230
    }
  ],
  "E4": [{
      "value": "D#4",
      "probability": 2 / 261
    },
    {
      "value": "F#4",
      "probability": 9 / 261
    },
    {
      "value": "G4",
      "probability": 12 / 261
    },
    {
      "value": "E3",
      "probability": 1 / 261
    },
    {
      "value": "D4",
      "probability": 69 / 261
    },
    {
      "value": "D3",
      "probability": 10 / 261
    },
    {
      "value": "E4",
      "probability": 116 / 261
    },
    {
      "value": "B3",
      "probability": 13 / 261
    },
    {
      "value": "G2",
      "probability": 5 / 261
    },
    {
      "value": "A2",
      "probability": 7 / 261
    },
    {
      "value": "B2",
      "probability": 7 / 261
    },
    {
      "value": "F#3",
      "probability": 5 / 261
    },
    {
      "value": "G3",
      "probability": 5 / 261
    }
  ],
  "G3": [{
      "value": "C4",
      "probability": 5 / 389
    },
    {
      "value": "G3",
      "probability": 187 / 389
    },
    {
      "value": "E2",
      "probability": 17 / 389
    },
    {
      "value": "A3",
      "probability": 62 / 389
    },
    {
      "value": "D4",
      "probability": 18 / 389
    },
    {
      "value": "E3",
      "probability": 31 / 389
    },
    {
      "value": "B2",
      "probability": 5 / 389
    },
    {
      "value": "F#3",
      "probability": 14 / 389
    },
    {
      "value": "F#2",
      "probability": 6 / 389
    },
    {
      "value": "B3",
      "probability": 44 / 389
    }
  ],
  "G2": [{
      "value": "B3",
      "probability": 10 / 80
    },
    {
      "value": "F#2",
      "probability": 6 / 80
    },
    {
      "value": "E4",
      "probability": 6 / 80
    },
    {
      "value": "D2",
      "probability": 6 / 80
    },
    {
      "value": "D4",
      "probability": 10 / 80
    },
    {
      "value": "E2",
      "probability": 20 / 80
    },
    {
      "value": "A3",
      "probability": 5 / 80
    },
    {
      "value": "G3",
      "probability": 10 / 80
    },
    {
      "value": "A2",
      "probability": 7 / 80
    }
  ],
  "F#3": [{
      "value": "F#3",
      "probability": 16 / 61
    },
    {
      "value": "B3",
      "probability": 1 / 61
    },
    {
      "value": "D3",
      "probability": 5 / 61
    },
    {
      "value": "G2",
      "probability": 7 / 61
    },
    {
      "value": "E3",
      "probability": 13 / 61
    },
    {
      "value": "E4",
      "probability": 7 / 61
    },
    {
      "value": "G3",
      "probability": 12 / 61
    }
  ],
  "B2": [{
      "value": "E4",
      "probability": 5 / 48
    },
    {
      "value": "G2",
      "probability": 5 / 48
    },
    {
      "value": "E3",
      "probability": 19 / 48
    },
    {
      "value": "A2",
      "probability": 5 / 48
    },
    {
      "value": "B2",
      "probability": 7 / 48
    },
    {
      "value": "E2",
      "probability": 7 / 48
    }
  ],
  "A2": [{
      "value": "A2",
      "probability": 5 / 24
    },
    {
      "value": "G2",
      "probability": 5 / 24
    },
    {
      "value": "F#3",
      "probability": 7 / 24
    },
    {
      "value": "B2",
      "probability": 7 / 24
    }
  ]
});
var chain3 = new Tone.CtrlMarkov({
  "C3": [{
      "value": "D3",
      "probability": 1 / 2
    },
    {
      "value": "C3",
      "probability": 1 / 2
    }
  ],
  "D#3": [{
      "value": "D#3",
      "probability": 2 / 6
    },
    {
      "value": "E3",
      "probability": 4 / 6
    }
  ],
  "A2": [{
      "value": "B2",
      "probability": 7 / 24
    },
    {
      "value": "F#3",
      "probability": 7 / 24
    },
    {
      "value": "G2",
      "probability": 5 / 24
    },
    {
      "value": "A2",
      "probability": 5 / 24
    }
  ],
  "B1": [{
      "value": "B1",
      "probability": 5 / 30
    },
    {
      "value": "B3",
      "probability": 12 / 30
    },
    {
      "value": "E2",
      "probability": 8 / 30
    },
    {
      "value": "E3",
      "probability": 5 / 30
    }
  ],
  "D2": [{
      "value": "G2",
      "probability": 5 / 31
    },
    {
      "value": "D4",
      "probability": 10 / 31
    },
    {
      "value": "B1",
      "probability": 10 / 31
    },
    {
      "value": "A3",
      "probability": 6 / 31
    }
  ],
  "B2": [{
      "value": "C3",
      "probability": 1 / 45
    },
    {
      "value": "D3",
      "probability": 1 / 45
    },
    {
      "value": "E2",
      "probability": 7 / 45
    },
    {
      "value": "B2",
      "probability": 2 / 45
    },
    {
      "value": "A2",
      "probability": 5 / 45
    },
    {
      "value": "E3",
      "probability": 19 / 45
    },
    {
      "value": "G2",
      "probability": 5 / 45
    },
    {
      "value": "E4",
      "probability": 5 / 45
    }
  ],
  "D3": [{
      "value": "B2",
      "probability": 2 / 344
    },
    {
      "value": "F#3",
      "probability": 7 / 344
    },
    {
      "value": "B1",
      "probability": 7 / 344
    },
    {
      "value": "A3",
      "probability": 5 / 344
    },
    {
      "value": "C4",
      "probability": 5 / 344
    },
    {
      "value": "B3",
      "probability": 1 / 344
    },
    {
      "value": "D4",
      "probability": 5 / 344
    },
    {
      "value": "D3",
      "probability": 194 / 344
    },
    {
      "value": "E3",
      "probability": 82 / 344
    },
    {
      "value": "G3",
      "probability": 36 / 344
    }
  ],
  "F#3": [{
      "value": "A3",
      "probability": 3 / 246
    },
    {
      "value": "F#3",
      "probability": 105 / 246
    },
    {
      "value": "G3",
      "probability": 60 / 246
    },
    {
      "value": "E4",
      "probability": 7 / 246
    },
    {
      "value": "E3",
      "probability": 36 / 246
    },
    {
      "value": "G2",
      "probability": 7 / 246
    },
    {
      "value": "D3",
      "probability": 26 / 246
    },
    {
      "value": "B3",
      "probability": 2 / 246
    }
  ],
  "G3": [{
      "value": "C4",
      "probability": 2 / 567
    },
    {
      "value": "D3",
      "probability": 10 / 567
    },
    {
      "value": "G3",
      "probability": 331 / 567
    },
    {
      "value": "B3",
      "probability": 29 / 567
    },
    {
      "value": "F#2",
      "probability": 6 / 567
    },
    {
      "value": "F#3",
      "probability": 74 / 567
    },
    {
      "value": "B2",
      "probability": 5 / 567
    },
    {
      "value": "E3",
      "probability": 37 / 567
    },
    {
      "value": "D4",
      "probability": 10 / 567
    },
    {
      "value": "A3",
      "probability": 46 / 567
    },
    {
      "value": "E2",
      "probability": 17 / 567
    }
  ],
  "G2": [{
      "value": "A2",
      "probability": 7 / 80
    },
    {
      "value": "G3",
      "probability": 10 / 80
    },
    {
      "value": "A3",
      "probability": 5 / 80
    },
    {
      "value": "E2",
      "probability": 20 / 80
    },
    {
      "value": "D4",
      "probability": 10 / 80
    },
    {
      "value": "D2",
      "probability": 6 / 80
    },
    {
      "value": "E4",
      "probability": 6 / 80
    },
    {
      "value": "F#2",
      "probability": 6 / 80
    },
    {
      "value": "B3",
      "probability": 10 / 80
    }
  ],
  "A3": [{
      "value": "D3",
      "probability": 2 / 191
    },
    {
      "value": "A3",
      "probability": 75 / 191
    },
    {
      "value": "E2",
      "probability": 6 / 191
    },
    {
      "value": "E3",
      "probability": 6 / 191
    },
    {
      "value": "F#3",
      "probability": 5 / 191
    },
    {
      "value": "G3",
      "probability": 39 / 191
    },
    {
      "value": "B3",
      "probability": 36 / 191
    },
    {
      "value": "G2",
      "probability": 22 / 191
    }
  ],
  "E2": [{
      "value": "D3",
      "probability": 2 / 95
    },
    {
      "value": "D2",
      "probability": 10 / 95
    },
    {
      "value": "F#2",
      "probability": 6 / 95
    },
    {
      "value": "E2",
      "probability": 4 / 95
    },
    {
      "value": "G3",
      "probability": 14 / 95
    },
    {
      "value": "B2",
      "probability": 10 / 95
    },
    {
      "value": "E4",
      "probability": 15 / 95
    },
    {
      "value": "G2",
      "probability": 12 / 95
    },
    {
      "value": "B3",
      "probability": 22 / 95
    }
  ],
  "F#2": [{
      "value": "G2",
      "probability": 6 / 24
    },
    {
      "value": "A3",
      "probability": 6 / 24
    },
    {
      "value": "E2",
      "probability": 6 / 24
    },
    {
      "value": "C4",
      "probability": 6 / 24
    }
  ],
  "D4": [{
      "value": "E2",
      "probability": 5 / 95
    },
    {
      "value": "B3",
      "probability": 17 / 95
    },
    {
      "value": "F#3",
      "probability": 7 / 95
    },
    {
      "value": "B2",
      "probability": 5 / 95
    },
    {
      "value": "E4",
      "probability": 20 / 95
    },
    {
      "value": "D3",
      "probability": 10 / 95
    },
    {
      "value": "D4",
      "probability": 10 / 95
    },
    {
      "value": "E3",
      "probability": 21 / 95
    }
  ],
  "E4": [{
      "value": "G3",
      "probability": 5 / 99
    },
    {
      "value": "F#3",
      "probability": 5 / 99
    },
    {
      "value": "B2",
      "probability": 7 / 99
    },
    {
      "value": "A2",
      "probability": 7 / 99
    },
    {
      "value": "G2",
      "probability": 5 / 99
    },
    {
      "value": "B3",
      "probability": 5 / 99
    },
    {
      "value": "E4",
      "probability": 16 / 99
    },
    {
      "value": "D3",
      "probability": 10 / 99
    },
    {
      "value": "D4",
      "probability": 28 / 99
    },
    {
      "value": "E3",
      "probability": 11 / 99
    }
  ],
  "B3": [{
      "value": "D2",
      "probability": 5 / 263
    },
    {
      "value": "B2",
      "probability": 7 / 263
    },
    {
      "value": "G2",
      "probability": 13 / 263
    },
    {
      "value": "D4",
      "probability": 5 / 263
    },
    {
      "value": "A3",
      "probability": 27 / 263
    },
    {
      "value": "E2",
      "probability": 5 / 263
    },
    {
      "value": "G3",
      "probability": 35 / 263
    },
    {
      "value": "E4",
      "probability": 18 / 263
    },
    {
      "value": "F#2",
      "probability": 6 / 263
    },
    {
      "value": "D3",
      "probability": 2 / 263
    },
    {
      "value": "C4",
      "probability": 16 / 263
    },
    {
      "value": "B3",
      "probability": 122 / 263
    },
    {
      "value": "E3",
      "probability": 2 / 263
    }
  ],
  "E3": [{
      "value": "D#3",
      "probability": 4 / 561
    },
    {
      "value": "E4",
      "probability": 7 / 561
    },
    {
      "value": "D4",
      "probability": 12 / 561
    },
    {
      "value": "F#3",
      "probability": 46 / 561
    },
    {
      "value": "B1",
      "probability": 8 / 561
    },
    {
      "value": "D2",
      "probability": 10 / 561
    },
    {
      "value": "B3",
      "probability": 3 / 561
    },
    {
      "value": "A3",
      "probability": 1 / 561
    },
    {
      "value": "D3",
      "probability": 86 / 561
    },
    {
      "value": "G3",
      "probability": 22 / 561
    },
    {
      "value": "E2",
      "probability": 18 / 561
    },
    {
      "value": "E3",
      "probability": 344 / 561
    }
  ],
  "C4": [{
      "value": "G3",
      "probability": 6 / 68
    },
    {
      "value": "C4",
      "probability": 34 / 68
    },
    {
      "value": "D4",
      "probability": 5 / 68
    },
    {
      "value": "E4",
      "probability": 5 / 68
    },
    {
      "value": "B3",
      "probability": 12 / 68
    },
    {
      "value": "E3",
      "probability": 6 / 68
    }
  ]
});
var chain4 = new Tone.CtrlMarkov({
  "F#4": [{
      "value": "E4",
      "probability": 6 / 14
    },
    {
      "value": "G4",
      "probability": 3 / 14
    },
    {
      "value": "F#4",
      "probability": 5 / 14
    }
  ],
  "G4": [{
      "value": "A3",
      "probability": 2 / 42
    },
    {
      "value": "F#4",
      "probability": 8 / 42
    },
    {
      "value": "D4",
      "probability": 8 / 42
    },
    {
      "value": "B3",
      "probability": 2 / 42
    },
    {
      "value": "E4",
      "probability": 8 / 42
    },
    {
      "value": "G4",
      "probability": 14 / 42
    }
  ],
  "F#2": [{
      "value": "C4",
      "probability": 6 / 24
    },
    {
      "value": "E2",
      "probability": 6 / 24
    },
    {
      "value": "A3",
      "probability": 6 / 24
    },
    {
      "value": "G2",
      "probability": 6 / 24
    }
  ],
  "G3": [{
      "value": "G3",
      "probability": 71 / 173
    },
    {
      "value": "E2",
      "probability": 17 / 173
    },
    {
      "value": "A3",
      "probability": 42 / 173
    },
    {
      "value": "D4",
      "probability": 8 / 173
    },
    {
      "value": "E3",
      "probability": 1 / 173
    },
    {
      "value": "B2",
      "probability": 5 / 173
    },
    {
      "value": "F#3",
      "probability": 7 / 173
    },
    {
      "value": "F#2",
      "probability": 6 / 173
    },
    {
      "value": "B3",
      "probability": 16 / 173
    }
  ],
  "C4": [{
      "value": "A3",
      "probability": 6 / 146
    },
    {
      "value": "C4",
      "probability": 57 / 146
    },
    {
      "value": "E3",
      "probability": 6 / 146
    },
    {
      "value": "B3",
      "probability": 41 / 146
    },
    {
      "value": "E4",
      "probability": 2 / 146
    },
    {
      "value": "D4",
      "probability": 34 / 146
    }
  ],
  "D3": [{
      "value": "G3",
      "probability": 33 / 115
    },
    {
      "value": "E3",
      "probability": 39 / 115
    },
    {
      "value": "D3",
      "probability": 10 / 115
    },
    {
      "value": "D4",
      "probability": 5 / 115
    },
    {
      "value": "B3",
      "probability": 11 / 115
    },
    {
      "value": "C4",
      "probability": 5 / 115
    },
    {
      "value": "A3",
      "probability": 5 / 115
    },
    {
      "value": "B1",
      "probability": 7 / 115
    }
  ],
  "E4": [{
      "value": "F#4",
      "probability": 1 / 317
    },
    {
      "value": "C4",
      "probability": 2 / 317
    },
    {
      "value": "G4",
      "probability": 6 / 317
    },
    {
      "value": "E3",
      "probability": 11 / 317
    },
    {
      "value": "D4",
      "probability": 85 / 317
    },
    {
      "value": "D3",
      "probability": 10 / 317
    },
    {
      "value": "E4",
      "probability": 151 / 317
    },
    {
      "value": "B3",
      "probability": 26 / 317
    },
    {
      "value": "G2",
      "probability": 5 / 317
    },
    {
      "value": "A2",
      "probability": 7 / 317
    },
    {
      "value": "B2",
      "probability": 7 / 317
    },
    {
      "value": "F#3",
      "probability": 5 / 317
    },
    {
      "value": "G3",
      "probability": 1 / 317
    }
  ],
  "A3": [{
      "value": "C4",
      "probability": 1 / 255
    },
    {
      "value": "G4",
      "probability": 5 / 255
    },
    {
      "value": "D4",
      "probability": 8 / 255
    },
    {
      "value": "E4",
      "probability": 2 / 255
    },
    {
      "value": "A3",
      "probability": 94 / 255
    },
    {
      "value": "G2",
      "probability": 22 / 255
    },
    {
      "value": "B3",
      "probability": 76 / 255
    },
    {
      "value": "G3",
      "probability": 30 / 255
    },
    {
      "value": "F#3",
      "probability": 5 / 255
    },
    {
      "value": "E3",
      "probability": 6 / 255
    },
    {
      "value": "E2",
      "probability": 6 / 255
    }
  ],
  "D4": [{
      "value": "G4",
      "probability": 11 / 601
    },
    {
      "value": "A3",
      "probability": 8 / 601
    },
    {
      "value": "G3",
      "probability": 10 / 601
    },
    {
      "value": "C4",
      "probability": 34 / 601
    },
    {
      "value": "E3",
      "probability": 21 / 601
    },
    {
      "value": "D4",
      "probability": 344 / 601
    },
    {
      "value": "D3",
      "probability": 10 / 601
    },
    {
      "value": "E4",
      "probability": 68 / 601
    },
    {
      "value": "B2",
      "probability": 5 / 601
    },
    {
      "value": "F#3",
      "probability": 1 / 601
    },
    {
      "value": "B3",
      "probability": 84 / 601
    },
    {
      "value": "E2",
      "probability": 5 / 601
    }
  ],
  "D2": [{
      "value": "A3",
      "probability": 6 / 31
    },
    {
      "value": "B1",
      "probability": 10 / 31
    },
    {
      "value": "D4",
      "probability": 10 / 31
    },
    {
      "value": "G2",
      "probability": 5 / 31
    }
  ],
  "E3": [{
      "value": "E3",
      "probability": 18 / 148
    },
    {
      "value": "E2",
      "probability": 18 / 148
    },
    {
      "value": "G3",
      "probability": 2 / 148
    },
    {
      "value": "D3",
      "probability": 51 / 148
    },
    {
      "value": "A3",
      "probability": 16 / 148
    },
    {
      "value": "B3",
      "probability": 1 / 148
    },
    {
      "value": "D2",
      "probability": 10 / 148
    },
    {
      "value": "B1",
      "probability": 8 / 148
    },
    {
      "value": "F#3",
      "probability": 5 / 148
    },
    {
      "value": "D4",
      "probability": 12 / 148
    },
    {
      "value": "E4",
      "probability": 7 / 148
    }
  ],
  "E2": [{
      "value": "B3",
      "probability": 22 / 95
    },
    {
      "value": "G2",
      "probability": 12 / 95
    },
    {
      "value": "E4",
      "probability": 15 / 95
    },
    {
      "value": "B2",
      "probability": 10 / 95
    },
    {
      "value": "G3",
      "probability": 14 / 95
    },
    {
      "value": "E2",
      "probability": 4 / 95
    },
    {
      "value": "F#2",
      "probability": 6 / 95
    },
    {
      "value": "D2",
      "probability": 10 / 95
    },
    {
      "value": "D3",
      "probability": 2 / 95
    }
  ],
  "B3": [{
      "value": "G4",
      "probability": 3 / 748
    },
    {
      "value": "E3",
      "probability": 2 / 748
    },
    {
      "value": "B3",
      "probability": 438 / 748
    },
    {
      "value": "C4",
      "probability": 46 / 748
    },
    {
      "value": "D3",
      "probability": 27 / 748
    },
    {
      "value": "F#2",
      "probability": 6 / 748
    },
    {
      "value": "E4",
      "probability": 35 / 748
    },
    {
      "value": "G3",
      "probability": 26 / 748
    },
    {
      "value": "E2",
      "probability": 5 / 748
    },
    {
      "value": "A3",
      "probability": 64 / 748
    },
    {
      "value": "D4",
      "probability": 71 / 748
    },
    {
      "value": "G2",
      "probability": 13 / 748
    },
    {
      "value": "B2",
      "probability": 7 / 748
    },
    {
      "value": "D2",
      "probability": 5 / 748
    }
  ],
  "B1": [{
      "value": "E3",
      "probability": 5 / 30
    },
    {
      "value": "E2",
      "probability": 8 / 30
    },
    {
      "value": "B3",
      "probability": 12 / 30
    },
    {
      "value": "B1",
      "probability": 5 / 30
    }
  ],
  "G2": [{
      "value": "B3",
      "probability": 10 / 80
    },
    {
      "value": "F#2",
      "probability": 6 / 80
    },
    {
      "value": "E4",
      "probability": 6 / 80
    },
    {
      "value": "D2",
      "probability": 6 / 80
    },
    {
      "value": "D4",
      "probability": 10 / 80
    },
    {
      "value": "E2",
      "probability": 20 / 80
    },
    {
      "value": "A3",
      "probability": 5 / 80
    },
    {
      "value": "G3",
      "probability": 10 / 80
    },
    {
      "value": "A2",
      "probability": 7 / 80
    }
  ],
  "F#3": [{
      "value": "D4",
      "probability": 2 / 43
    },
    {
      "value": "F#3",
      "probability": 11 / 43
    },
    {
      "value": "B3",
      "probability": 1 / 43
    },
    {
      "value": "D3",
      "probability": 5 / 43
    },
    {
      "value": "G2",
      "probability": 7 / 43
    },
    {
      "value": "E3",
      "probability": 5 / 43
    },
    {
      "value": "E4",
      "probability": 7 / 43
    },
    {
      "value": "G3",
      "probability": 5 / 43
    }
  ],
  "B2": [{
      "value": "E4",
      "probability": 5 / 48
    },
    {
      "value": "G2",
      "probability": 5 / 48
    },
    {
      "value": "E3",
      "probability": 19 / 48
    },
    {
      "value": "A2",
      "probability": 5 / 48
    },
    {
      "value": "B2",
      "probability": 7 / 48
    },
    {
      "value": "E2",
      "probability": 7 / 48
    }
  ],
  "A2": [{
      "value": "A2",
      "probability": 5 / 24
    },
    {
      "value": "G2",
      "probability": 5 / 24
    },
    {
      "value": "F#3",
      "probability": 7 / 24
    },
    {
      "value": "B2",
      "probability": 7 / 24
    }
  ]
});
var chainTime = new Tone.CtrlMarkov({
  "1n": "2n",
  "2n": "4n",
  // "2d": "4n",
  "4n": [{
      //   "value": "2d",
      //   "probability": 2 / 22
      // },
      // {
      "value": "2n",
      "probability": 3 / 20
    },
    {
      "value": "4n",
      "probability": 14 / 20
    },
    {
      "value": ["8n", "8n"],
      "probability": 2 / 20
    }
  ],
  // "4d": "8n",
  "8n": [{
      "value": "4n",
      "probability": 3 / 8
    },
    {
      "value": ["8n", "8n"],
      "probability": 5 / 8
    }
  ]

});

chain1.value = "G2";
chain2.value = "B3";
chain3.value = "E3";
chain4.value = "D4";
chainTime.value = "2n";

var seq = new Tone.Sequence(function(time, note) {

  sampler1.triggerAttackRelease(chain1.value, chainTime.value);
	chainTime.next();
  sampler2.triggerAttackRelease(chain2.value, chainTime.value);
	chainTime.next();
  sampler3.triggerAttackRelease(chain3.value, chainTime.value);
	chainTime.next();
  sampler4.triggerAttackRelease(chain4.value, chainTime.value);
	chainTime.next();
  chain1.next();
  chain2.next();
  chain3.next();
  chain4.next();

}, chain1.value, "4m");

// Tone.Transport.bpm.value = 120;
Tone.Transport.start();
seq.start();


//video uploaded from folder
//outer sphere
var skyGlobe = new THREE.SphereGeometry( 550, 60, 40 );
skyGlobe.scale( -1, 1, 1 );

var video = document.createElement( 'video' );
video.crossOrigin = 'anonymous';
video.width = 4096;
video.height = 2048;
video.loop = true;
video.muted = true;
video.src = 'Comp 1.mp4';
video.setAttribute( 'webkit-playsinline', 'webkit-playsinline' );
video.play();
var texture = new THREE.VideoTexture( video );
texture.minFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;
var vidMat   = new THREE.MeshBasicMaterial( { map : texture } );
vidMat.transparent = true;
vidMat.opacity = 0.25;

mesh = new THREE.Mesh( skyGlobe, vidMat );
scene.add( mesh );

//video input from Barak's code
let feed = document.createElement('video');

var videoTexture = new THREE.VideoTexture( feed );
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

var videoMaterial = new THREE.MeshBasicMaterial( { map : videoTexture } );
videoMaterial.opacity = 0.25;
// videoMaterial.opacity = Math.random;
videoMaterial.transparent = true;


navigator.getUserMedia({audio: false, video: { width: window.innerWidth, height: window.innerHeight }}, stream => {
  // Initialize Video player element to screen size

  // configure video feed element
  feed.width = window.innerWidth
  feed.height = window.innerHeight
  feed.autoplay = true
  feed.srcObject = stream
  // feed.volume = 0.05;
  feed.play()

}, function(error) {
  console.log("Failed to get a stream due to", error)
})

var spotLight = new THREE.SpotLight( 0xff8888 );
spotLight.position.set( 0, 200, 0 );
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.9;
scene.add( spotLight );

// outer sphere
var skyGlobe = new THREE.SphereGeometry( 500, 60, 40 );
skyGlobe.scale( -1, 1, 1 );

var skyGlobe2 = new THREE.SphereGeometry( 500, 60, 40 );
skyGlobe2.scale( -1, 1, 1 );

var archMaterial = new THREE.MeshBasicMaterial( {
  map: new THREE.TextureLoader().load('CleftRidgeArch.jpg')
} );
archMaterial.opacity = 0.25;
archMaterial.transparent = true;


archMesh = new THREE.Mesh( skyGlobe2, archMaterial )
// mesh = new THREE.Mesh( skyGlobe, videoMaterial );

// scene.add( mesh );
scene.add( archMesh );

var geometry1 = new THREE.SphereGeometry( 2, 24, 24 );
var material1 = new THREE.MeshNormalMaterial();
ball1 = new THREE.Mesh( geometry1, videoMaterial );
ball1.position.x = -10;
scene.add( ball1 );

var geometry2 = new THREE.SphereGeometry( 2, 24, 24 );
var material2 = new THREE.MeshNormalMaterial();
ball2 = new THREE.Mesh( geometry2, videoMaterial );
ball2.position.z = 10;
scene.add( ball2 );

var geometry3 = new THREE.SphereGeometry( 2, 24, 24 );
var material3 = new THREE.MeshNormalMaterial();
ball3 = new THREE.Mesh( geometry3, videoMaterial );
ball3.position.z = -10;
scene.add( ball3 );

var geometry4 = new THREE.SphereGeometry( 2, 24, 24 );
var material4 = new THREE.MeshNormalMaterial();
ball4 = new THREE.Mesh( geometry4, videoMaterial );
ball4.position.x = 10;
scene.add( ball4 );

// activatePanoControl()

//animation!
var animate = function () {


	fft.analyze();
	// console.log(
	// 	fft.getEnergy("bass"),
	// 	fft.getEnergy("lowMid"),
	// 	fft.getEnergy("mid"),
	// 	fft.getEnergy("highMid"),
	// 	fft.getEnergy("treble"));

  ball1.rotation.y += 0.01;
  ball2.rotation.y += 0.01;
  ball3.rotation.y += 0.01;
  ball4.rotation.y += 0.01;

	videoMaterial.opacity = (seq.progress);
	// videoMaterial.opacity = (mic.getLevel()*10);

	// console.log(mic.getLevel());
	// console.log("note");

	// archMaterial.opacity = (fft.getEnergy("treble"));

// 	if (mic.getLevel() > 0.3) {
// 	vidMat.opacity += mic.getLevel();
// 	} else {
// 	vidMat.opacity += -mic.getLevel();
// 	}

	if(vrDisplay.isPresenting){ // VR rendering
    controls.update();
    effect.render(scene, camera);
    vrDisplay.requestAnimationFrame(animate);
  } else {  // browser rendering
		controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }
};
