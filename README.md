<h1 align="center">
  <img alt="Devfit" title="Devfit" src="readme/logo-black.png" width="200px" />
</h1>

<h1 align="center">
  Devfit | Backend :key:
</h1>

<h3>ToDo:</h3>

Step 1:

[ ] Plan Management **(Check after finish everything)**
Allow the user to register student enrollment plans, the plan must have the following fields:

* Title (Plan name)
* Duration (Plan duration in months)
* Price (Plan monthly price)
* Created_at
* Updated_at

[ ] Start: 1 Month plan (R$129)
[ ] Gold: 3 Months plan (R$109)
[ ] Diamond: 6 Months plan (R$89)

[ ] CRUD to manage plans

Step 2:

[ ] Enrollment Management **(Check after finish everything)**
Although the student is registered on the platform, this does not mean that the student has an active registration and can access the gym.

* Student_id (Student reference)
* Plan_id (Plan reference)
* Start_date (Enrollment start date)
* End_date (Enrollment end date)
* Price (Total price calculated in the enrollment start date)
* Created_at
* Updated_at

The **registration start date** must be chosen by the user.

The **end date** and **registration** price should be calculated based on the selected plan, for example: <br/>
Data de início informada: `23/05/2019` Plano selecionado: `Gold (3 meses)` Data de término calculada: `23/08/2019 (3 meses depois do início)` Preço calculado: `R$327`

[ ] Welcome e-mail when a student enrolls

When a student enrolls, they receive an email with details of their enrollment at the academy such as plan, end date, value, and a welcome message.

[ ] CRUD to manage enrollments
[ ] Increment auth middleware to this step

<hr/>

<p align="center">
:nail_care: Logo design by <a href="https://www.behance.net/lucasrvr" target="_blank">Lucas Ribeiro</a>
</p>

<hr/>

<h4 align="center">
<a href="http://linkedin.com/in/leonardoalmeida99">Connect me in LinkedIn</a> | <a href="http://behance.net/almeida99">See my Behance</a> | <a href="https://leunardo.dev">Click here to go to my CV</a>
</h4>
