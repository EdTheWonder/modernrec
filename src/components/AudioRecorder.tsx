import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Mic, StopCircle } from 'lucide-react';

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      gsap.to('.record-button', { scale: 1.1, duration: 0.3, repeat: -1, yoyo: true });
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      gsap.to('.record-button', { scale: 1, duration: 0.3 });
    }
  };

  React.useEffect(() => {
    gsap.from('.recorder-container', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
  }, []);

  return (
    <div className="recorder-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Audio Recorder</h1>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="record-button bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition duration-300 flex items-center justify-center"
      >
        {isRecording ? <StopCircle size={32} /> : <Mic size={32} />}
      </button>
      {audioURL && (
        <div className="mt-8">
          <audio src={audioURL} controls className="w-full" />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;