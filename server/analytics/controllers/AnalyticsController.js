const AnalyticsService = require('../services/AnalyticsService');
const axios = require('axios');


const AnalyticsController = {
  getAllRecommended: async (req, res) => {
    try {
      const { userEmail } = req.body;
      const getOrderAnalytics = await axios.post(
        'http:/host.docker.internal/orders/getOrders',
        { userEmail }
      );
      const orderItems = getOrderAnalytics.data
      const compiledItems = await AnalyticsService.compileOrderItems(orderItems);
      const data = await axios.post(
        'http:/host.docker.internal/products/getCategory',
        { compiledItems }
      );
      const categories=data.data.categories;
      let maxCategory = null;
      let maxValue = -1;

      for (const category in categories) {
        if (categories[category] > maxValue) {
          maxValue = categories[category];
          maxCategory = category;
        }
      }
      const response = await axios.post('http:/host.docker.internal/products/fetch', {
        category: maxCategory,
      });
      const items = response.data.items;

      const recommended = items.slice(-2);



      res.status(200).json({recommended});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = AnalyticsController;
