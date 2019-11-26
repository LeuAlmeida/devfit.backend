import { isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const student_id = req.params.id;

    const today = new Date();
    today.setDate(today.getDate() - 7);

    const checkins = await Checkin.findAll({ where: { student_id } });

    let count = 0;
    checkins.forEach(checkin => {
      if (isBefore(today, checkin.createdAt)) {
        count++;
      }
    });

    if (count >= 5) {
      res.status(400).json({
        error: 'This student has exceeded the limit of 5 checkins per week.',
      });
    }

    const compareDate = format(new Date(), "dd' de 'MMMM' de 'yyyy", {
      locale: pt,
    });

    const checkinToday = checkins.find(
      check =>
        format(check.createdAt, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }) === compareDate
    );

    if (checkinToday) {
      return res.status(400).json({
        error: 'This student has exceeded the limit of 5 checkins per day.',
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }

  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    if (!checkins) {
      return res.status(401).json({ error: 'User .' });
    }

    return res.json(checkins);
  }
}

export default new CheckinController();
