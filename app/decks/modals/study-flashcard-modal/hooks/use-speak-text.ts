export const useSpeakText = () => {
  const synth = window.speechSynthesis;

  const speakText = (text: string, voice: SpeechSynthesisVoice) => {
    const utterance = new SpeechSynthesisUtterance(text);

    if (voice) {
      utterance.voice = voice;
    }

    synth.speak(utterance);
  };

  const englishVoice = synth
    .getVoices()
    .find((voice) => voice.lang === "en-US") as SpeechSynthesisVoice;

  return {
    speakText,
    englishVoice,
  };
};