import { parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

import formatDate from '../utils/formatDate';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, start_date } = data;

    const startParse = parseISO(start_date);
    const endParse = parseISO(end_date);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua matrícula na DevFit',
      template: 'enrollmentConfirmation',
      context: {
        studentName: student.name,
        planTitle: plan.title,
        planDuration: plan.duration,
        planPrice: plan.price,
        planStart: formatDate(startParse),
        planEnd: formatDate(endParse),
        monthlyDuration: plan.duration > 1 ? 'meses' : 'mês',
      },
    });
  }
}

export default new ConfirmationMail();
