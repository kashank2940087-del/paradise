// Cryptographic utilities and security policies for Paradise Institute Admin Portal

const ADMIN_HASH_STORAGE_KEY = 'paradise_admin_key_hash';
const FAILED_ATTEMPTS_KEY = 'paradise_admin_failed_attempts';
const LOCKOUT_TIMESTAMP_KEY = 'paradise_admin_lockout_until';
const SESSION_KEY = 'paradise_admin_secure_session';
const AUDIT_LOG_KEY = 'paradise_admin_audit_logs';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'PASSWORD_CHANGED' | 'STATUS_UPDATED' | 'LOGOUT';
  details: string;
}

// Convert string to SHA-256 hexadecimal hash
export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Default initial key: "admin12345@" pre-computed SHA-256 hash:
// SHA-256 of "admin12345@" is:
// "f85f1c9c0b16f396ee0aa3a85b9b8b70a0d922bc083eb052b66718cf2cf03fe3"
const DEFAULT_KEY_HASH = 'f85f1c9c0b16f396ee0aa3a85b9b8b70a0d922bc083eb052b66718cf2cf03fe3';

export function getStoredPasswordHash(): string {
  const stored = localStorage.getItem(ADMIN_HASH_STORAGE_KEY);
  return stored || DEFAULT_KEY_HASH;
}

export function saveNewPasswordHash(newHash: string): void {
  localStorage.setItem(ADMIN_HASH_STORAGE_KEY, newHash);
  addAuditLog('PASSWORD_CHANGED', 'Administrator updated master security credentials');
}

// Lockout management
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export function getLockoutState(): { isLocked: boolean; remainingSeconds: number } {
  const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_TIMESTAMP_KEY) || '0', 10);
  const now = Date.now();
  if (lockoutUntil > now) {
    return { isLocked: true, remainingSeconds: Math.ceil((lockoutUntil - now) / 1000) };
  }
  if (lockoutUntil > 0 && lockoutUntil <= now) {
    // Reset lockout
    localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
    localStorage.removeItem(FAILED_ATTEMPTS_KEY);
  }
  return { isLocked: false, remainingSeconds: 0 };
}

export function recordFailedAttempt(): { remainingAttempts: number; isLocked: boolean; remainingSeconds: number } {
  const currentAttempts = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10) + 1;
  localStorage.setItem(FAILED_ATTEMPTS_KEY, currentAttempts.toString());

  addAuditLog('LOGIN_FAILURE', `Unauthorized login attempt (${currentAttempts}/${MAX_ATTEMPTS})`);

  if (currentAttempts >= MAX_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    localStorage.setItem(LOCKOUT_TIMESTAMP_KEY, lockoutUntil.toString());
    return { isLocked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), remainingAttempts: 0 };
  }

  return { isLocked: false, remainingSeconds: 0, remainingAttempts: MAX_ATTEMPTS - currentAttempts };
}

export function clearFailedAttempts(): void {
  localStorage.removeItem(FAILED_ATTEMPTS_KEY);
  localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
}

// Session management
export function createAdminSession(): string {
  clearFailedAttempts();
  const sessionToken = 'sec_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  const sessionData = {
    token: sessionToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * 60 * 1000 // 60 minutes
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  addAuditLog('LOGIN_SUCCESS', 'Authorized administrator signed in');
  return sessionToken;
}

export function isValidAdminSession(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      destroyAdminSession();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function destroyAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
  addAuditLog('LOGOUT', 'Administrator signed out');
}

// Audit logging
export function addAuditLog(type: AuditLogEntry['type'], details: string): void {
  try {
    const logs = getAuditLogs();
    const newEntry: AuditLogEntry = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      type,
      details
    };
    const updated = [newEntry, ...logs].slice(0, 50); // Keep last 50 events
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage issues
  }
}

export function getAuditLogs(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
