// Story Interactions and Cursor AI Integration
import cursorPrompts from '../data/cursor-ai-prompts.json';

export class StoryInteractions {
  constructor() {
    this.isPlaying = false;
    this.currentPanel = 0;
    this.audioContext = null;
    this.speechSynthesis = window.speechSynthesis;
    this.initAudio();
  }

  // Initialize audio context for sound effects
  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API not supported');
    }
  }

  // Text-to-Speech with Cursor AI prompts
  speak(text, voiceSettings = {}) {
    if (!this.speechSynthesis) return;

    // Stop any current speech
    this.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply voice settings
    utterance.rate = voiceSettings.rate || 0.8;
    utterance.pitch = voiceSettings.pitch || 1.0;
    utterance.volume = voiceSettings.volume || 1.0;

    // Try to set specific voice
    if (voiceSettings.voice) {
      const voices = this.speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes(voiceSettings.voice.toLowerCase())
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    this.speechSynthesis.speak(utterance);
  }

  // Flary character interactions
  flarySpeak(interaction = 'introduction') {
    const prompts = cursorPrompts.characterVoices.flary;
    const text = prompts[interaction] || prompts.introduction;
    const voiceSettings = cursorPrompts.technicalSettings.flaryVoice;
    
    this.speak(text, voiceSettings);
    this.playSoundEffect('flaryMovement');
  }

  // Anna character interactions
  annaSpeak(interaction = 'introduction') {
    const prompts = cursorPrompts.characterVoices.anna;
    const text = prompts[interaction] || prompts.introduction;
    const voiceSettings = cursorPrompts.technicalSettings.annaVoice;
    
    this.speak(text, voiceSettings);
    this.playSoundEffect('annaFlying');
  }

  // Aurora Spirit interactions
  auroraSpiritSpeak(interaction = 'introduction') {
    const prompts = cursorPrompts.characterVoices.auroraSpirit;
    const text = prompts[interaction] || prompts.introduction;
    const voiceSettings = cursorPrompts.technicalSettings.auroraSpiritVoice;
    
    this.speak(text, voiceSettings);
    this.playSoundEffect('auroraCreation');
  }

  // Story narration for each panel
  narratePanel(panelIndex) {
    const prompts = cursorPrompts.storyNarration;
    const panelKey = `panel${panelIndex + 1}`;
    const text = prompts[panelKey];
    
    if (text) {
      this.speak(text, cursorPrompts.technicalSettings.narratorVoice);
    }
  }

  // Interactive pop-up facts
  showFact(factType) {
    const facts = cursorPrompts.interactivePopups;
    const factArray = facts[factType];
    
    if (factArray && factArray.length > 0) {
      const randomFact = factArray[Math.floor(Math.random() * factArray.length)];
      this.speak(randomFact, { rate: 0.9, pitch: 1.1 });
      this.playSoundEffect('satelliteBeep');
    }
  }

  // Quiz interactions
  askQuizQuestion(questionIndex) {
    const questions = cursorPrompts.quizPrompts;
    const questionKey = `question${questionIndex + 1}`;
    const question = questions[questionKey];
    
    if (question) {
      this.speak(question, { rate: 0.8, pitch: 1.0 });
    }
  }

  // Quiz answer
  giveQuizAnswer(questionIndex) {
    const answers = cursorPrompts.quizAnswers;
    const answerKey = `question${questionIndex + 1}`;
    const answer = answers[answerKey];
    
    if (answer) {
      this.speak(answer, { rate: 0.85, pitch: 1.0 });
      this.playSoundEffect('celebration');
    }
  }

  // Sound effects
  playSoundEffect(effectType) {
    if (!this.audioContext) return;

    const effects = cursorPrompts.soundEffects;
    const effectText = effects[effectType];
    
    if (effectText) {
      // Create a simple beep sound effect
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Different frequencies for different effects
      const frequencies = {
        'flaryMovement': 800,
        'auroraCreation': 1200,
        'satelliteBeep': 600,
        'annaFlying': 400,
        'celebration': 1000
      };
      
      oscillator.frequency.setValueAtTime(frequencies[effectType] || 600, this.audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.5);
    }
  }

  // Engagement prompts
  showEncouragement() {
    const encouragements = cursorPrompts.engagementPrompts;
    const randomKey = Object.keys(encouragements)[Math.floor(Math.random() * Object.keys(encouragements).length)];
    const text = encouragements[randomKey];
    
    this.speak(text, { rate: 0.9, pitch: 1.2 });
  }

  // Real-time data narration
  narrateRealTimeData(data) {
    let narration = "Here's the latest space weather data: ";
    
    if (data.solarFlares && data.solarFlares.length > 0) {
      narration += `We have ${data.solarFlares.length} solar flare events detected. `;
    }
    
    if (data.geomagneticIndex && data.geomagneticIndex.length > 0) {
      const kpIndex = data.geomagneticIndex[0].kp;
      narration += `The geomagnetic index is Kp ${kpIndex}. `;
      
      if (kpIndex > 5) {
        narration += "This indicates active space weather conditions! ";
      } else if (kpIndex > 3) {
        narration += "Space weather is moderately active. ";
      } else {
        narration += "Space weather is quiet. ";
      }
    }
    
    if (data.auroraIntensity) {
      narration += `Aurora intensity is at ${data.auroraIntensity} percent. `;
      
      if (data.auroraIntensity > 80) {
        narration += "Excellent aurora viewing conditions! ";
      } else if (data.auroraIntensity > 50) {
        narration += "Good aurora viewing conditions. ";
      } else {
        narration += "Limited aurora activity. ";
      }
    }
    
    this.speak(narration, { rate: 0.8, pitch: 1.0 });
  }

  // Panel transition effects
  transitionToPanel(panelIndex) {
    // Stop any current speech
    this.speechSynthesis.cancel();
    
    // Play transition sound
    this.playSoundEffect('flaryMovement');
    
    // Narrate the panel after a short delay
    setTimeout(() => {
      this.narratePanel(panelIndex);
    }, 1000);
  }

  // Interactive element hover effects
  onElementHover(elementType) {
    switch (elementType) {
      case 'flary':
        this.speak("Click me to hear my story!", { rate: 0.9, pitch: 1.3 });
        break;
      case 'anna':
        this.speak("Hi! I'm Anna, your pilot guide!", { rate: 0.9, pitch: 1.2 });
        break;
      case 'satellite':
        this.speak("I'm a space weather monitoring satellite!", { rate: 0.8, pitch: 1.0 });
        break;
      case 'kid':
        this.speak("We're watching the beautiful auroras!", { rate: 0.9, pitch: 1.4 });
        break;
    }
  }

  // Cleanup
  cleanup() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Export singleton instance
export const storyInteractions = new StoryInteractions();
