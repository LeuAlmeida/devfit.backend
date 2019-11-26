import HelpOrder from '../models/HelpOrder';

class AnswerOrderController {
  async store(req, res) {
    const order = await HelpOrder.findOne({
      where: { id: req.params.id },
    });

    if (!order) {
      return res
        .status(400)
        .json({ error: 'This help order does not exists.' });
    }

    const { answer } = req.body;

    const answerOrder = await order.update({
      answer,
      answer_at: new Date(),
    });

    return res.json({
      answerOrder,
    });
  }
}

export default new AnswerOrderController();
