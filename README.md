<h1 align="center">
  <img alt="Devfit" title="Devfit" src="readme/logo-black.png" width="200px" />
</h1>

<h1 align="center">
  Devfit | Backend :key:
</h1>

<h3>ToDo:</h3>

<h4>Manager functions</h4>

Step 1:

[X] Plan Management **(Check after finish everything)**

Allow the user to register student enrollment plans, the plan must have the following fields:

Table `plans`

* Title (Plan name)
* Duration (Plan duration in months)
* Price (Plan monthly price)
* Created_at
* Updated_at

[X] Start: 1 Month plan (R$129)

[X] Gold: 3 Months plan (R$109)

[X] Diamond: 6 Months plan (R$89)

[X] CRUD to manage plans

Step 2:

[X] Enrollment Management **(Check after finish everything)**
Although the student is registered on the platform, this does not mean that the student has an active registration and can access the gym.

Table `enrollments`

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

[X] Welcome e-mail when a student enrolls

When a student enrolls, they receive an email with details of their enrollment at the academy such as plan, end date, value, and a welcome message.

[X] CRUD to manage enrollments

[X] Increment auth middleware to this step

<h4>Student functions</h4>

Step 1:

[ ] Checkins **(Check after finish everything)**

Table `checkins`

When the student arrives at the gym, he / she performs a check-in only informing his / her registration ID (database ID); <br/>
This check-in serves to monitor how many times the user has attended the gym during the week.

* Student_id (Student reference)
* Created_at
* Updated_at

The student can be only 5 checkins between a 7 days periods

[X] POST Route *(Example: https://gympoint.com/students/3/checkins)*

Create a route to list all checkins performed by a user based on their registration ID;

[ ] GET Route *(Example: https://gympoint.com/students/3/checkins)*

Step 2:

[ ] Requests for Assistance **(Check after finish everything)**

Table `help_orders`

* Student_id (Student reference only)
* Question (Student request in text)
* Answer (Gym answer in text)
* Answer_at (Gym answer date)
* Created_at
* Updated_at

[ ] Create a route to list all requests without answers

[ ] Create a route for the student to apply for help just by entering their registration ID (database ID); (Example: `POST https://gympoint.com/students/3/help-orders`)

[ ] Create a rout to list all requests from a single user (Example: `GET https://gympoint.com/students/3/help-orders`)

[ ] Create a rout to the gym answer a request (Example: `POST https://gympoint.com/help-orders/1/answer`)

[ ] Create a mail delivery to the student after a request be answered. This mail need to have the question and the answer.

<hr/>

<p align="center">
:nail_care: Logo design by <a href="https://www.behance.net/lucasrvr" target="_blank">Lucas Ribeiro</a>
</p>

<hr/>

<h4 align="center">
<a href="http://linkedin.com/in/leonardoalmeida99">Connect me in LinkedIn</a> | <a href="http://behance.net/almeida99">See my Behance</a> | <a href="https://leunardo.dev">Click here to go to my CV</a>
</h4>
