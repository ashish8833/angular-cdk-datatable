router.post("/getgnere", async (req, res) => {
  try {
    let totalGenres = await models.mst_genre.count({
      order: [[`${req.body.orderBy.key}`, `${req.body.orderBy.value}`]],
      where: { name: { $like: `%${req.body.search}%` } }
    });
    let genres = await models.mst_genre.findAll({
      where: { name: { $like: `%${req.body.search}%` } },
      order: [[`${req.body.orderBy.key}`, `${req.body.orderBy.value}`]],
      limit: req.body.pageSize,
      offset: req.body.currentPage * req.body.pageSize - req.body.pageSize
    });
    res.status(200).json({
      data: genres,
      totalRecords: totalGenres,
      currentPage: req.body.currentPage,
      pageSize: req.body.pageSize
    });
  } catch (eror) {}
});
