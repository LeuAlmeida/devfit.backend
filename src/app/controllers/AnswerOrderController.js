import { Op } from 'sequelize';

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

    const answered = await order.update({
      answer,
      answer_at: new Date(),
    });

    return res.json(answered);
  }

  async index(req, res) {
    const order = await HelpOrder.findOne({
      where: {
        id: req.params.id,
        answer: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
    });

    if (!order) {
      return res.status(400).json({ error: 'No order found with this id.' });
    }

    return res.json(order);
  }
}

export default new AnswerOrderController();
