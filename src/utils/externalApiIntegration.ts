/**
 * Client-side utility for integrating with the Honeypot API from external websites
 */

// Configure the API endpoint and key
const API_ENDPOINT = "https://jogdukxsxjwjhozwfapy.functions.supabase.co/honeypot-api";
const API_KEY = "honeypot-secure-api-key-123456"; // In a real app, store securely

/**
 * Fetches honeypot data from the API
 */
export async function fetchHoneypotData() {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch honeypot data:', error);
    throw error;
  }
}

/**
 * Submits model training data to the API
 */
export async function submitModelTraining(trainingData: {
  duration?: number;
  samples?: number;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  improvements?: string[];
}) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        type: 'train_model',
        ...trainingData
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to submit model training data:', error);
    throw error;
  }
}

/**
 * Report bot detection to the API
 * This can be used by external sites to report bot detections
 */
export async function reportBotDetection(detectionData: {
  session_id: string;
  user_agent?: string;
  ip_address?: string;
  fingerprint: string;
  is_bot: boolean;
  confidence: number;
  bot_type?: string;
  reasons?: string[];
  url?: string;
  referrer?: string;
}) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        type: 'report_detection',
        ...detectionData,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to report bot detection:', error);
    throw error;
  }
}

/**
 * Fetches the latest ML model for web use
 * This will download a lightweight model that can be used directly in the browser
 */
export async function fetchLatestModel() {
  try {
    const response = await fetch(`${API_ENDPOINT}/model`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error || response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch latest model:', error);
    throw error;
  }
}

/**
 * Sets up real-time monitoring on an external webpage
 * This function can be included in any website to monitor for bot activity
 */
export function setupExternalMonitoring(elementSelector: string = 'body', options = {
  reportInterval: 30000, // Report data every 30 seconds
  captureClicks: true,
  captureNavigation: true,
  captureKeyboard: true,
  captureMouse: true,
  captureScroll: true,
  captureFormInteraction: true,
  useAdvancedFingerprinting: true,
  useBehavioralAnalysis: true
}) {
  const targetElement = document.querySelector(elementSelector);
  if (!targetElement) {
    console.error(`Element not found: ${elementSelector}`);
    return;
  }
  
  // Generate a session ID
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  
  // Create tracking state
  const trackingState = {
    sessionStart: Date.now(),
    lastActivity: Date.now(),
    mouseMovements: 0,
    keyboardInteractions: 0,
    clicks: 0,
    scrollEvents: 0,
    formInteractions: 0,
    navigationEvents: 0,
    pageLoads: 1,
    currentPage: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    fingerprint: generateAdvancedFingerprint(),
    interactions: []
  };
  
  // Track page load
  window.addEventListener('load', () => {
    console.log('External honeypot monitoring activated');
    trackActivity('page_load', { url: window.location.href });
    
    // Send initial data
    setTimeout(() => reportData(), 5000);
  });
  
  // Setup periodic reporting
  const reportingInterval = setInterval(() => reportData(), options.reportInterval);
  
  // Track clicks
  if (options.captureClicks) {
    targetElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      trackingState.clicks++;
      trackActivity('click', {
        elementType: target.tagName,
        elementId: target.id,
        elementClass: target.className,
        elementText: target.textContent?.substring(0, 100) || '',
        x: (event as MouseEvent).clientX,
        y: (event as MouseEvent).clientY
      });
    });
  }
  
  // Track mouse movements (sampling)
  if (options.captureMouse) {
    let lastMoveTime = 0;
    targetElement.addEventListener('mousemove', (event) => {
      const now = Date.now();
      if (now - lastMoveTime > 100) { // Sample every 100ms to avoid excessive data
        trackingState.mouseMovements++;
        lastMoveTime = now;
      }
    });
  }
  
  // Track keyboard (just count, don't log actual keys for privacy)
  if (options.captureKeyboard) {
    targetElement.addEventListener('keydown', () => {
      trackingState.keyboardInteractions++;
      trackActivity('keyboard', { count: trackingState.keyboardInteractions });
    });
  }
  
  // Track scroll
  if (options.captureScroll) {
    window.addEventListener('scroll', () => {
      trackingState.scrollEvents++;
      // Track scroll position as percentage of page
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollTop / scrollHeight * 100;
      
      trackActivity('scroll', { 
        percent: Math.round(scrollPercent),
        count: trackingState.scrollEvents
      });
    });
  }
  
  // Track form interactions
  if (options.captureFormInteraction) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        trackingState.formInteractions++;
        trackActivity('form_submit', { 
          formId: (form as HTMLElement).id,
          formAction: (form as HTMLFormElement).action,
          formMethod: (form as HTMLFormElement).method
        });
      });
      
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          trackActivity('form_focus', { 
            inputType: (input as HTMLElement).tagName,
            inputId: (input as HTMLElement).id,
            inputName: (input as HTMLInputElement).name
          });
        });
      });
    });
  }
  
  // Track navigation
  if (options.captureNavigation) {
    // Use History API
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
      trackingState.navigationEvents++;
      trackActivity('navigation', { 
        from: trackingState.currentPage,
        to: arguments[2] as string || window.location.href
      });
      trackingState.currentPage = arguments[2] as string || window.location.href;
      return originalPushState.apply(this, arguments as any);
    };
    
    history.replaceState = function() {
      trackActivity('navigation_replace', { 
        from: trackingState.currentPage,
        to: arguments[2] as string || window.location.href
      });
      trackingState.currentPage = arguments[2] as string || window.location.href;
      return originalReplaceState.apply(this, arguments as any);
    };
    
    // Track page unload
    window.addEventListener('beforeunload', () => {
      trackActivity('page_unload', { 
        timeSpent: Date.now() - trackingState.sessionStart,
        url: window.location.href
      });
      
      // Try to send final report before page unloads
      reportData(true);
    });
  }
  
  // Helper function to track activity
  function trackActivity(type: string, data: any = {}) {
    trackingState.lastActivity = Date.now();
    trackingState.interactions.push({
      type,
      timestamp: new Date().toISOString(),
      data
    });
    
    // Keep only the last 100 interactions to manage memory
    if (trackingState.interactions.length > 100) {
      trackingState.interactions.shift();
    }
  }
  
  // Generate advanced browser fingerprint
  function generateAdvancedFingerprint() {
    // This would be a more comprehensive implementation in production
    const screen = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const timezone = new Date().getTimezoneOffset();
    const language = navigator.language;
    const plugins = Array.from(navigator.plugins || []).map(p => p.name).join(',');
    const canvas = getCanvasFingerprint();
    const webgl = getWebGLFingerprint();
    
    return btoa(`${screen}|${timezone}|${language}|${plugins}|${canvas}|${webgl}`);
  }
  
  // Canvas fingerprinting
  function getCanvasFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      
      canvas.width = 200;
      canvas.height = 50;
      
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(10, 10, 100, 30);
      ctx.fillStyle = '#069';
      ctx.fillText('Honeypot Fingerprint', 2, 15);
      
      return canvas.toDataURL().slice(0, 100);
    } catch (e) {
      return '';
    }
  }
  
  // WebGL fingerprinting
  function getWebGLFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (!gl) return '';
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (!debugInfo) return '';
      
      return `${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)}|${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}`;
    } catch (e) {
      return '';
    }
  }
  
  // Report data to the API
  async function reportData(isFinal: boolean = false) {
    if (trackingState.interactions.length === 0 && !isFinal) {
      return; // No new data to report
    }
    
    try {
      const payload = {
        session_id: sessionId,
        user_agent: trackingState.userAgent,
        fingerprint: trackingState.fingerprint,
        url: window.location.href,
        referrer: trackingState.referrer,
        time_spent: Date.now() - trackingState.sessionStart,
        mouse_movements: trackingState.mouseMovements,
        keyboard_interactions: trackingState.keyboardInteractions,
        clicks: trackingState.clicks,
        scrolls: trackingState.scrollEvents,
        form_interactions: trackingState.formInteractions,
        navigation_events: trackingState.navigationEvents,
        interactions: trackingState.interactions,
        is_final: isFinal
      };
      
      // Clear interactions after reporting
      trackingState.interactions = [];
      
      await reportBotDetection({
        session_id: sessionId,
        user_agent: trackingState.userAgent,
        fingerprint: trackingState.fingerprint,
        is_bot: false, // Client doesn't decide this, server will analyze
        confidence: 0,
        url: window.location.href,
        referrer: trackingState.referrer
      });
      
      console.log('Reported monitoring data to honeypot API');
    } catch (error) {
      console.error('Failed to report monitoring data:', error);
    }
  }
  
  // Return a cleanup function
  return () => {
    clearInterval(reportingInterval);
    // Add additional cleanup here if needed
  };
}

/**
 * Creates a honeypot trap on an external webpage
 * This function adds invisible elements that only bots would interact with
 */
export function createHoneypotTrap(containerSelector: string = 'body') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container not found: ${containerSelector}`);
    return;
  }
  
  // Create invisible links
  const trapDiv = document.createElement('div');
  trapDiv.style.opacity = '0.01';
  trapDiv.style.position = 'absolute';
  trapDiv.style.height = '1px';
  trapDiv.style.width = '1px';
  trapDiv.style.overflow = 'hidden';
  trapDiv.setAttribute('aria-hidden', 'true');
  trapDiv.className = 'abyss-honeytrap';
  
  // Add trap content
  trapDiv.innerHTML = `
    <a href="/admin-login" class="trap-link">Admin Login</a>
    <a href="/private-data" class="trap-link">Customer Database</a>
    <a href="/api-keys" class="trap-link">API Keys</a>
    <form method="post" action="/login" class="trap-form">
      <input type="text" name="username" value="admin">
      <input type="password" name="password" value="password123">
      <button type="submit">Login</button>
    </form>
  `;
  
  // Add event listeners
  const trapLinks = trapDiv.querySelectorAll('.trap-link');
  trapLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Honeypot trap triggered: link');
      reportTrapTrigger('link', (e.target as HTMLElement).textContent || '');
    });
  });
  
  const trapForm = trapDiv.querySelector('.trap-form');
  if (trapForm) {
    trapForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Honeypot trap triggered: form');
      reportTrapTrigger('form', 'login_attempt');
    });
  }
  
  // Add to container
  container.appendChild(trapDiv);
  
  // Add invisible form fields to real forms
  const realForms = document.querySelectorAll('form:not(.trap-form)');
  realForms.forEach(form => {
    const trapField = document.createElement('div');
    trapField.style.opacity = '0.01';
    trapField.style.position = 'absolute';
    trapField.style.height = '1px';
    trapField.style.width = '1px';
    trapField.style.overflow = 'hidden';
    trapField.setAttribute('aria-hidden', 'true');
    
    trapField.innerHTML = `
      <input type="text" name="honeytrap_username" class="trap-input">
      <input type="checkbox" name="i_am_not_a_bot" checked class="trap-checkbox">
    `;
    
    form.appendChild(trapField);
    
    // Check on form submit
    form.addEventListener('submit', () => {
      const trapInput = form.querySelector('.trap-input') as HTMLInputElement;
      const trapCheckbox = form.querySelector('.trap-checkbox') as HTMLInputElement;
      
      if (trapInput && trapInput.value !== '') {
        console.log('Honeypot trap triggered: invisible field populated');
        reportTrapTrigger('form_field', 'field_populated');
      }
      
      if (trapCheckbox && !trapCheckbox.checked) {
        console.log('Honeypot trap triggered: checkbox unchecked');
        reportTrapTrigger('form_checkbox', 'checkbox_modified');
      }
    });
  });
  
  // Report trap triggers
  function reportTrapTrigger(type: string, details: string) {
    const sessionId = localStorage.getItem('abyss_session_id') || 
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    if (!localStorage.getItem('abyss_session_id')) {
      localStorage.setItem('abyss_session_id', sessionId);
    }
    
    reportBotDetection({
      session_id: sessionId,
      user_agent: navigator.userAgent,
      fingerprint: generateAdvancedFingerprint(),
      is_bot: true,
      confidence: 0.95,
      bot_type: 'TRAP_TRIGGERED',
      reasons: [`Honeypot trap triggered: ${type} - ${details}`],
      url: window.location.href,
      referrer: document.referrer
    });
  }
}

/**
 * Creates an impossible CAPTCHA honeypot
 * This creates a CAPTCHA that's impossible for humans but might trick bots
 */
export function createImpossibleCaptcha(containerSelector: string = 'body') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container not found: ${containerSelector}`);
    return;
  }

  // Create captcha container
  const captchaDiv = document.createElement('div');
  captchaDiv.style.opacity = '0.01';
  captchaDiv.style.position = 'absolute';
  captchaDiv.style.height = '1px';
  captchaDiv.style.width = '1px';
  captchaDiv.style.overflow = 'hidden';
  captchaDiv.setAttribute('aria-hidden', 'true');
  captchaDiv.className = 'abyss-impossible-captcha';
  
  // Generate random challenge
  const challenge = generateRandomChallenge();
  
  // Add captcha content
  captchaDiv.innerHTML = `
    <div class="captcha-container">
      <div class="captcha-challenge">${challenge.question}</div>
      <form class="captcha-form">
        <input type="text" name="captcha-answer" class="captcha-input">
        <input type="hidden" name="captcha-id" value="${challenge.id}">
        <button type="submit">Verify</button>
      </form>
    </div>
  `;
  
  // Add event listener
  const captchaForm = captchaDiv.querySelector('.captcha-form');
  if (captchaForm) {
    captchaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const answer = (captchaDiv.querySelector('.captcha-input') as HTMLInputElement).value;
      console.log('Impossible CAPTCHA attempted:', answer);
      
      // Any attempt is a bot since humans can't see this captcha
      reportCaptchaTrigger(challenge.id, answer);
      
      // Generate a new challenge
      const newChallenge = generateRandomChallenge();
      (captchaDiv.querySelector('.captcha-challenge') as HTMLElement).textContent = newChallenge.question;
      (captchaDiv.querySelector('input[name="captcha-id"]') as HTMLInputElement).value = newChallenge.id;
    });
  }
  
  // Add to container
  container.appendChild(captchaDiv);
  
  // Generate a random challenge
  function generateRandomChallenge() {
    const challenges = [
      { id: 'c1', question: 'What color is the number 7?', answer: null },
      { id: 'c2', question: 'How many sides does a circle have?', answer: null },
      { id: 'c3', question: 'What is the sound of one hand clapping?', answer: null },
      { id: 'c4', question: 'What is the weight of Tuesday?', answer: null },
      { id: 'c5', question: 'Complete: Fish × Tree = ?', answer: null }
    ];
    
    return challenges[Math.floor(Math.random() * challenges.length)];
  }
  
  // Report captcha triggers
  function reportCaptchaTrigger(challengeId: string, answer: string) {
    const sessionId = localStorage.getItem('abyss_session_id') || 
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    if (!localStorage.getItem('abyss_session_id')) {
      localStorage.setItem('abyss_session_id', sessionId);
    }
    
    reportBotDetection({
      session_id: sessionId,
      user_agent: navigator.userAgent,
      fingerprint: generateAdvancedFingerprint(),
      is_bot: true,
      confidence: 0.98,
      bot_type: 'CAPTCHA_BOT',
      reasons: [`Impossible CAPTCHA attempted: challenge=${challengeId}, answer=${answer}`],
      url: window.location.href,
      referrer: document.referrer
    });
  }
}

/**
 * Helper function to generate a fingerprint
 */
function generateAdvancedFingerprint() {
  // This would be a more comprehensive implementation in production
  const screen = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timezone = new Date().getTimezoneOffset().toString();
  const language = navigator.language;
  const canvas = getCanvasFingerprint();
  
  return btoa(`${screen}|${timezone}|${language}|${canvas}`);
}

// Canvas fingerprinting
function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    canvas.width = 200;
    canvas.height = 50;
    
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(10, 10, 100, 30);
    ctx.fillStyle = '#069';
    ctx.fillText('Honeypot Fingerprint', 2, 15);
    
    return canvas.toDataURL().slice(0, 100);
  } catch (e) {
    return '';
  }
}
