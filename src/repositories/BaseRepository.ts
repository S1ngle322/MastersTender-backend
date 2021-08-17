import mongoose from "mongoose";
import Repository from "../types/interfaces/Repository";
import { unmanaged, injectable } from "inversify";
import EntityNotFoundError from "../types/exceptions/EntityNotFoundError";

@injectable()
abstract class BaseRepository<T> implements Repository<T> {
    public readonly _model: mongoose.Model<T & mongoose.Document>;

    constructor(@unmanaged() modelName: string) {//@unmanaged
        this._model = mongoose.model<T & mongoose.Document>(modelName);
    }

    public async getAll(): Promise<T[]> {
        let result = await this._model
            .find()
            .select("-__v")
            .exec();

        return result.map(r => r.toObject<T>());
    }

    public async findById(id: string): Promise<T> {
        const result = await (
            await this._model
                .findById(id)
                .select("-__v")
                .exec()
        ).toObject<T>();

        if(!result)
            throw new EntityNotFoundError(
                "Can't find entity with such parameters!"
            );

        return result;
    }

    public async findOne(item: T): Promise<T> {
        const result = await this._model
            .findOne(item).exec();

        if (!result) {
            throw new EntityNotFoundError(
                "Can't find enity with such parameters"
            );
        }

        return result.toObject<T>();
    }


    public async find(item: T): Promise<T[]> {
        let result = await this._model
            .find(item)
            .select("-__v")
            .exec();



        if(!result)
            throw new EntityNotFoundError(
                "Can't find entity with such parameters!"
            );

        return result.map(r => r.toObject<T>());;
    }

    public async create(item: T): Promise<T> {
        // @ts-ignore
        let result = await this._model.create(item);

        return result.toObject<T>();

    }

    public async update(id: string, item: T): Promise<T> {
        const result = await (
            await this._model
                .findByIdAndUpdate(id, item)
                .select("-__v")
                .exec()
        ).toObject<T>();

        if(!result)
            throw new EntityNotFoundError(
                "Can't find entity with such parameters!"
            );

        return result;
    }

    public async delete(item: T): Promise<T[]> {
        let itemsToDelete = await this._model
            .find(item)
            .select("-__v")
            .exec();


        if(!item)
            throw new EntityNotFoundError(
                "Can't find entity with such parameters!"
            );

        await this._model.deleteMany(item).exec();

        return itemsToDelete.map(r => r.toObject<T>());
    }
}

export default BaseRepository;