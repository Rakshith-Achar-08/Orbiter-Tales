// Space Weather Data Integration Service
export class SpaceWeatherService {
  constructor() {
    this.apiKeys = {
      nasa: process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY',
      noaa: process.env.REACT_APP_NOAA_API_KEY || 'DEMO_KEY'
    };
    
    this.baseUrls = {
      nasa: 'https://api.nasa.gov',
      noaa: 'https://services.swpc.noaa.gov/json',
      csa: 'https://api.space.ca',
      embrace: 'https://api.embrace.space'
    };
    
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Get cached data or fetch new data
  async getCachedData(key, fetchFunction) {
    const cached = this.cache.get(key);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    
    try {
      const data = await fetchFunction();
      this.cache.set(key, { data, timestamp: now });
      return data;
    } catch (error) {
      console.warn(`Failed to fetch ${key}:`, error);
      return cached ? cached.data : null;
    }
  }

  // NASA DONKI API - Solar Flares
  async getSolarFlares() {
    return this.getCachedData('solarFlares', async () => {
      const response = await fetch(
        `${this.baseUrls.nasa}/DONKI/FLR?api_key=${this.apiKeys.nasa}&startDate=${this.getDateString(-7)}&endDate=${this.getDateString(0)}`
      );
      
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.processSolarFlares(data);
    });
  }

  // NOAA Space Weather Prediction Center - Geomagnetic Index
  async getGeomagneticIndex() {
    return this.getCachedData('geomagneticIndex', async () => {
      const response = await fetch(`${this.baseUrls.noaa}/planetary_k_index_1m.json`);
      
      if (!response.ok) {
        throw new Error(`NOAA API error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.processGeomagneticData(data);
    });
  }

  // NOAA Aurora Forecast
  async getAuroraForecast() {
    return this.getCachedData('auroraForecast', async () => {
      const response = await fetch(`${this.baseUrls.noaa}/ovation_aurora_latest.json`);
      
      if (!response.ok) {
        throw new Error(`NOAA Aurora API error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.processAuroraData(data);
    });
  }

  // NASA Heliophysics Fleet - Satellite Positions
  async getSatellitePositions() {
    return this.getCachedData('satellitePositions', async () => {
      // Simulated satellite positions for educational purposes
      return this.generateSatellitePositions();
    });
  }

  // CSA (Canadian Space Agency) - Aurora Visibility
  async getAuroraVisibility() {
    return this.getCachedData('auroraVisibility', async () => {
      // Simulated aurora visibility data
      return this.generateAuroraVisibility();
    });
  }

  // EMBRACE - Space Weather Monitoring
  async getSpaceWeatherMonitoring() {
    return this.getCachedData('spaceWeatherMonitoring', async () => {
      // Simulated space weather monitoring data
      return this.generateSpaceWeatherData();
    });
  }

  // Process solar flares data
  processSolarFlares(flares) {
    return flares.map(flare => ({
      id: flare.flrID,
      beginTime: new Date(flare.beginTime),
      peakTime: new Date(flare.peakTime),
      endTime: new Date(flare.endTime),
      classType: flare.classType,
      sourceLocation: flare.sourceLocation,
      activeRegionNum: flare.activeRegionNum,
      intensity: this.calculateFlareIntensity(flare.classType),
      duration: this.calculateDuration(flare.beginTime, flare.endTime)
    }));
  }

  // Process geomagnetic data
  processGeomagneticData(data) {
    return data.map(point => ({
      timestamp: new Date(point.time_tag),
      kp: parseFloat(point.kp),
      ap: parseFloat(point.ap),
      level: this.getGeomagneticLevel(parseFloat(point.kp))
    }));
  }

  // Process aurora data
  processAuroraData(data) {
    return {
      timestamp: new Date(data.timestamp),
      intensity: data.intensity || 0,
      visibility: data.visibility || 'low',
      colors: data.colors || ['green'],
      regions: data.regions || []
    };
  }

  // Calculate flare intensity (0-100)
  calculateFlareIntensity(classType) {
    const intensityMap = {
      'A': 10,
      'B': 20,
      'C': 40,
      'M': 70,
      'X': 100
    };
    
    const baseIntensity = intensityMap[classType[0]] || 0;
    const multiplier = parseFloat(classType.substring(1)) || 1;
    
    return Math.min(100, baseIntensity + (multiplier * 5));
  }

  // Calculate duration in minutes
  calculateDuration(beginTime, endTime) {
    const begin = new Date(beginTime);
    const end = new Date(endTime);
    return Math.round((end - begin) / (1000 * 60));
  }

  // Get geomagnetic level description
  getGeomagneticLevel(kp) {
    if (kp < 3) return 'quiet';
    if (kp < 5) return 'unsettled';
    if (kp < 6) return 'active';
    if (kp < 7) return 'minor storm';
    if (kp < 8) return 'moderate storm';
    if (kp < 9) return 'strong storm';
    return 'severe storm';
  }

  // Generate satellite positions (simulated)
  generateSatellitePositions() {
    const satellites = [
      { name: 'SOHO', position: { x: 0.99, y: 0.01 }, type: 'Solar Observer' },
      { name: 'STEREO-A', position: { x: 0.8, y: 0.3 }, type: 'Solar Terrestrial Relations' },
      { name: 'STEREO-B', position: { x: 0.2, y: 0.7 }, type: 'Solar Terrestrial Relations' },
      { name: 'ACE', position: { x: 0.99, y: 0.99 }, type: 'Advanced Composition Explorer' },
      { name: 'DSCOVR', position: { x: 0.99, y: 0.5 }, type: 'Deep Space Climate Observatory' }
    ];
    
    return satellites.map(sat => ({
      ...sat,
      status: 'active',
      lastUpdate: new Date(),
      dataQuality: 'good'
    }));
  }

  // Generate aurora visibility (simulated)
  generateAuroraVisibility() {
    const regions = [
      { name: 'Alaska', visibility: Math.random() * 100, latitude: 64.2, longitude: -149.9 },
      { name: 'Canada', visibility: Math.random() * 100, latitude: 56.1, longitude: -106.3 },
      { name: 'Scandinavia', visibility: Math.random() * 100, latitude: 60.5, longitude: 8.5 },
      { name: 'Russia', visibility: Math.random() * 100, latitude: 61.5, longitude: 105.3 },
      { name: 'Antarctica', visibility: Math.random() * 100, latitude: -82.9, longitude: 135.0 }
    ];
    
    return {
      timestamp: new Date(),
      regions: regions,
      globalIntensity: regions.reduce((sum, region) => sum + region.visibility, 0) / regions.length,
      bestViewing: regions.reduce((best, region) => 
        region.visibility > best.visibility ? region : best
      )
    };
  }

  // Generate space weather data (simulated)
  generateSpaceWeatherData() {
    return {
      timestamp: new Date(),
      solarWindSpeed: 400 + Math.random() * 200, // km/s
      solarWindDensity: 5 + Math.random() * 10, // particles/cm³
      magneticFieldStrength: 5 + Math.random() * 10, // nT
      sunspotNumber: Math.floor(Math.random() * 200),
      solarFlux: 70 + Math.random() * 30, // sfu
      protonFlux: Math.random() * 1000, // particles/cm²/s
      electronFlux: Math.random() * 10000 // particles/cm²/s
    };
  }

  // Get date string for API calls
  getDateString(daysOffset) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
  }

  // Get comprehensive space weather data
  async getComprehensiveData() {
    try {
      const [
        solarFlares,
        geomagneticIndex,
        auroraForecast,
        satellitePositions,
        auroraVisibility,
        spaceWeatherMonitoring
      ] = await Promise.allSettled([
        this.getSolarFlares(),
        this.getGeomagneticIndex(),
        this.getAuroraForecast(),
        this.getSatellitePositions(),
        this.getAuroraVisibility(),
        this.getSpaceWeatherMonitoring()
      ]);

      return {
        solarFlares: solarFlares.status === 'fulfilled' ? solarFlares.value : [],
        geomagneticIndex: geomagneticIndex.status === 'fulfilled' ? geomagneticIndex.value : [],
        auroraForecast: auroraForecast.status === 'fulfilled' ? auroraForecast.value : null,
        satellitePositions: satellitePositions.status === 'fulfilled' ? satellitePositions.value : [],
        auroraVisibility: auroraVisibility.status === 'fulfilled' ? auroraVisibility.value : null,
        spaceWeatherMonitoring: spaceWeatherMonitoring.status === 'fulfilled' ? spaceWeatherMonitoring.value : null,
        lastUpdated: new Date(),
        dataQuality: this.assessDataQuality(solarFlares, geomagneticIndex, auroraForecast)
      };
    } catch (error) {
      console.error('Error fetching comprehensive space weather data:', error);
      return this.getFallbackData();
    }
  }

  // Assess data quality
  assessDataQuality(solarFlares, geomagneticIndex, auroraForecast) {
    let quality = 'good';
    let issues = [];

    if (solarFlares.status === 'rejected') {
      quality = 'degraded';
      issues.push('Solar flare data unavailable');
    }

    if (geomagneticIndex.status === 'rejected') {
      quality = 'degraded';
      issues.push('Geomagnetic data unavailable');
    }

    if (auroraForecast.status === 'rejected') {
      quality = 'degraded';
      issues.push('Aurora forecast unavailable');
    }

    return { quality, issues };
  }

  // Fallback data when APIs fail
  getFallbackData() {
    return {
      solarFlares: [{
        id: 'demo-flare',
        beginTime: new Date(),
        classType: 'M2.5',
        intensity: 60,
        duration: 45
      }],
      geomagneticIndex: [{
        timestamp: new Date(),
        kp: 3.2,
        level: 'unsettled'
      }],
      auroraForecast: {
        timestamp: new Date(),
        intensity: 50,
        visibility: 'moderate'
      },
      satellitePositions: this.generateSatellitePositions(),
      auroraVisibility: this.generateAuroraVisibility(),
      spaceWeatherMonitoring: this.generateSpaceWeatherData(),
      lastUpdated: new Date(),
      dataQuality: { quality: 'demo', issues: ['Using demo data'] }
    };
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Get cache status
  getCacheStatus() {
    const now = Date.now();
    const status = {};
    
    for (const [key, value] of this.cache.entries()) {
      status[key] = {
        age: now - value.timestamp,
        isExpired: (now - value.timestamp) > this.cacheTimeout
      };
    }
    
    return status;
  }
}

// Export singleton instance
export const spaceWeatherService = new SpaceWeatherService();
