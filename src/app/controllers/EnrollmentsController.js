import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

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

    const startParse = parseISO(start_date);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua matrícula na DevFit',
      template: 'enrollmentConfirmation',
      context: {
        studentName: student.name,
        planTitle: plan.title,
        planDuration: plan.duration,
        planPrice: plan.price,
        planStart: format(startParse, "dd' de 'MMMM' de 'yyyy", { locale: pt }),
        planEnd: format(end_date, "dd' de 'MMMM' de 'yyyy", { locale: pt }),
        monthlyDuration: plan.duration > 1 ? 'meses' : 'mês',
      },
    });

    return res.json({
      student,
      plan_id,
      start_date,
      end_date,
      totalPrice,
    });
  }
}

export default new EnrollmentsController();
