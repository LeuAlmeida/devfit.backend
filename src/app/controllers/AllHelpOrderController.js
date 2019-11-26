import HelpOrder from '../models/HelpOrder';

class AllHelpOrderController {
  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      attributes: ['student_id', 'question', 'createdAt', 'answer'],
    });

    return res.json(orders);
  }
}

export default new AllHelpOrderController();
