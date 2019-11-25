import { eachDayOfInterval, addDays, startOfWeek } from 'date-fns';

import Checkin from '../models/Checkin';
import Enrollment from '../models/Enrollment';

import formatDate from '../utils/formatDate';

class CheckinController {
  async store(req, res) {
    /**
     * Verify is the enrollment exists
     */
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id: req.params.id },
    });

    if (!enrollmentExists) {
      return res.status(400).json({ error: 'Student is not enrolled.' });
    }

    const student = await Checkin.findAll({
      where: { student_id: req.params.id },
    });

    const dayOfWeek = eachDayOfInterval({
      start: startOfWeek(new Date().getTime(), { weekStartsOn: 1 }),
      end: startOfWeek(addDays(new Date().getTime(), 6)),
    });

    const limitCheckin = dayOfWeek
      .map(day => {
        const listDay = formatDate(day);

        const checkDate = student.find(
          s => formatDate(s.createdAt) === listDay
        );

        return checkDate;
      })
      .filter(d => d != null);

    if (limitCheckin.length === 5) {
      return res
        .status(400)
        .json({ error: 'The student has exceeded the limit of 5 checkins.' });
    }

    const compareDate = formatDate(new Date());

    const checkinDay = student.find(
      c => formatDate(c.createdAt) === compareDate
    );

    if (checkinDay) {
      return res.status(400).json({ error: 'Student already check in' });
    }

    const createCheckin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(createCheckin);
  }
}

export default new CheckinController();
