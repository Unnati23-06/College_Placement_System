/**
 * Implementation A: Node.js HTTP Module
 * College Placement Management System
 * 
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { companies, jobs, students } = require('./data');

const PORT = 3000;

function renderLayout(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Placement Portal (HTTP Module)</title>
  <link rel="stylesheet" href="/public/style.css">
</head>
<body>
  <nav class="navbar">
    <a href="/" class="brand">
      🎓 Placement Portal <span class="badge-mode">Implementation A: Node.js HTTP</span>
    </a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/companies">Companies</a></li>
      <li><a href="/students">Students</a></li>
    </ul>
  </nav>

  <main class="container">
    ${content}
  </main>`;
}

// 1. GET / - Placement Home
function handleHome(req, res) {
  const totalCompanies = companies.length;
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const placementRate = ((placedStudents / totalStudents) * 100).toFixed(1);

  const content = `
    <div class="page-header">
      <h1>Campus Placement Portal</h1>
      <p>Manage and track participating companies, registered students, and ongoing job openings.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="number">${totalCompanies}</div>
        <div class="label">Participating Companies</div>
      </div>
      <div class="stat-card">
        <div class="number">${totalStudents}</div>
        <div class="label">Registered Students</div>
      </div>
      <div class="stat-card">
        <div class="number">${placedStudents}</div>
        <div class="label">Placed Students</div>
      </div>
      <div class="stat-card">
        <div class="number">${placementRate}%</div>
        <div class="label">Placement Rate</div>
      </div>
    </div>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout('Home Dashboard', content));
}

// 2. GET /companies - List all participating companies
function handleCompanies(req, res) {
  const cardsHtml = companies.map(comp => `
    <div class="card">
      <div>
        <h3 class="card-title">${comp.name}</h3>
        <p class="card-subtitle"><strong>Sector:</strong> ${comp.sector}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Location:</strong> ${comp.location}</p>
        <p style="margin-bottom: 0.75rem;"><strong>Package Offered:</strong> <span style="color: var(--secondary-color); font-weight: bold;">${comp.package}</span></p>
        <div>
          <strong>Eligible Branches:</strong><br>
          ${comp.eligibleBranches.map(b => `<span class="meta-tag">${b}</span>`).join('')}
        </div>
      </div>
      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
        <a href="/company/${comp.id}" class="btn" style="flex: 1;">Company Details</a>
        <a href="/jobs/${comp.id}" class="btn btn-outline" style="flex: 1;">View Jobs</a>
      </div>
    </div>
  `).join('');

  const content = `
    <div class="page-header">
      <h1>Participating Recruiters & Companies</h1>
      <p>List of all corporate partners actively hiring from our campus.</p>
    </div>
    <div class="card-grid">
      ${cardsHtml}
    </div>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout('Participating Companies', content));
}

// 3. GET /company/:id - Display company details & job openings
function handleCompanyDetail(req, res, companyId) {
  const company = companies.find(c => c.id === companyId || c.name.toLowerCase() === companyId.toLowerCase());

  if (!company) {
    return handle404(req, res, `Company with identifier '${companyId}' was not found.`);
  }

  const companyJobs = jobs.filter(j => j.companyId === company.id || j.companyName.toLowerCase() === company.name.toLowerCase());

  const jobsHtml = companyJobs.length > 0
    ? companyJobs.map(j => `
        <div class="card" style="margin-bottom: 1rem;">
          <h3 class="card-title">${j.title}</h3>
          <p class="card-subtitle">${j.role} &bull; <strong>Status:</strong> ${j.status}</p>
          <p><strong>Package:</strong> ${j.salary} | <strong>Location:</strong> ${j.location} | <strong>Type:</strong> ${j.type}</p>
          <p style="margin-top: 0.5rem;">${j.description}</p>
        </div>
      `).join('')
    : '<p>No current active job openings listed for this company.</p>';

  const content = `
    <div class="page-header">
      <h1>${company.name} Details</h1>
      <p>${company.sector} &bull; ${company.location}</p>
    </div>

    <div class="detail-card">
      <h2>Company Overview</h2>
      <div class="detail-row">
        <div class="detail-label">Company ID</div>
        <div class="detail-value"><code>${company.id}</code></div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Sector / Industry</div>
        <div class="detail-value">${company.sector}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Headquarters / Location</div>
        <div class="detail-value">${company.location}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Maximum CTC Offered</div>
        <div class="detail-value"><strong>${company.package}</strong></div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Eligible Branches</div>
        <div class="detail-value">
          ${company.eligibleBranches.map(b => `<span class="meta-tag">${b}</span>`).join('')}
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Description</div>
        <div class="detail-value">${company.description}</div>
      </div>
    </div>

    <h2 style="margin-bottom: 1rem; color: var(--primary-color);">Offered Job Openings (${companyJobs.length})</h2>
    ${jobsHtml}

    <div style="margin-top: 1.5rem;">
      <a href="/companies" class="btn btn-outline">&larr; Back to Companies</a>
    </div>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout(`${company.name} Details`, content));
}

// 4. GET /students - Display registered students
function handleStudents(req, res) {
  const tableRows = students.map(s => `
    <tr>
      <td><code>${s.id}</code></td>
      <td><strong>${s.name}</strong></td>
      <td><span class="meta-tag">${s.branch}</span></td>
      <td>${s.gpa}</td>
      <td>
        <span class="badge ${s.status === 'Placed' ? 'badge-placed' : 'badge-unplaced'}">
          ${s.status}
        </span>
      </td>
      <td>${s.companyName ? `<strong>${s.companyName}</strong> (${s.packageOffered})` : '<em>N/A</em>'}</td>
      <td><a href="/student/${s.id}" class="btn btn-outline" style="padding: 0.25rem 0.6rem; font-size: 0.8rem;">View Profile</a></td>
    </tr>
  `).join('');

  const content = `
    <div class="page-header">
      <h1>Registered Students Directory</h1>
      <p>View placement records, branch allocations, and recruitment status of students.</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Branch</th>
          <th>GPA</th>
          <th>Status</th>
          <th>Recruiting Company</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout('Registered Students', content));
}

// 5. GET /student/:id - Display student placement details
function handleStudentDetail(req, res, studentId) {
  const student = students.find(s => s.id === studentId || s.name.toLowerCase() === studentId.toLowerCase());

  if (!student) {
    return handle404(req, res, `Student with ID '${studentId}' was not found in placement records.`);
  }

  const content = `
    <div class="page-header">
      <h1>Student Profile: ${student.name}</h1>
      <p>Detailed placement breakdown and academic metadata.</p>
    </div>

    <div class="detail-card">
      <h2>Academic & Personal Information</h2>
      <div class="detail-row">
        <div class="detail-label">Student ID</div>
        <div class="detail-value"><code>${student.id}</code></div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Full Name</div>
        <div class="detail-value"><strong>${student.name}</strong></div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Branch / Specialization</div>
        <div class="detail-value"><span class="meta-tag">${student.branch}</span></div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Cumulative GPA</div>
        <div class="detail-value">${student.gpa} / 10.0</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">Email Address</div>
        <div class="detail-value"><a href="mailto:${student.email}">${student.email}</a></div>
      </div>
    </div>

    <div class="detail-card">
      <h2>Placement Record Status</h2>
      <div class="detail-row">
        <div class="detail-label">Status</div>
        <div class="detail-value">
          <span class="badge ${student.status === 'Placed' ? 'badge-placed' : 'badge-unplaced'}">
            ${student.status}
          </span>
        </div>
      </div>
      ${student.status === 'Placed' ? `
        <div class="detail-row">
          <div class="detail-label">Placed Company</div>
          <div class="detail-value">
            <a href="/company/${student.companyId}"><strong>${student.companyName}</strong></a>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Designated Role</div>
          <div class="detail-value">${student.role}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Salary Package (CTC)</div>
          <div class="detail-value"><strong style="color: var(--success-text);">${student.packageOffered}</strong></div>
        </div>
      ` : `
        <div class="detail-row">
          <div class="detail-label">Note</div>
          <div class="detail-value">Student is actively interviewing with prospective recruiting partners.</div>
        </div>
      `}
    </div>

    <div style="margin-top: 1.5rem;">
      <a href="/students" class="btn btn-outline">&larr; Back to Students</a>
    </div>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout(`Student ${student.name}`, content));
}

// 6. GET /jobs/:company - Display jobs offered by a particular company
function handleCompanyJobs(req, res, companyParam) {
  // Find company by ID or Name (case insensitive)
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

  const jobsCards = filteredJobs.length > 0
    ? filteredJobs.map(j => `
        <div class="card" style="margin-bottom: 1.5rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <h3 class="card-title">${j.title}</h3>
              <span class="badge ${j.status === 'Open' ? 'badge-placed' : 'badge-unplaced'}">${j.status}</span>
            </div>
            <p class="card-subtitle"><strong>Company:</strong> ${j.companyName} | <strong>Role:</strong> ${j.role}</p>
            <p><strong>Salary Package:</strong> <span style="color: var(--secondary-color); font-weight: bold;">${j.salary}</span></p>
            <p><strong>Location:</strong> ${j.location} | <strong>Employment Type:</strong> ${j.type}</p>
            <p style="margin-top: 0.75rem;">${j.description}</p>
            <div style="margin-top: 0.75rem;">
              <strong>Eligible Branches:</strong>
              ${j.eligibleBranches.map(b => `<span class="meta-tag">${b}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('')
    : `<div class="detail-card"><p>No specific jobs found offered by '${filterName}'.</p></div>`;

  const content = `
    <div class="page-header">
      <h1>Jobs Offered by ${filterName}</h1>
      <p>Showing recruitment listings and job profiles for this corporate partner.</p>
    </div>

    ${jobsCards}

    <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
      ${company ? `<a href="/company/${company.id}" class="btn">View ${company.name} Profile</a>` : ''}
      <a href="/companies" class="btn btn-outline">&larr; Back to All Companies</a>
    </div>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout(`Jobs for ${filterName}`, content));
}

// Static File Server Handler
function handleStaticFile(req, res, filePath) {
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(__dirname, safePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      return handle404(req, res, 'Static asset not found.');
    }
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'text/plain';
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'text/javascript';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg') contentType = 'image/jpeg';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// 404 Not Found Handler
function handle404(req, res, message = 'The requested URL or resource was not found on this server.') {
  const content = `
    <div class="page-header" style="text-align: center;">
      <h1 style="color: #dc2626; font-size: 3rem;">404 Not Found</h1>
      <p>${message}</p>
    </div>
    <div style="text-align: center; margin-top: 2rem;">
      <a href="/" class="btn">Return to Placement Home</a>
    </div>
  `;

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderLayout('404 Page Not Found', content));
}


// Server Dispatcher using HTTP module
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Method check: Only GET supported in this application
  if (req.method !== 'GET') {
    return handle405(req, res);
  }

  // Routing Table & Regex Dynamic Routes
  try {
    // 1. Static asset check
    if (pathname.startsWith('/public/')) {
      return handleStaticFile(req, res, pathname);
    }

    // 2. GET /
    if (pathname === '/') {
      return handleHome(req, res);
    }

    // 3. GET /companies
    if (pathname === '/companies') {
      return handleCompanies(req, res);
    }

    // 4. GET /company/:id
    const companyMatch = pathname.match(/^\/company\/([a-zA-Z0-9_-]+)$/);
    if (companyMatch) {
      const companyId = companyMatch[1];
      return handleCompanyDetail(req, res, companyId);
    }

    // 5. GET /students
    if (pathname === '/students') {
      return handleStudents(req, res);
    }

    // 6. GET /student/:id
    const studentMatch = pathname.match(/^\/student\/([a-zA-Z0-9_-]+)$/);
    if (studentMatch) {
      const studentId = studentMatch[1];
      return handleStudentDetail(req, res, studentId);
    }

    // 7. GET /jobs/:company
    const jobsMatch = pathname.match(/^\/jobs\/([a-zA-Z0-9_-]+)$/);
    if (jobsMatch) {
      const companyParam = jobsMatch[1];
      return handleCompanyJobs(req, res, companyParam);
    }

    // Unmatched Route -> 404
    handle404(req, res);
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderLayout('500 Server Error', '<h1>500 Internal Server Error</h1><p>An unexpected error occurred.</p>'));
  }
});

server.listen(PORT, () => {
  console.log(`[Implementation A] HTTP Module Server running on http://localhost:${PORT}`);
});
