import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 환경 변수가 없어도 앱이 실행되도록 더미 클라이언트 생성
let supabaseClient: ReturnType<typeof createClient>;
let projectRef = 'unknown';
let storageKey = 'sb-unknown-auth-token';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] 환경 변수가 설정되지 않았습니다. Supabase 기능이 비활성화됩니다.');
  // 더미 URL과 키로 클라이언트 생성 (실제 기능은 작동하지 않음)
  // @ts-ignore - 더미 클라이언트이므로 타입 체크 무시
  supabaseClient = createClient('https://placeholder.supabase.co', 'dummy-key', {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
      storage: window.localStorage,
      storageKey: storageKey,
    },
  }) as any;
} else {
  // Supabase URL에서 프로젝트 참조 추출 (스토리지 키 생성용)
  projectRef = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || 'unknown';
  storageKey = `sb-${projectRef}-auth-token`;

  console.log('[supabase] 프로젝트 참조:', projectRef);
  console.log('[supabase] 스토리지 키:', storageKey);

  // 명시적으로 스토리지 설정
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storage: window.localStorage,
      storageKey: storageKey,
    },
  });
}

export const supabase: any = supabaseClient;
export type { User as SupabaseUser, Session } from '@supabase/supabase-js';

// 스토리지 키를 export하여 clearAuthStorage에서 사용
export { storageKey, projectRef };
