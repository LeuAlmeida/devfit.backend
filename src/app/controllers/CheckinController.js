import { isBefore } from 'date-fns';

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
      res
        .status(400)
        .json({ error: 'No more than 5 checkins for the last 7 days' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }

  async index(req, res) {
    const checkins = await Checkin.findAll({
      student: req.params.id,
    });
    return res.json(checkins);
  }
}

export default new CheckinController();
