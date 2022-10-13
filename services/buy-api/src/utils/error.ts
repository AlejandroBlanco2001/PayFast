import express from 'express'

const errorHandler = async (err, req:express.Request, res: express.Response) => {
    //if there is no status, this will be 500
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
};

export {errorHandler}