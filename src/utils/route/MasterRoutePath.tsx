'use client';

import React, { useEffect, useState } from 'react';

import { Authority } from 'api/authApi';
import Link from 'next/link';
import { getToken } from 'utils/session/sessionStorageManager';
import { useAuth } from 'hooks';
import { useRouter as useNavigate } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useToast } from 'utils/toast/ToastContext';
import { v4 as uuidv4 } from 'uuid';

const MasterRoutePath = (props: any) => {
  const { auth, isAuthenticated, authority, signInWithToken, signOut } =
    useAuth();

  const navigate = useNavigate();
  const pathname = usePathname();
  const toast = useToast();
  const token = getToken();
  const [tokenInitialized, setTokenInitialized] = useState(
    isAuthenticated || token,
  );
  const [isMaster, setIsMaster] = useState<boolean>(
    authority ? authority === Authority.MASTER : false,
  );

  // 토큰 여부 식별
  useEffect(() => {
    if (!tokenInitialized && token) {
      signInWithToken(token).then(() => {
        setTokenInitialized(true);
      });
    }
  }, [signInWithToken, token, tokenInitialized]);

  // 유저 정보 식별
  useEffect(() => {
    // console.log('[T] user info : ', authority, auth, pathname);
    if (!auth || authority !== Authority.MASTER) {
      setIsMaster(false);
    }
    if (auth && authority === Authority.MASTER) {
      setIsMaster(true);
    }
  }, [authority, pathname]);

  if (!tokenInitialized || !token) {
    signOut('다시 로그인 해주세요.');
    navigate.push('/');
    return <Link href={{ pathname: '/' }} />;
  }

  if (!isMaster) {
    toast.toastMsg(uuidv4(), '접근 권한이 없습니다.', 'error');
    navigate.push('/');
    return <Link href={{ pathname: '/' }} />;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default MasterRoutePath;
