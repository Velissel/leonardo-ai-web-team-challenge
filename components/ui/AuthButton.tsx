'use client';

import { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store'; // Assuming RootState is exported from store
import { clearUser } from '@/store/slices/userSlice';

export default function AuthButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, jobTitle } = useSelector((state: RootState) => state.user);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(clearUser());
    router.push('/');
  }, []);

  if (username && jobTitle) {
    return (
      <Button colorPalette='yellow' onClick={handleLogout}>
        Logout
      </Button>
    );
  }

  return (
    <Button colorPalette='green' onClick={handleLogin}>
      Login
    </Button>
  );
}
