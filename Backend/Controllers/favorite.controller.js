import Favorite from "../Models/favorite.model.js";

export const toggleFavorite =
  async (req, res) => {
    try {
        console.log("aagya")
      const userId =
        req.user._id;

      const {
        productId,
      } = req.params;

      const existing =
        await Favorite.findOne({
          user: userId,
          product: productId,
        });

      if (existing) {
        await Favorite.findByIdAndDelete(
          existing._id
        );

        return res.status(200).json({
          success: true,
          isFavorite: false,
          message:
            "Removed from favorites",
        });
      }

      await Favorite.create({
        user: userId,
        product: productId,
      });

      return res.status(201).json({
        success: true,
        isFavorite: true,
        message:
          "Added to favorites",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          "Server error",
      });
    }
  };

export const checkFavorite =
  async (req, res) => {
    try {
      const userId =
        req.user._id;

      const {
        productId,
      } = req.params;

      const favorite =
        await Favorite.findOne({
          user: userId,
          product: productId,
        });

      return res.status(200).json({
        success: true,
        isFavorite:
          !!favorite,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
      });
    }
  };

export const getFavorites =
  async (req, res) => {
    try {
      const favorites =
        await Favorite.find({
          user: req.user._id,
        })
          .populate(
            "product"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count:
          favorites.length,
        favorites,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
      });
    }
  };