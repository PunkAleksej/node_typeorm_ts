import { Between, ILike, FindManyOptions } from 'typeorm';
import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/index';
import { User } from '../../db/entity/User';

type ReqParams = {
  id?: string;
}

type ReqQuery = {
  column?: string;
  order?: string;
  perPage?: number;
  page?: number;
  minDoB?: string;
  maxDoB?: string;
  search?: string;
}

type ResBody = {
  users: User[];
  totalCount: number;
}
type ControllerType = RequestHandler<
ReqParams, ResBody, object, ReqQuery>

const booksFilter: ControllerType = async (req, res, next) => {
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const take = req.query.perPage || null;
    const page = +req.query.page || 1;
    const skip = take ? (page - 1) * take : null;
    const DoB = Between(
      new Date(req.query.minDoB || 0),
      new Date(req.query.maxDoB),
    );

    let where: FindManyOptions<User>['where'];

    if (req.query.search) {
      const search = ILike(`%${req.query.search}%`);
      where = [
        { firstName: search, DoB },
        { lastName: search, DoB },
        { email: search, DoB },
      ];
    } else {
      where = {
        DoB,
      };
    }

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

export default booksFilter;
