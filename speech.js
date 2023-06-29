// Text to Speech
window.textToSpeech = function(product) {
  const synth = window.speechSynthesis;

  let voice = new SpeechSynthesisUtterance(product);
  voice.text = product;
  voice.lang = "en-US";
  voice.volume = 1;
  voice.rate = 1;
  voice.pitch = 1; // Can be 0, 1, or 2
  synth.speak(voice);
};
