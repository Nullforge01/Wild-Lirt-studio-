'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

// ─── SETUP DIRECTORIES ──────────────────────────────────────────
const dirs = ['./session', './data', './temp', './logs', './tmp'];
for (const d of dirs) fs.ensureDirSync(d);

// Requiring index.js runs its startup IIFE as a side effect (session
// restore, module auto-install, etc.) and gives us back the Express router
// it exports.
const router = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Website first - so /index.html, /favicon.ico etc. resolve before
// falling through to Necta's own routes below
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(PORT, () => {
    console.log(chalk.blue(`🌐 Wild Lirt Studio (Necta) listening on port ${PORT}`));
});

module.exports = app;
