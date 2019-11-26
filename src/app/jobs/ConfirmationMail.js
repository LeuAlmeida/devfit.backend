import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { resolve } from 'path';
import Mail from '../../lib/Mail';

const folder = resolve(__dirname, '..', 'views', 'emails', 'images');

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, start_date } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua matrícula na DevFit',
      template: 'enrollmentConfirmation',
      context: {
        studentName: student.name.split(' ')[0],
        planTitle: plan.title,
        planDuration: plan.duration,
        planPrice: plan.price,
        today: format(new Date(), "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        planStart: format(parseISO(start_date), "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        planEnd: format(parseISO(end_date), "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        monthlyDuration: plan.duration > 1 ? 'meses' : 'mês',
      },
      attachments: [
        {
          filename: 'logo.png',
          path: `${folder}/logo.png`,
          cid: 'logo',
        },
        {
          filename: 'element1.png',
          path: `${folder}/element1.png`,
          cid: 'element1',
        },
        {
          filename: 'footer_image.png',
          path: `${folder}/footer_image.png`,
          cid: 'footer_image',
        },
      ],
    });
  }
}

export default new ConfirmationMail();
