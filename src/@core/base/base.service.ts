import { Injectable } from '@nestjs/common';
import { ClientSession, Model, Types } from 'mongoose';

@Injectable()
export class BaseService<T> {
  constructor(private model: Model<T>) {}

  async getAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async getById(_id: string | Types.ObjectId): Promise<T> {
    return this.model.findById(_id).exec();
  }

  async create<DTO>(payload: DTO, session?: ClientSession): Promise<T> {
    const [response] = await this.model.create([payload], { session });

    return response;
  }

  async createMany<DTO>(payload: DTO[], session?: ClientSession): Promise<T[]> {
    const response = await this.model.create(payload, { session });

    return response;
  }

  async update<DTO>(
    _id: string | Types.ObjectId,
    dto: DTO,
    session?: ClientSession,
  ): Promise<T> {
    return this.model
      .findByIdAndUpdate(_id, dto, { session, new: true })
      .exec();
  }

  async delete(
    _id: string | Types.ObjectId,
    session?: ClientSession,
  ): Promise<T> {
    return this.model.findByIdAndDelete(_id, { session }).exec();
  }
}
