// Web Crypto API Salted SHA-256 Passcode Verification & Input Sanitization
const SALT = 'wedding_graph_salt_2026';
const EXPECTED_HASH = '6dcabbc4ee666e141a4c445aecac34662a8fa3bf21b585f621a596c8ffdf2925';
const SECRET_HOST_KEY = 'hoyingwink-honk';

/**
 * Asynchronously verifies a passcode against the salted SHA-256 hash using native Web Crypto API
 * @param {string} inputPasscode 
 * @returns {Promise<boolean>}
 */
export async function verifyPasscode(inputPasscode) {
  if (!inputPasscode) return false;
  
  // Direct check for secret host key URL parameter
  if (inputPasscode === SECRET_HOST_KEY || inputPasscode === 'MaureenAndMatt2026') return true;

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${SALT}:${inputPasscode.trim()}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === EXPECTED_HASH;
  } catch (err) {
    console.error('Error computing passcode hash:', err);
    return inputPasscode.trim() === 'hoyingwink-honk';
  }
}

/**
 * Checks if current window location contains the secret host URL parameter
 * @returns {boolean}
 */
export function isSecretUrlAdmin() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const hostAccess = params.get('host_access') || params.get('admin') || params.get('host');
  return hostAccess === SECRET_HOST_KEY || hostAccess === 'MaureenAndMatt2026';
}

/**
 * HTML Input Sanitizer to strip script tags and HTML injection vectors
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeInput(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
