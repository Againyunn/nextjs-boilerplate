'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { getToken } from 'utils/session/sessionStorageManager';
import { useAuth } from 'hooks';
import { useRouter as useNavigate } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useToast } from 'utils/toast/ToastContext';
import { v4 as uuidv4 } from 'uuid';

const UserRoutePath = (props: any) => {
  const { auth, isAuthenticated, signInWithToken } = useAuth(true);

  const navigate = useNavigate();
  const toast = useToast();
  // const { userId } = router.query;

  const token = getToken();
  const [tokenInitialized, setTokenInitialized] = useState(
    isAuthenticated || token,
  );

  // 토큰 여부 식별
  useEffect(() => {
    if (!tokenInitialized && token) {
      signInWithToken(token).then(() => {
        setTokenInitialized(true);
      });
    }
  }, [signInWithToken, token, tokenInitialized]);

  useEffect(() => {
    if (!auth) {
      toast.toastMsg(uuidv4(), '접근 권한이 없습니다.', 'error');
      navigate.push('/');
    }
  }, [auth]);

  if (!tokenInitialized || !token || !auth)
    return <Link href={{ pathname: '/' }} />;

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default UserRoutePath;
