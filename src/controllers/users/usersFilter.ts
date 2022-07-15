import { Between, ILike, FindManyOptions } from 'typeorm';
import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/index';
import { User } from '../../db/entity/User';

type RequestBody = {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  DoB: string,
}

type Response = {
  message: string;
  token: string;
}

type ControllerType = RequestHandler<
Record<string, never>, any, RequestBody, Record<string, never>>

const getAllUser: ControllerType = async (req, res, next) => {
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const take = req.query.perPage || null;
    const offset = (req.query.page) ? (+req.query.page - 1) * take : null;
    const skip = offset || 0;
    const DoB = Between(
      new Date(req.query.minDoB || 0),
      new Date(req.query.maxDoB),
    );

    let where: FindManyOptions<User>['where'];

    if (req.query.search) {
      where = [
        { firstName: ILike(`%${req.query.search}%`), DoB },
        { lastName: ILike(`%${req.query.search}%`), DoB },
        { email: ILike(`%${req.query.search}%`), DoB },
      ];
    } else {
      where = {
        DoB,
      };
    }

    console.log(where)
    console.log(order)
    //console.log(take)
    //console.log(skip)
    const [users, totalCount] = await usersRepository.findAndCount({
      where,
      order,
      take,
      skip,
    });

    return res.status(StatusCodes.OK).json({ users, totalCount });
  } catch (err) {
    next(err);
  }
};

export default getAllUser;
