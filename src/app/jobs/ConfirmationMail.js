import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

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
        planStart: format(startParse, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        planEnd: format(endParse, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        monthlyDuration: plan.duration > 1 ? 'meses' : 'mês',
      },
    });
  }
}

export default new ConfirmationMail();
