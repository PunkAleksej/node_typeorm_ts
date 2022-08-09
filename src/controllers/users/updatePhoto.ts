import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/index';
import jwtTools from '../../utils/authTools';
import createCustomError from '../../utils/createCustomError';

export type UserInfo = {
  photo?: string;
}

const updatePhoto = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userToUpdate = request.user;
    const { photo } = request.body;

    const imgName = `public/${request.user.id}.png`;
    const imgNameInDB = `${request.user.id}.png`;
    if (imgName) {
      userToUpdate.photo = imgNameInDB;
    }
    const base64Image = photo.split(';base64,').pop();
    fs.writeFile(imgName, base64Image, { encoding: 'base64' }, (err) => {
      createCustomError(StatusCodes.BAD_REQUEST, `${err}`);
    });
    const token = jwtTools.generateAccessToken(request.user.id);
    await usersRepository.save(userToUpdate);
    response.status(StatusCodes.ACCEPTED).json({ token, user: userToUpdate });
  } catch (err) {
    next(err);
  }
};
export default updatePhoto;
