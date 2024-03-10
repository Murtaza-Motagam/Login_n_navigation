// authMiddleware.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuthMiddleware(redirectPath = '/dashboard') {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('User-details');
    const isActive = localStorage.getItem('isUserActive');
    const isUserActive = JSON.parse(isActive); 

    if (isAuthenticated && isUserActive === "true") {
      router.push(redirectPath);
    }
    else{
      router.push('/login')
    }
    
  }, [router]);

  return null;
}