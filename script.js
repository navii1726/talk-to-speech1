let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoiceList() {
  voices = speechSynthesis.getVoices();

  voiceSelect.innerHTML = ""; // Clear previous options

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name + ' (' + voice.lang + ')', i);
  });

  speech.voice = voices[0];
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

populateVoiceList();

voiceSelect.addEventListener("input", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  const selectedVoice = voices[voiceSelect.value];
  
  // Set the desired language for speech synthesis
  speech.lang = selectedVoice.lang;
  speech.text = text;
  window.speechSynthesis.speak(speech);
});
