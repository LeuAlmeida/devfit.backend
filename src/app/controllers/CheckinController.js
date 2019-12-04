import { isBefore, startOfWeek, isToday } from 'date-fns';

import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const student_id = req.params.id;

    const today = new Date();
    const thisWeek = startOfWeek(today);

    const checkins = await Checkin.findAll({ where: { student_id } });

    let countCheckins = 0;
    let checkinToday = false;
    checkins.forEach(checkin => {
      if (isBefore(thisWeek, checkin.createdAt)) {
        countCheckins++;
      }
      if (isToday(checkin.createdAt)) {
        checkinToday = true;
      }
    });

    if (countCheckins >= 5) {
      res.status(400).json({
        error: 'This student has exceeded the limit of 5 checkins per week.',
      });
    }

    if (checkinToday) {
      return res.status(400).json({
        error: 'This student has exceeded the limit of 1 checkins per day.',
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

    if (checkins <= 0) {
      return res
        .status(400)
        .json({ error: 'No help orders found for this student.' });
    }

    return res.json(checkins);
  }
}

export default new CheckinController();
