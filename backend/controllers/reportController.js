const Report = require('../models/report');

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.getAllReports();
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.getReportById(req.params.id);
        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createReport = async (req, res) => {
    const reportData = req.body;
    try {
        const result = await Report.createReport(reportData);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};