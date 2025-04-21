
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
 * Sets up real-time monitoring on an external webpage
 * This function can be included in any website to monitor for bot activity
 */
export function setupExternalMonitoring(elementSelector: string = 'body') {
  const targetElement = document.querySelector(elementSelector);
  if (!targetElement) {
    console.error(`Element not found: ${elementSelector}`);
    return;
  }
  
  // Track page load
  window.addEventListener('load', () => {
    console.log('External honeypot monitoring activated');
    
    // You could send this data to your API
    const pageData = {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    
    console.log('Page load data:', pageData);
    // submitData(pageData); // You would implement this to send to your API
  });
  
  // Track clicks
  targetElement.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const clickData = {
      elementType: target.tagName,
      elementId: target.id,
      elementClass: target.className,
      timestamp: new Date().toISOString()
    };
    
    console.log('Click data:', clickData);
    // submitData(clickData); // You would implement this to send to your API
  });
  
  // More event listeners could be added here
}
