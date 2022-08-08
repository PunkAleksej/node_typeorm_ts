import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { Buffer } from 'buffer';
import { StatusCodes } from 'http-status-codes';
import { SimpleConsoleLogger } from 'typeorm';
import { usersRepository } from '../../db/index';
import jwtTools from '../../utils/authTools';

export type UserInfo = {
  photo?: string;
}

const updatePhoto = async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log(1)
    const userToUpdate = request.user;
    const { photo } = request.body;
    console.log(photo);
    if (photo) {
      userToUpdate.photo = photo;
    }
    const buff = Buffer.from(photo, 'base64');
    fs.writeFileSync('stack-abuse-logo-out.png', buff);
    console.log('Base64 image data converted to file: stack-abuse-logo-out.png');
    // const token = jwtTools.generateAccessToken(request.user.id);
    // await usersRepository.save(userToUpdate);
    // response.status(StatusCodes.ACCEPTED).json({ token, user: userToUpdate });
  } catch (err) {
    next(err);
  }
};
export default updatePhoto;
