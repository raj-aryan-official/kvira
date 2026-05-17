const analyticsService = {
  trackEvent: (eventName: string, payload?: any) => {
    console.log('Analytics event', eventName, payload);
  },
  trackAction: (actionType: string, payload?: any) => {
    console.log('Redux action tracked', actionType, payload);
  },
};

export default analyticsService;
