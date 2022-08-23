import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { genreRepository } from '../../db';
import { Genre } from '../../db/entity/Genre';

type Response = {
    genres: Genre[];
}

type ControllerType = RequestHandler<
Record<string, never>, Response, Record<string, never>>

const getGenreList: ControllerType = async (request, response, next) => {
  try {
    const genres = await genreRepository.find();
    response.status(StatusCodes.ACCEPTED).json({ genres });
  } catch (err) {
    next(err);
  }
};

export default getGenreList;
