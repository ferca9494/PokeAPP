const config_voice = {
  volume: 80,
  pitch: 20,
  rate: 1,
  voice: 1,
};

var speak = (TEXT) => {
  let msg = new SpeechSynthesisUtterance();
  msg.voice = speechSynthesis.getVoices()[config_voice.voice];
  msg.text = TEXT;
  msg.volume = config_voice.volume;
  msg.pitch = config_voice.pitch;
  msg.rate = config_voice.rate;
  speechSynthesis.speak(msg);
  return false;
};
