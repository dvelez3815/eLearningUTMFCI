
export default  function SpeechReader (texto){
    let voices =  window.speechSynthesis.getVoices();
    //englich voice
    let voice = voices.filter(voice => voice.lang === 'en-US')[0];

    
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.voice = voice;
    utterance.pitch = 1;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);   
}