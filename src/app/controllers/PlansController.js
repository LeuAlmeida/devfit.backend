import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const planDurationExists = await Plan.findOne({
      where: { duration: req.body.duration },
    });

    if (planDurationExists) {
      return res
        .status(400)
        .json({ error: 'A plan with this duration already exists.' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists.' });
    }

    await plan.destroy();

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }
}

export default new PlansController();
