/**
 * Implementation B: Express.js + Handlebars (HBS)
 * College Placement Management System
 * 
 * Requirements Met:
 * - Express.js web application framework
 * - Dynamic route parameters (:id, :company)
 * - Handlebars (HBS) template engine with custom helpers
 * - Dynamic data passing to Handlebars templates
 * - Handled conditional formatting & loop iterations ({{#each}}, {{#ifEquals}})
 * - Static middleware for serving stylesheet assets
 */

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { companies, jobs, students } = require('./data');

const app = express();
const PORT = 4000;

// Configure Handlebars View Engine
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    // Custom Helper 1: Equality Condition Helper
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    // Custom Helper 2: Dynamic Current Year Helper
    currentYear: function() {
      return new Date().getFullYear();
    }
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Assets (CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route Handlers

// 1. GET / - Placement Home Dashboard
app.get('/', (req, res) => {
  const totalCompanies = companies.length;
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const placementRate = ((placedStudents / totalStudents) * 100).toFixed(1);

  res.render('home', {
    title: 'Home Dashboard',
    totalCompanies,
    totalStudents,
    placedStudents,
    placementRate
  });
});

// 2. GET /companies - Display participating companies
app.get('/companies', (req, res) => {
  res.render('companies', {
    title: 'Participating Companies',
    companies
  });
});

// 3. GET /company/:id - Display company details & job openings (Dynamic Route Parameter)
app.get('/company/:id', (req, res) => {
  const companyId = req.params.id;
  const company = companies.find(c => 
    c.id.toLowerCase() === companyId.toLowerCase() || 
    c.name.toLowerCase() === companyId.toLowerCase()
  );

  if (!company) {
    return res.status(404).render('404', {
      title: 'Company Not Found',
      message: `Company with ID or name '${companyId}' was not found in our database.`
    });
  }

  const companyJobs = jobs.filter(j => 
    j.companyId === company.id || 
    j.companyName.toLowerCase() === company.name.toLowerCase()
  );

  res.render('company-detail', {
    title: `${company.name} Details`,
    company,
    companyJobs
  });
});

// 4. GET /students - Display registered students
app.get('/students', (req, res) => {
  res.render('students', {
    title: 'Registered Students',
    students
  });
});

// 5. GET /student/:id - Display student placement details (Dynamic Route Parameter)
app.get('/student/:id', (req, res) => {
  const studentId = req.params.id;
  const student = students.find(s => 
    s.id.toLowerCase() === studentId.toLowerCase() || 
    s.name.toLowerCase() === studentId.toLowerCase()
  );

  if (!student) {
    return res.status(404).render('404', {
      title: 'Student Not Found',
      message: `Student with ID '${studentId}' was not found in placement records.`
    });
  }

  res.render('student-detail', {
    title: `Student ${student.name}`,
    student
  });
});

// 6. GET /jobs/:company - Display jobs offered by a particular company (Dynamic Route Parameter)
app.get('/jobs/:company', (req, res) => {
  const companyParam = req.params.company;

  const company = companies.find(c => 
    c.id.toLowerCase() === companyParam.toLowerCase() || 
    c.name.toLowerCase() === companyParam.toLowerCase()
  );

  const filterName = company ? company.name : companyParam;
  const filteredJobs = jobs.filter(j => 
    (company && j.companyId === company.id) ||
    j.companyName.toLowerCase() === companyParam.toLowerCase() ||
    j.companyId.toLowerCase() === companyParam.toLowerCase()
  );

  res.render('jobs', {
    title: `Jobs Offered by ${filterName}`,
    company,
    filterName,
    filteredJobs
  });
});

// 404 Middleware Handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 Page Not Found',
    message: `The requested path '${req.originalUrl}' does not exist on this Express server.`
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Implementation B] Express.js & Handlebars Server running on http://localhost:${PORT}`);
});
