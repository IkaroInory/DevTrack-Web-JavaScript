const statusCode = {
    unknownError: 0,

    success: 100,

    userExists: 201,
    userNotExists: 202,
    passwordError: 203,

    vCodeError: 301,
    vCodeInvalid: 302,
    vCodeNoRecord: 303,
    vCodeResend: 304,

    uuidConflict: 901
};

export default statusCode;
