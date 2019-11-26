// import { parseISO, format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

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
        studentName: student.name,
        yourQuestion: order.question,
        ourAnswer: answer,
      },
    });
  }
}

export default new AnswerOrderMail();
