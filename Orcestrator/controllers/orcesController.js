const movieTV = require('../models/movieTv')

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const MovieTV = await movieTV.axiosGet();
      // console.log(JSON.parse(MovieTV));
      res.status(200).json({
        message: "Berhasil Tampil Fetch Data",
        data: JSON.parse(MovieTV)
      })
    } catch (reason) {
      res.status(400).json({
        message: reason
      })
    }
  }
}
