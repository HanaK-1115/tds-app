const logError = (req, res) => {
    const { message, stack, componentStack, url, userAgent, timestamp } = req.body;

    console.error('--- Client-side Error ---');
    console.error(`Message: ${message}`);
    console.error(`Stack: ${stack}`);
    console.error(`Component Stack: ${componentStack}`);
    console.error(`URL: ${url}`);
    console.error(`User Agent: ${userAgent}`);
    console.error(`Timestamp: ${timestamp}`);
    console.error('-------------------------');

    res.status(200).send('Error logged');
};

module.exports = { logError };