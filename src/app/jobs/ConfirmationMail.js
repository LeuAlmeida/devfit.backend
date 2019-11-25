import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Sua matrícula na DevFit',
      template: 'enrollmentConfirmation',
      context: {
        studentName: enrollment.student.name,
        planTitle: enrollment.plan.title,
        planDuration: enrollment.plan.duration,
        planPrice: enrollment.plan.price,
        planStart: format(enrollment.startParse, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        planEnd: format(enrollment.end_date, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        monthlyDuration: enrollment.plan.duration > 1 ? 'meses' : 'mês',
      },
    });
  }
}

export default new ConfirmationMail();
