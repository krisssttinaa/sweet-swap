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
    const { user_id, reported_post_id, reason, date_reported } = req.body;
    try {
        const newReport = await Report.createReport(user_id, reported_post_id, reason, date_reported);
        res.json(newReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};