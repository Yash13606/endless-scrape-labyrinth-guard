
import { useCallback } from 'react';
import { logHoneypotInteraction } from '@/utils/supabaseHoneypot';

/**
 * Custom hook for extended bot detection logging that includes session tracking
 * and additional metrics
 */
export const useExtendedLogBotDetection = () => {
  return useCallback(
    (result: any, interaction_type: string, extra: Partial<any> = {}) => {
      logHoneypotInteraction({
        session_id: sessionStorage.getItem("abyss_session_id") ?? Math.random().toString(36).substring(2),
        fingerprint: result.fingerprint,
        user_agent: result.userAgent,
        ip_address: "",
        interaction_type,
        url_path: window.location.pathname + window.location.search,
        request_headers: {},
        time_spent: Date.now() - (window as any).abyss_loaded,
        is_bot: result.isBot,
        bot_type: result.botType,
        confidence: result.confidence,
        mouse_movements: (window as any).abyss_mouse_moves ?? 0,
        keyboard_interactions: (window as any).abyss_keyboard_ints ?? 0,
        navigation_speed: 0,
        ...extra
      });
    },
    []
  );
};
