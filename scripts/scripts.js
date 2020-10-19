//Piano roll 
var piano = new Nexus.Piano('#target',{
    'size': [750,125],
    'mode': 'button',  // 'button', 'toggle', or 'impulse'
    'lowNote': 24,
    'highNote': 100
})
var dial_settings1 = {
    'size': [50,50],
    'interaction': 'radial',
    'mode': 'relative', 
    'min': 0,
    'max': 10,
    'step': 0,
    'value': 0
}
var dropdown_osc = {
    'size': [100,30],
    'options': ['sawtooth', 'sawtooth2', 'sawtooth3', 'sawtooth4','sine', 'sine2', 'sine3', 'sine4', 'square', 'square2', 'square3', 'square4', 'triangle', 'triangle2', 'triangle3', 'triangle4']
}
var distortion_settings = {
    'size': [50,50],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 1,
    'step': 0.1,
    'value': 0
}
var reverb_settings = {
    'size': [50,50],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 1,
    'max': 10,
    'step': 0.1,
    'value': 0
}


var typewatch = function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    }  
}(); 