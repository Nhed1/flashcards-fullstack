export const useSpeakText = () => {
  const synth = window.speechSynthesis;

  const speakText = (text: string) => {
    const englishVoice = synth
      .getVoices()
      .find((voice) => voice.lang === "en-US") as SpeechSynthesisVoice;

    const utterance = new SpeechSynthesisUtterance(text);

    if (englishVoice) {
      utterance.voice = englishVoice;
      synth.speak(utterance);
    } else {
      console.error("Voice not found");
    }
  };

  return {
    speakText,
  };
};
