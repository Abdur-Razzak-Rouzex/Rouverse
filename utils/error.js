const getError = err => {
    return err?.response?.data?.message
        ? err.response.data.message
        : err.message
}

export {getError};