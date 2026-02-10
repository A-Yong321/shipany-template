'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface TextToImageContextType {
  generatedImage?: string;
  generatedPrompt?: string;
  isGenerating: boolean;
  error: string | null;
  setIsGenerating: (generating: boolean) => void;
  startTask: (taskId: string, prompt: string) => void;
}

const TextToImageContext = createContext<TextToImageContextType | undefined>(undefined);

export function TextToImageProvider({ children }: { children: React.ReactNode }) {
  const [generatedImage, setGeneratedImage] = useState<string | undefined>(undefined);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pollTaskStatus = useCallback(async (taskId: string) => {
    let isStopped = false;
    const checkStatus = async () => {
      if (isStopped) return;
      try {
        const response = await fetch('/api/ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId })
        });
        if (!response.ok) throw new Error('Query failed');
        
        const res = await response.json();
        const data = res.data;
        
        if (data.status === 'succeeded' || data.status === 'completed' || data.status === 'SUCCESS' || data.status === 'success') {
          let result = data.taskResult;
          if (typeof result === 'string' && result) {
            try {
              result = JSON.parse(result);
            } catch (e) {
              console.error('Failed to parse taskResult string:', e);
            }
          }
          
          let info = data.taskInfo;
          if (typeof info === 'string' && info) {
            try {
              info = JSON.parse(info);
            } catch (e) {
              console.error('Failed to parse taskInfo string:', e);
            }
          }
          
          const imageUrl = result?.images?.[0]?.url || 
                           result?.imageUrls?.[0] || 
                           result?.url || 
                           info?.images?.[0]?.url || 
                           info?.imageUrls?.[0];
          
          if (imageUrl) {
            setGeneratedImage(imageUrl);
            setIsGenerating(false);
            isStopped = true;
            return;
          }
        } else if (data.status === 'failed' || data.status === 'FAILED') {
          setError('Generation failed. Please try again.');
          setIsGenerating(false);
          isStopped = true;
          return;
        }
        
        // Continue polling if not done
        if (!isStopped) {
          setTimeout(checkStatus, 3000);
        }
      } catch (err) {
        console.error('Poll error:', err);
        // On transient error, try again
        if (!isStopped) {
          setTimeout(checkStatus, 5000);
        }
      }
    };

    checkStatus();
    return () => { isStopped = true; };
  }, []);

  const startTask = (taskId: string, prompt: string) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedPrompt(prompt);
    pollTaskStatus(taskId);
  };

  return (
    <TextToImageContext.Provider value={{ generatedImage, generatedPrompt, isGenerating, error, setIsGenerating, startTask }}>
      {children}
    </TextToImageContext.Provider>
  );
}

export const useTextToImage = () => {
  const context = useContext(TextToImageContext);
  if (context === undefined) {
    throw new Error('useTextToImage must be used within a TextToImageProvider');
  }
  return context;
};
