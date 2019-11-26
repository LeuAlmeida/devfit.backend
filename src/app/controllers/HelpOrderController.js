import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string()
        .required()
        .max(360),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails. ' });
    }

    const student = await Student.findOne({
      where: { id: req.params.id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const student_id = student.id;

    const { question } = req.body;

    const order = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(order);
  }

  async index(req, res) {
    const order = await HelpOrder.findAll({
      where: { student_id: req.params.id },
      attributes: [
        'student_id',
        'question',
        'createdAt',
        'answer',
        'answer_at',
      ],
    });

    if (!order) {
      return res
        .status(400)
        .json({ error: 'No help orders found for this student' });
    }

    return res.json(order);
  }
}

export default new HelpOrderController();
