import Plans from '../models/Plans';

class PlansController {
  async store(req, res) {
    const { title, duration, price } = Plans.create(req.body);

    return res.json(title, duration, price);
  }
}

export default new PlansController();
