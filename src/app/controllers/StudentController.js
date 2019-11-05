import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const { id, name, email, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
     })
  }
}

export default new StudentController();
