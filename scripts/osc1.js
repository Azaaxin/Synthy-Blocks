var dist1_1;
var filter1_1;
var reverb1_1 = 1;
synth1 = new Tone.FMSynth({
    oscillator: {
      type: "sawtooth",
      detune: 0,
    },
    envelope: {
        attack: 0,
        decay: 0,
        sustain: 0,
        release: 0,
      },
      
  }).toMaster();

piano.on('change',function(keyValue) {
    if (keyValue.state == true) { // If Key is down
        synth1.triggerAttackRelease(Tone.Frequency(keyValue.note, "midi").toNote()); // Play note
    }
})
// Midi input
function midiNote(note, vel){
    if(vel !=0){ // Skip Key up, If velocity is 0 then play
        synth1.triggerAttackRelease(Tone.Frequency(note, "midi").toNote()); // Play note
        piano.toggleKey(note, true)
    }else{
        piano.toggleKey(note, false)
    }
}

//filters
function updateFilter1(){
    var filter1 = new Tone.AutoFilter(filter1_1).start(); //LFO
    var reverb1 = new Tone.Reverb(reverb1_1);
    var distortion1 = new Tone.Distortion(dist1_1); //DIST
    // connect the player to the filter, distortion and then to the master output
    synth1.chain(filter1, distortion1, reverb1, Tone.Destination);
}


// Controls
var sus1_d = new Nexus.Dial('#sustain1', dial_settings1)
var dec1_d = new Nexus.Dial('#decay1', dial_settings1)
var atk1_d = new Nexus.Dial('#attack1', dial_settings1)
var rel1_d = new Nexus.Dial('#release1', dial_settings1)
// var tune1_d = new Nexus.Dial('#tune1', dial_settings1)
var select1 = new Nexus.Select('#osc1', dropdown_osc)

var dist1 = new Nexus.Dial('#dist1', distortion_settings)
var lfo1 = new Nexus.Dial('#lfo1', dial_settings1)
var reverb1_d = new Nexus.Dial('#reverb1', reverb_settings)
// When controls change

sus1_d.on('change',function(value) {
    synth1.envelope.attack = value;
});
dec1_d.on('change',function(value) {
    synth1.envelope.decay = value;
});
atk1_d.on('change',function(value) {
    synth1.envelope.attack = value;
});
rel1_d.on('change',function(value) {
    synth1.envelope.release = value;
});
// tune1_d.on('change',function(value) {
//     synth1.oscillator.detune = value;
// });
select1.on('change',function(value) {
    synth1.oscillator.type = value.value;
});

//Effect knobs 
dist1.on('change',function(value) {
    dist1_1 = value.toFixed(1);
    typewatch(function(){updateFilter1();}, 100 );
    
});
lfo1.on('change',function(value) {
    filter1_1 = value.toFixed(1);
    typewatch(function(){updateFilter1();}, 100 );
});
reverb1_d.on('change',function(value) {
    reverb1_1 = value.toFixed(0);
    typewatch(function(){updateFilter1();}, 100 );
});
