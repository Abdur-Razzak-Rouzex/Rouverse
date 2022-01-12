const getError = err => {
    return err?.response?.data?.message
        ? err.response.data.message
        : err.message
}

const onError = async (err, req, res, next) => {
    console.log('the error: ', err);
    /*res.status(500).send({ message: err.toString() });*/

    /** use the following while in product */
    res.status(500).send({ message: 'Sorry !! something went wrong from the server end' });
};

export {getError, onError};