const knex = require("../../dbConfig");

module.exports = {
  findNearestPoint: async (req, res) => {
    const { latitude, longitude } = req.body;

    const nearestPoint = await knex
      .select("description", "latitude", "longitude")
      .from("pontos") 
      .orderByRaw(
        `6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))`,
        [latitude, longitude, latitude]
      )
      .limit(1);

    if (nearestPoint.length > 0) {
      res.status(200).json(nearestPoint[0]);
    } else {
      res.status(404).json({ message: "Nenhum ponto encontrado." });
    }
  },
};
