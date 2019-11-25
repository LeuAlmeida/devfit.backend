import { addMonths, parseISO } from 'date-fns';
import * as Yup from 'yup';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import ConfirmationMail from '../jobs/ConfirmationMail';
import Queue from '../../lib/Queue';

class EnrollmentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * Search for an exist student
     */

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'Student does not exists in our database.' });
    }

    /**
     * Search for an exist plan
     */

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists.' });
    }

    /**
     * Search for relation of plan and id
     */

    const studentEnrolled = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (studentEnrolled) {
      return res.status(401).json({ error: 'Student already is enrolled. ' });
    }

    const { price, duration } = plan;

    const end_date = addMonths(parseISO(start_date), duration);

    const totalPrice = price * duration;

    await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: totalPrice,
    });

    await Queue.add(ConfirmationMail.key, {
      student,
      plan,
      start_date,
      end_date,
      totalPrice,
    });

    return res.json({
      student,
      plan,
      start_date,
      end_date,
      totalPrice,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const { student_id, plan_id } = req.body;

    return res.json({
      id,
      student_id,
      plan_id,
    });
  }
}

export default new EnrollmentsController();
