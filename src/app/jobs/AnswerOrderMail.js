import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { resolve } from 'path';
import Mail from '../../lib/Mail';

const folder = resolve(__dirname, '..', 'views', 'emails', 'images');

class AnswerOrderMail {
  get key() {
    return 'AnswerOrderMail';
  }

  async handle({ data }) {
    const { student, order, answer } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'answerOrder',
      context: {
        studentName: student.name.split(' ')[0],
        yourQuestion: order.question,
        ourAnswer: answer,
        orderId: order.id,
        answerDate: format(
          parseISO(order.answer_at),
          "dd' de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
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

export default new AnswerOrderMail();
