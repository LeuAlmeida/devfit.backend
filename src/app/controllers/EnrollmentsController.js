import { addMonths, parseISO } from 'date-fns';

import Enrollments from '../models/Enrollments';
import Plans from '../models/Plans';
import Student from '../models/Student';

class EnrollmentsController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    // Search for an exist student
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'Student does not exists in our database.' });
    }

    // Search for an exist plan
    const plan = await Plans.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists.' });
    }

    const { price, duration } = plan;

    const end_date = addMonths(parseISO(start_date), duration);

    await Enrollments.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      student,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }
}

export default new EnrollmentsController();
