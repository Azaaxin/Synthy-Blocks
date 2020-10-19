var dist2_2;
var filter2_2;
var reverb2_2 = 1;
synth2 = new Tone.FMSynth({
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
  }).toDestination();

piano.on('change',function(keyValue) {
    if (keyValue.state == true) { // If Key is down
        synth2.triggerAttackRelease(Tone.Frequency(keyValue.note, "midi").toNote()); // Play note
    }
})
// Midi input
function midiNote2(note, vel){
    if(vel !=0){ // Skip Key up, If velocity is 0 then play
        synth2.triggerAttackRelease(Tone.Frequency(note, "midi").toNote()); // Play note
    }
}
//filters
function updateFilter2(){
    var filter2 = new Tone.AutoFilter(filter2_2).start(); //LFO
    var reverb2 = new Tone.Reverb(reverb2_2);
    var distortion2 = new Tone.Distortion(dist2_2); //DIST
    // connect the player to the filter, distortion and then to the master output
    synth2.chain(filter2, distortion2, reverb2, Tone.Destination);
}


// Controls
var sus2_d = new Nexus.Dial('#sustain2', dial_settings1)
var dec2_d = new Nexus.Dial('#decay2', dial_settings1)
var atk2_d = new Nexus.Dial('#attack2', dial_settings1)
var rel2_d = new Nexus.Dial('#release2', dial_settings1)
// var tune2_d = new Nexus.Dial('#tune2', dial_settings2)
var select2 = new Nexus.Select('#osc2', dropdown_osc)

var dist2 = new Nexus.Dial('#dist2', distortion_settings)
var lfo2 = new Nexus.Dial('#lfo2', dial_settings1)
var reverb2_d = new Nexus.Dial('#reverb2', reverb_settings)
// When controls change

sus2_d.on('change',function(value) {
    synth2.envelope.attack = value;
});
dec2_d.on('change',function(value) {
    synth2.envelope.decay = value;
});
atk2_d.on('change',function(value) {
    synth2.envelope.attack = value;
});
rel2_d.on('change',function(value) {
    synth2.envelope.release = value;
});
// tune2_d.on('change',function(value) {
//     synth2.oscillator.detune = value;
// });
select2.on('change',function(value) {
    synth2.oscillator.type = value.value;
});
//Effect knobs 
dist2.on('change',function(value) {
    dist2_2 = value.toFixed(1);
    typewatch(function(){updateFilter2();}, 100 );
    
});
lfo2.on('change',function(value) {
    filter2_2 = value.toFixed(1);
    typewatch(function(){updateFilter2();}, 100 );
});
reverb2_d.on('change',function(value) {
    reverb2_2 = value.toFixed(0);
    typewatch(function(){updateFilter2();}, 100 );
});
