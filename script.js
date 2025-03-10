const sounds = {
    river: { src: ['sounds/river.mp3'] },
    rain: { src: ['sounds/rain.mp3'] }, 
    birds: { src: ['sounds/bird.mp3'] },
    wind: { src: ['sounds/wind.mp3'] }, 
    fire: { src: ['sounds/fire.mp3'] },
  };
  
  function createAudioWithFallback(sources) {
    const audio = new Audio();
    sources.forEach(src => {
      const source = document.createElement('source');
      source.src = src;
      source.type = `audio/${src.split('.').pop()}`;
      audio.appendChild(source);
    });
    return audio;
  }
  
  Object.keys(sounds).forEach(soundId => {
    sounds[soundId] = createAudioWithFallback(sounds[soundId].src);
    sounds[soundId].loop = true;
  });
  
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const soundId = e.target.id;
      const volume = parseFloat(e.target.value);
      sounds[soundId].volume = volume;
  
      if (volume > 0 && sounds[soundId].paused) {
        sounds[soundId].play();
      } else if (volume === 0) {
        sounds[soundId].pause();
      }
    });
  });