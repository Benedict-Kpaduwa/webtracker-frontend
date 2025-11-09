import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise = null;
export async function initFingerprint() {
  if (!fpPromise) fpPromise = FingerprintJS.load();
  return fpPromise;
}

export async function getVisitorId() {
  const fp = await initFingerprint();
  const result = await fp.get();
  return result.visitorId;
}

export async function trackEvent({ page = '/', type = 'pageview', payload = null }) {
  try {
    const visitorId = await getVisitorId();
    const sessionId = sessionStorage.getItem('sessionId') || crypto.randomUUID();
    sessionStorage.setItem('sessionId', sessionId);

    const body = {
      visitorId,
      sessionId,
      page,
      type,
      payload,
      userAgent: navigator.userAgent
    };

    fetch(`${'https://webtracker-backend.vercel.app'}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).catch(err => {
      // console.warn('track error', err);
    });
  } catch (err) {
    // console.warn('fingerprint error', err);
  }
}
