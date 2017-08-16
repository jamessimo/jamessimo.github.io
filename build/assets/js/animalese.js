// animalese.js
// (C) 2014 Josh Simmons
// http://github.com/acedio/animalese.js

var Animalese = function(letters_file, onload) {
    this.Animalese = function(script,speed) {
        var data = [];

        if(speed == null){
          speed = 1;
        }
    
        var sample_freq = 44100/speed;
        var channels = 1;
        var letter_spoken_secs = 0.075 * speed;

        var letter_secs = letter_spoken_secs * 2;

        var letter_size = Math.floor(letter_secs * channels * sample_freq);
        var letter_spoken_size =
            Math.floor(letter_spoken_secs * channels * sample_freq);

        for (var c_index = 0; c_index < script.length; c_index++) {
            var c_value = script.toUpperCase()[c_index];
            if (c_value >= 'A' && c_value <= 'Z') {
                var letter_loc =
                    letter_size * (c_value.charCodeAt(0) - 'A'.charCodeAt(0));

                for (var i = 0; i < letter_spoken_size; i++) {
                    data[c_index*letter_spoken_size + i] =
                        this.letters[88 + letter_loc + i];
                }
            } else { // non pronouncable character or space
                for (var i = 0; i < letter_spoken_size; i++) {
                    data[c_index*letter_spoken_size + i] = 127;
                }
            }
        }

        var wave = new RIFFWAVE();
        wave.header.sampleRate = sample_freq;
        wave.header.numChannels = channels;
        wave.Make(data);

        return wave;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', letters_file);
    xhr.responseType = 'arraybuffer';
    var req = this;
    xhr.onload = function(e) {
        req.letters = new Uint8Array(this.response);
        onload();
    }
    xhr.send();
}
