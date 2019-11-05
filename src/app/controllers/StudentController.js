import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const { email, id } = req.body;
    const student = await Student.findByPk(id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });
      if (studentExists) {
        return res.status(401).json({ error: 'Email already exists' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);
    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height
    });
  }

}

export default new StudentController();
