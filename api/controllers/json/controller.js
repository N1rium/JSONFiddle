const service = require('./service');

module.exports = {
  async get(req, res) {
    const id = req.body.id || req.query.id;
    await service.get(id).then(
      json => {
        if (!json) {
          return res.status(400).json({ error: 'invalid_id' });
        }
        return res.status(200).json(json);
      },
      e => res.status(500).json(e)
    );
  },

  async update(req, res) {
    const { data } = req.body;
    const { id } = req.params;
    if (!data || data.length == 0 || !id) {
      return res.status(400).json({ error: 'missing_data' });
    }

    await service.update(id, data).then(json => res.status(200).json(json), e => res.status(500).json(e));
  },

  async create(req, res) {
    const { data } = req.body;
    if (!data || data.length == 0) {
      return res.status(400).json({ error: 'missing_data' });
    }

    await service.create(data).then(json => res.status(200).json(json), e => res.status(500).json(e));
  },
};
