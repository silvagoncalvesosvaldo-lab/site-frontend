import { useState, useEffect } from 'react';
import { cityCoordinates } from '@/lib/cityCoordinates';

export const useTripSimulation = (order) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!order || order.status !== 'in-progress' || !order.tripStartTime) {
      setCurrentPosition(null);
      setProgress(0);
      return;
    }

    const originCoords = cityCoordinates[order.origin];
    const destinationCoords = cityCoordinates[order.destination];

    if (!originCoords || !destinationCoords) {
      setCurrentPosition(null);
      setProgress(0);
      return;
    }
    
    setCurrentPosition(originCoords);

    const totalTripTime = 30000; // 30 seconds for simulation
    const intervalTime = 250; // update every 250ms

    const intervalId = setInterval(() => {
      const elapsedTime = new Date().getTime() - new Date(order.tripStartTime).getTime();
      const currentProgress = Math.min(elapsedTime / totalTripTime, 1);
      
      setProgress(currentProgress * 100);

      const lat = originCoords.lat + (destinationCoords.lat - originCoords.lat) * currentProgress;
      const lng = originCoords.lng + (destinationCoords.lng - originCoords.lng) * currentProgress;
      
      setCurrentPosition({ lat, lng });

      if (currentProgress >= 1) {
        clearInterval(intervalId);
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [order]);

  return { currentPosition, progress };
};