const User = require('../models/User');

// Search shops by name
exports.searchShops = async (req, res) => {
  try {
    const { search } = req.query;

    // Get current user's ID from the middleware (assuming JWT auth is applied)
    const currentUserId = req.user._id;

    // Fetch shops that match the search query (excluding the current user)
    const matchedShops = await User.find({
      _id: { $ne: currentUserId }, // Exclude current user
      shopName: { $regex: search, $options: 'i' }, // Case-insensitive partial match
    }).select('ownerName shopName shopLocation shopCategory _id');

    if (!matchedShops.length) {
      return res.status(200).json([]);
    }

    // Get current user's data to determine connection status
    const currentUser = await User.findById(currentUserId).select('connected pending');

    const shopsWithStatus = matchedShops.map((shop) => {
      let connectionStatus = 'none';
      const shopId = shop._id.toString();

      if (currentUser.connected.map(id => id.toString()).includes(shopId)) {
        connectionStatus = 'connected';
      } else if (currentUser.pending.map(id => id.toString()).includes(shopId)) {
        connectionStatus = 'pending';
      }

      return {
        _id: shop._id,
        name: shop.shopName,
        category: shop.shopCategory,
        location: shop.shopLocation,
        owner: shop.ownerName,
        connectionStatus,
      };
    });

    res.status(200).json(shopsWithStatus);
  } catch (err) {
    console.error("Error searching for shops:", err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

exports.sendConnectionRequest = async (req, res) => {
    try {
      const { shopId } = req.body;
      const userId = req.user._id;
  
      if (userId.toString() === shopId) {
        return res.status(400).json({ message: "Cannot send request to yourself" });
      }
  
      const sender = await User.findById(userId);
      const receiver = await User.findById(shopId);
  
      if (!receiver) {
        return res.status(404).json({ message: "Shop not found" });
      }
  
      if (sender.pending.includes(shopId)) {
        return res.status(400).json({ message: "Request already sent" });
      }
  
      // Add to sender's pending and receiver's receivedRequests
      sender.pending.push(shopId);
      receiver.receivedRequests.push(userId);
  
      await sender.save();
      await receiver.save();
  
      res.status(200).json({ message: "Connection request sent" });
    } catch (err) {
      console.error("Error sending request:", err.message);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };

  exports.withdrawConnectionRequest = async (req, res) => {
    try {
      const userId = req.user._id;
      const { shopId } = req.params;
  
      const sender = await User.findById(userId);
      const receiver = await User.findById(shopId);
  
      if (!receiver) {
        return res.status(404).json({ message: "Shop not found" });
      }
  
      sender.pending = sender.pending.filter(id => id.toString() !== shopId);
      receiver.receivedRequests = receiver.receivedRequests.filter(id => id.toString() !== userId.toString());
  
      await sender.save();
      await receiver.save();
  
      res.status(200).json({ message: "Request withdrawn successfully" });
    } catch (err) {
      console.error("Error withdrawing request:", err.message);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };