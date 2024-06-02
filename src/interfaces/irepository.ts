interface IRepository<T> {
    findById(entity: T): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: T): Promise<T>;
    update(entity: Partial<T>): Promise<T | null>;
    delete(entity: T): Promise<boolean>;
}

export default IRepository;