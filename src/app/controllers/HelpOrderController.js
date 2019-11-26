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

    const createdAt = new Date();

    await HelpOrder.create({
      student_id,
      question,
    });

    return res.json({
      student_id,
      question,
      createdAt,
    });
  }

  async index(req, res) {
    return res.json();
  }
}

export default new HelpOrderController();
