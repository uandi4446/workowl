var Errors = {}

Errors.BADREQUEST = {
    status: 400,
    message: 'Bad Request'
};

Errors.UNAUTHORIZED = {
    status: 401,
    message: 'Failed to authorize'
};

Errors.NOTFOUND = {
    status: 404,
    message: 'Not Found'
};

Errors.SYSTEM = {
    status: 500,
    message: 'Internal server Error'
};

Errors.TEST = {
    status: 405,
    message: 'Debugging'
};

Errors.Codes = {};

Errors.Codes.FAILTOSAVE = {
    code: 40001,
    message: 'Fail to save DB.'
};

Errors.Codes.NOCONTENTS = {
    code: 40002,
    message: 'There is no contents.'
}

Errors.Codes.FAILTOLOGIN = {
    code: 40101,
    message: 'Fail to login'
};

module.exports = Errors;