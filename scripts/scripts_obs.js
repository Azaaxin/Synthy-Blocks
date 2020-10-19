const synth = new Tone.FMSynth().toMaster();
var sus1 = 0;
var atk1 = 0;
var wav = "sawtooth";
// var synth = new Tone.AMSynth({
//   oscillator: {
//     type: "square",
//   },
//   envelope: {
//     attack: atk1,
//     decay: 0.1,
//     sustain: sus1,
//     release: 0.1,
//   },
//   modulation: {
//     type: "square",
//   },
// }).toMaster();
// const synth = new Tone.FMSynth().toDestination();
// synth.type = "pwm";

var activeSynths = {};
const createPiano = (lowNote, highNote) => {
  const newPiano = new Nexus.Piano("#target", {
    size: [500, 125],
    mode: "button",
    lowNote,
    highNote,
  });

  return newPiano;
};

let lowNote = 72;
let highNote = 84;
let piano = createPiano(lowNote, highNote);

synth.triggerRelease();


const keyMapper = {
  a: 0,
  w: 1,
  s: 2,
  e: 3,
  d: 4,
  f: 5,
  t: 6,
  g: 7,
  y: 8,
  h: 9,
  u: 10,
  j: 11,
  k: 12,
};



piano.on("change", (k) => {
  if (k.state) {
    if (!activeSynths[k.note]) {
      activeSynths[k.note] = new Tone.AMSynth({
        oscillator: {
          type: wav,
        },
        envelope: {
          attack: atk1,
          decay: 0.1,
          sustain: sus1,
          release: 0.1,
        },
        modulation: {
          type: wav,
        },
      }).toMaster();
    }
    activeSynths[k.note].triggerAttack(k.note);
    document.querySelector(".innernote").innerHTML =
      k.note + " - " + activeSynths[k.note].triggerAttack(k.note);
  } else {
    activeSynths[k.note].triggerRelease();
  }
});

var sustain1 = new Nexus.Dial('#sus1',{
  'size': [75,75],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})

sustain1.on('change',function(v) {
  sus1 = v;
})
var attack1 = new Nexus.Dial('#attack1',{
  'size': [75,75],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})

attack1.on('change',function(va) {
  atk1 = va;
})

var select = new Nexus.Select('#waves',{
  'size': [100,30],
  'options': ['sine','sawtooth', 'square']
})

select.on('change',function(waves) {
  wav = waves;
})

document.addEventListener("keydown", (event) => {
  const keyIndex = keyMapper[event.key];
  keyIndex !== undefined && !piano.keys[keyIndex]._state.state
    ? piano.toggleIndex(keyIndex, true)
    : null;
});

document.addEventListener("keyup", (event) => {
  const keyIndex = keyMapper[event.key];
  keyIndex !== undefined && piano.keys[keyIndex]._state.state
    ? piano.toggleIndex(keyIndex, false)
    : null;
});