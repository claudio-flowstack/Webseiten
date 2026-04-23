import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import type { ConfirmationResult } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAPeSjMFGy8O3eGWseoiQMtYq-v6aRIGgU',
  authDomain: 'gd-automation-83914.firebaseapp.com',
  projectId: 'gd-automation-83914',
  storageBucket: 'gd-automation-83914.firebasestorage.app',
  messagingSenderId: '892209075916',
  appId: '1:892209075916:web:973e5cf66a95f7590ed469',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'de';

export type { ConfirmationResult };

/**
 * Sendet einen SMS-Verifizierungscode.
 * Erstellt automatisch einen unsichtbaren reCAPTCHA auf dem angegebenen Button.
 */
export async function sendSmsCode(phoneNumber: string, _buttonId?: string): Promise<ConfirmationResult> {
  // Alten reCAPTCHA Container entfernen falls vorhanden
  const existing = document.getElementById('recaptcha-container');
  if (existing) existing.remove();

  // Neuen unsichtbaren Container erstellen
  const container = document.createElement('div');
  container.id = 'recaptcha-container';
  document.body.appendChild(container);

  const verifier = new RecaptchaVerifier(auth, container, {
    size: 'invisible',
  });

  try {
    const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return result;
  } catch (err) {
    verifier.clear();
    container.remove();
    throw err;
  }
}
