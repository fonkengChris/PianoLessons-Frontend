/**
 * Video compatibility utilities for cross-browser support
 * Supports Chrome, Firefox, Edge, Safari, and Opera
 */

export interface VideoFormat {
  extension: string;
  mimeType: string;
  supported: boolean;
}

export interface BrowserInfo {
  name: string;
  version: string;
  supportsMP4: boolean;
  supportsWebM: boolean;
  supportsOGV: boolean;
  supportsHLS: boolean;
  supportsDASH: boolean;
}

/**
 * Detect the current browser and its capabilities
 */
export const detectBrowser = (): BrowserInfo => {
  const userAgent = navigator.userAgent;
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);
  const isEdge = /Edg/.test(userAgent);
  const isOpera = /Opera|OPR/.test(userAgent);

  let browserName = 'Unknown';
  let version = '0';

  if (isChrome) {
    browserName = 'Chrome';
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || '0';
  } else if (isFirefox) {
    browserName = 'Firefox';
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || '0';
  } else if (isSafari) {
    browserName = 'Safari';
    version = userAgent.match(/Version\/(\d+)/)?.[1] || '0';
  } else if (isEdge) {
    browserName = 'Edge';
    version = userAgent.match(/Edg\/(\d+)/)?.[1] || '0';
  } else if (isOpera) {
    browserName = 'Opera';
    version = userAgent.match(/OPR\/(\d+)/)?.[1] || '0';
  }

  // Test video format support
  const video = document.createElement('video');
  const supportsMP4 = video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== '';
  const supportsWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
  const supportsOGV = video.canPlayType('video/ogg; codecs="theora, vorbis"') !== '';
  const supportsHLS = video.canPlayType('application/vnd.apple.mpegURL') !== '';
  const supportsDASH = video.canPlayType('application/dash+xml') !== '';

  return {
    name: browserName,
    version,
    supportsMP4,
    supportsWebM,
    supportsOGV,
    supportsHLS,
    supportsDASH,
  };
};

/**
 * Get the best video format for the current browser
 */
export const getBestVideoFormat = (availableFormats: string[]): string | null => {
  const browser = detectBrowser();
  const video = document.createElement('video');

  // Priority order based on browser compatibility
  const formatPriority = [
    { ext: 'mp4', mime: 'video/mp4; codecs="avc1.42E01E"' },
    { ext: 'webm', mime: 'video/webm; codecs="vp8, vorbis"' },
    { ext: 'ogg', mime: 'video/ogg; codecs="theora, vorbis"' },
  ];

  // Browser-specific preferences
  if (browser.name === 'Safari') {
    // Safari prefers MP4
    formatPriority.unshift({ ext: 'mp4', mime: 'video/mp4; codecs="avc1.42E01E"' });
  } else if (browser.name === 'Firefox') {
    // Firefox prefers WebM
    formatPriority.unshift({ ext: 'webm', mime: 'video/webm; codecs="vp8, vorbis"' });
  }

  for (const format of formatPriority) {
    if (availableFormats.includes(format.ext) && video.canPlayType(format.mime) !== '') {
      return format.ext;
    }
  }

  return null;
};

/**
 * Generate fallback video sources for better compatibility
 */
export const generateVideoSources = (baseUrl: string): Array<{ src: string; type: string; label: string }> => {
  const sources = [];
  const browser = detectBrowser();

  // Remove file extension from base URL
  const cleanUrl = baseUrl.replace(/\.(mp4|webm|ogg|ogv)$/i, '');

  // Add MP4 source (most compatible)
  if (browser.supportsMP4) {
    sources.push({
      src: `${cleanUrl}.mp4`,
      type: 'video/mp4',
      label: 'MP4 (H.264)',
    });
  }

  // Add WebM source (good compression, open source)
  if (browser.supportsWebM) {
    sources.push({
      src: `${cleanUrl}.webm`,
      type: 'video/webm',
      label: 'WebM (VP8/VP9)',
    });
  }

  // Add OGG source (fallback for older browsers)
  if (browser.supportsOGV) {
    sources.push({
      src: `${cleanUrl}.ogg`,
      type: 'video/ogg',
      label: 'OGG (Theora)',
    });
  }

  // If no sources were added, add the original URL as fallback
  if (sources.length === 0) {
    sources.push({
      src: baseUrl,
      type: 'video/mp4',
      label: 'Default',
    });
  }

  return sources;
};

/**
 * Check if the browser supports fullscreen API
 */
export const supportsFullscreen = (): boolean => {
  return !!(
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled
  );
};

/**
 * Check if the browser supports picture-in-picture
 */
export const supportsPictureInPicture = (): boolean => {
  return !!(document as any).pictureInPictureEnabled;
};

/**
 * Get browser-specific video player configuration
 */
export const getVideoPlayerConfig = () => {
  const browser = detectBrowser();

  const baseConfig = {
    file: {
      attributes: {
        controlsList: 'nodownload',
        preload: 'metadata',
        crossOrigin: 'anonymous',
      },
      tracks: [],
    },
  };

  // Browser-specific optimizations
  if (browser.name === 'Safari') {
    // Safari-specific optimizations
    return {
      ...baseConfig,
      file: {
        ...baseConfig.file,
        attributes: {
          ...baseConfig.file.attributes,
          playsInline: true,
        },
      },
    };
  }

  if (browser.name === 'Firefox') {
    // Firefox-specific optimizations
    return {
      ...baseConfig,
      file: {
        ...baseConfig.file,
        attributes: {
          ...baseConfig.file.attributes,
          mozMediaKeys: true,
        },
      },
    };
  }

  return baseConfig;
};

/**
 * Get recommended video quality based on browser and connection
 */
export const getRecommendedQuality = (): 'low' | 'medium' | 'high' | 'auto' => {
  const browser = detectBrowser();
  
  // Check connection speed if available
  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'low';
    }
    if (effectiveType === '3g') {
      return 'medium';
    }
  }

  // Browser-specific recommendations
  if (browser.name === 'Safari' && parseInt(browser.version) < 13) {
    return 'medium'; // Older Safari versions may struggle with high quality
  }

  return 'auto';
};

/**
 * Check if the browser supports modern video features
 */
export const getBrowserCapabilities = () => {
  const browser = detectBrowser();
  
  return {
    supportsFullscreen: supportsFullscreen(),
    supportsPictureInPicture: supportsPictureInPicture(),
    supportsWebGL: !!document.createElement('canvas').getContext('webgl'),
    supportsWebAssembly: typeof WebAssembly === 'object',
    supportsServiceWorker: 'serviceWorker' in navigator,
    supportsPushNotifications: 'PushManager' in window,
    supportsOfflineStorage: 'indexedDB' in window,
    supportsWebRTC: !!(navigator as any).getUserMedia || !!(navigator as any).webkitGetUserMedia,
    supportsWebAudio: !!(window as any).AudioContext || !!(window as any).webkitAudioContext,
  };
};
