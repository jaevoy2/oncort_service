// Emails the site owner a short report for each new visit.
// A static site has no mail server, so the report is posted to Web3Forms, which
// forwards it to the address the access key was created for.
// Setup: create a free key for francis@creativedevlabs.com at https://web3forms.com
// and put it in .env as VITE_WEB3FORMS_KEY (see .env.example). Sent once per browser session.

const OWNER_EMAIL = 'francis@creativedevlabs.com'

function parseUserAgent(ua) {
  const browser = /Edg\//.test(ua)
    ? 'Microsoft Edge'
    : /OPR\//.test(ua)
      ? 'Opera'
      : /Firefox\//.test(ua)
        ? 'Firefox'
        : /Chrome\//.test(ua)
          ? 'Chrome'
          : /Safari\//.test(ua)
            ? 'Safari'
            : 'Unknown'
  const os = /Windows/.test(ua)
    ? 'Windows'
    : /Android/.test(ua)
      ? 'Android'
      : /iPhone|iPad|iPod/.test(ua)
        ? 'iOS'
        : /Mac OS X/.test(ua)
          ? 'macOS'
          : /Linux/.test(ua)
            ? 'Linux'
            : 'Unknown OS'
  const type = /iPad|Tablet/.test(ua) ? 'Tablet' : /Mobi|Android|iPhone/.test(ua) ? 'Mobile' : 'Desktop'
  return { browser, device: `${type} (${os})` }
}

async function lookupIpAndLocation() {
  try {
    const res = await fetch('https://ipwho.is/')
    const data = await res.json()
    if (!data.success) throw new Error('lookup failed')
    return {
      ip: data.ip,
      location: [data.city, data.region, data.country].filter(Boolean).join(', ') || 'Unknown',
    }
  } catch {
    return { ip: 'Unavailable', location: 'Unavailable' }
  }
}

export async function notifyVisit() {
  const key = import.meta.env.VITE_WEB3FORMS_KEY
  if (!key) return
  if (import.meta.env.DEV && !import.meta.env.VITE_NOTIFY_IN_DEV) return

  try {
    if (sessionStorage.getItem('visit-notified')) return
    sessionStorage.setItem('visit-notified', '1')
  } catch {
    // storage blocked: send anyway
  }

  const { ip, location } = await lookupIpAndLocation()
  const { browser, device } = parseUserAgent(navigator.userAgent)
  const when = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })

  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        to: OWNER_EMAIL,
        subject: 'New visitor on the Oncort website',
        from_name: 'Oncort Website',
        'IP Address': ip,
        Location: location,
        Device: device,
        Browser: browser,
        'Date/Time': when,
      }),
    })
  } catch {
    // never break the page over a failed notification
  }
}
