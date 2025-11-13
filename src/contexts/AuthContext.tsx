import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { supabase } from '../utils/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (nickname: string, password: string) => Promise<boolean>;
  signIn: (nickname: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 초기 세션 확인 및 인증 상태 리스너 설정
  useEffect(() => {
    console.log('[AuthContext] 초기화 시작');

    // 환경 변수 확인
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('[AuthContext] Supabase 환경 변수가 없습니다. 인증 기능이 비활성화됩니다.');
      setLoading(false);
      return;
    }

    // 인증 상태 변경 리스너 (먼저 설정하여 초기 세션도 감지)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state changed:', event, session?.user?.id);
      
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (session?.user) {
          console.log('[AuthContext] 세션 발견, 사용자 정보 로드 시작');
          await loadUser();
        } else {
          console.log('[AuthContext] 세션 없음');
          setUser(null);
        }
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        console.log('[AuthContext] 로그아웃 이벤트');
        setUser(null);
        setLoading(false);
      } else if (event === 'TOKEN_REFRESHED' && session) {
        console.log('[AuthContext] 토큰 갱신');
        await loadUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadUser() {
    console.log('[AuthContext] loadUser 시작');
    try {
      const { user: userData, error: err } = await authService.getCurrentUser();
      if (userData && !err) {
        console.log('[AuthContext] 사용자 정보 로드 성공:', userData.nickname);
        setUser(userData);
      } else {
        console.log('[AuthContext] 사용자 정보 없음');
        setUser(null);
      }
    } catch (error) {
      console.error('[AuthContext] loadUser 에러:', error);
      setUser(null);
    }
  }

  async function signUp(nickname: string, password: string): Promise<boolean> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      setError('Supabase가 설정되지 않았습니다. 환경 변수를 확인해주세요.');
      return false;
    }

    setError(null);
    const { user: newUser, error: err } = await authService.signUp(nickname, password);
    if (newUser && !err) {
      setUser(newUser);
      return true;
    }
    setError(err || '회원가입에 실패했습니다.');
    return false;
  }

  async function signIn(nickname: string, password: string): Promise<boolean> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      setError('Supabase가 설정되지 않았습니다. 환경 변수를 확인해주세요.');
      return false;
    }

    setError(null);
    setLoading(true);
    console.log('[AuthContext] signIn 시작:', nickname);
    
    try {
      const { user: userData, error: err } = await authService.signIn(nickname, password);
      
      if (userData && !err) {
        console.log('[AuthContext] signIn 성공, 사용자 설정:', userData.nickname);
        setUser(userData);
        setLoading(false);
        return true;
      }
      
      console.log('[AuthContext] signIn 실패:', err);
      setError(err || '로그인에 실패했습니다.');
      setLoading(false);
      return false;
    } catch (error: any) {
      console.error('[AuthContext] signIn 예외:', error);
      setError(error.message || '로그인 중 오류가 발생했습니다.');
      setLoading(false);
      return false;
    }
  }

  async function signOut() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      setUser(null);
      return;
    }

    console.log('[AuthContext] signOut 시작');
    await authService.signOut();
    setUser(null);
    console.log('[AuthContext] signOut 완료');
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
