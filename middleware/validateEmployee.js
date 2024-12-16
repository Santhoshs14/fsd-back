const validateEmployee = (req, res, next) => {
    const { name, email, phone, department, dob, role } = req.body;

    if (!name || !email || !phone || !department || !dob || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }

    next();
};

module.exports = validateEmployee;
