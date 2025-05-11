
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CampNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Camp Not Found</h1>
      <p className="mb-6">Sorry, we couldn't find the camp you're looking for.</p>
      <Button onClick={() => navigate('/camps')}>Return to Camps</Button>
    </div>
  );
};

export default CampNotFound;
