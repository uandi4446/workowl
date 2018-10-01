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

Errors.Cdoes = {};

Errors.Cdoes.FAILTOSAVE = {
    code: 40001,
    message: 'Fail to save DB.'
};

module.exports = Errors;