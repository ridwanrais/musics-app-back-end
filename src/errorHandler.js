const ClientError = require('./exceptions/ClientError');

module.exports = (request, h) => {
  // mendapatkan konteks response dari request
  const { response } = request;

  if (response instanceof ClientError) {
    // membuat response baru dari response toolkit sesuai kebutuhan error handling
    const newResponse = h.response({
      status: 'fail',
      message: response.message,
    });
    newResponse.code(response.statusCode);
    return newResponse;
  }

  // respon untuk server error
  if (response instanceof Error) {
    const newResponse = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    newResponse.code(500);
    // console.error(error);
    return newResponse;
  }

  // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
  return response.continue || response;
};
