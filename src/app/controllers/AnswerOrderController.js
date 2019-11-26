import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerOrderMail from '../jobs/AnswerOrderMail';
import Queue from '../../lib/Queue';

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

    const student = await Student.findOne({
      where: {
        id: order.student_id,
      },
    });

    await Queue.add(AnswerOrderMail.key, {
      student,
      order,
      answer,
    });

    await order.update({
      answer,
      answer_at: new Date(),
    });

    return res.json({
      answer,
    });
  }
}

export default new AnswerOrderController();
