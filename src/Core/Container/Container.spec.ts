/**
 * @file Container.spec.ts
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2024-02-03
 *
 * @changelog
 *  - 2024-02-03 - Higor Grigorio
 *    - Create Container.spec.ts.
 */
import 'reflect-metadata';

import {describe, expect, it} from "@jest/globals";
import {Container} from "./Container";
import {Container as ContainerContract} from "@/Contracts/Container";
import {Injectable} from "@/Annotations";
import {Inject} from "@/Annotations/Inject";
import {Factory} from "@/Contracts/Core";

const makeSut = (): ContainerContract => {
    return Container.getInstance();
}

const makeIdGenerator = () => {
    let id = 0;
    return () => id++;
}

class IdGenerator
    implements Factory<number> {

    protected static instance: IdGenerator;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new IdGenerator();
        }
        return this.instance;
    }

    make = makeIdGenerator();
}

class ConstantStub {
    public id: number;

    constructor() {
        this.id = IdGenerator.getInstance().make();
    }
}

@Injectable()
class NumericStub {
    constructor(
        @Inject('Constant') public value: ConstantStub,
    ) {
    }
}

interface Weapon {
    name: string;
}

@Injectable()
class Katana
    implements Weapon {
    name = 'Katana';
}

@Injectable()
class Ninja {
    constructor(
        @Inject('Weapon') public weapon: Weapon,
    ) {
    }
}

describe('Container', () => {
    it('should be able to bind a class to itself', () => {
        const sut = makeSut();

        @Injectable()
        class Service {
        }

        sut.bind(Service)
            .asSelf();

        const service = sut.make(Service);

        expect(service).toBeInstanceOf(Service);
    });

    it('should be able to bind a constant value', () => {
        const sut = makeSut();

        sut.bind('Constant')
            .asValue(new ConstantStub());

        sut.bind(NumericStub)
            .asSelf();

        const numeric1 = sut.make(NumericStub);
        const numeric2 = sut.make(NumericStub);

        expect(numeric1.value.id).toBe(0);
        expect(numeric1).toBeInstanceOf(NumericStub);
        expect(numeric2.value.id).toBe(0);
        expect(numeric2).toBeInstanceOf(NumericStub);
        expect(numeric1.value).toEqual(numeric2.value);
    });

    it('should be able bind a concrete class in an interface identifier', () => {
        const sut = makeSut();

        sut.bind(Ninja).asSelf();
        sut.bind('Weapon').as(Katana);

        const ninja = sut.make(Ninja);

        expect(ninja.weapon.name).toBe('Katana');
        expect(ninja.weapon).toBeInstanceOf(Katana);
        expect(ninja).toBeInstanceOf(Ninja);
    });

    it('should be able bind a concrete class in an abstract identifier as a singleton', () => {
        const sut = makeSut();

        interface Weapon {
            name: string;
        }

        let id = 1;

        @Injectable()
        class Katana
            implements Weapon {
            name = 'Katana';

            constructor() {
                this.name = `Katana ${id++}`;
            }
        }

        @Injectable()
        class Ninja {
            constructor(
                @Inject('Weapon') public weapon: Weapon,
            ) {
            }
        }

        sut.bind(Ninja)
            .asSelf();

        // binding the weapon as a singleton
        sut.bind('Weapon')
            .as(Katana)
            .inSingletonScope();

        const ninja1 = sut.make(Ninja);
        const ninja2 = sut.make(Ninja);

        expect(ninja1.weapon.name).toBe('Katana 1');
        expect(ninja2.weapon.name).toBe('Katana 1');
        expect(ninja1.weapon).toBeInstanceOf(Katana);
        expect(ninja2.weapon).toBeInstanceOf(Katana);
    })


    it('should be able to bind a factory', () => {
        const sut = makeSut();

        class IdFactory
            implements Factory<number> {
            count: number = 0

            make() {
                return this.count++;
            }
        }

        @Injectable()
        class Service {
            constructor(
                @Inject('id') public id: number,
            ) {
            }
        }

        sut.bind('id')
            .asFactory(new IdFactory());
        sut.bind(Service)
            .as(Service);

        expect(sut.make(Service).id).toBe(0);
        expect(sut.make(Service).id).toBe(1);
    });

    it('should be able to bind a closure', () => {
        const sut = makeSut();

        @Injectable()
        class Service {
            constructor(
                @Inject('nextId') public id: number,
            ) {
            }
        }

        // binding the factory as singleton to avoid the same instance
        sut.bind('IdFactory')
            .as(IdGenerator)
            .inSingletonScope();

        // binding the nextId helper
        sut.bind('nextId')
            .asClosure((container) => {
                return container.resolve('IdFactory')
                    .make();
            })

        // binding the service
        sut.bind(Service)
            .asSelf();

        expect(sut.make(Service).id).toBe(0);
        expect(sut.make(Service).id).toBe(1);
    });

    it('should be able bind a dynamic value in the constraint', () => {
        const sut = makeSut();

        @Injectable()
        class Katana
            implements Weapon {
            name = 'Katana';
        }

        @Injectable()
        class Kunai
            implements Weapon {
            name = 'Kunai';
        }

        class Ninja {
            constructor(
                @Inject('Weapon') public kunai: Weapon,
                @Inject('Weapon') public katana: Weapon,
            ) {
            }
        }

        sut.bind(Katana).asSelf();
        sut.bind(Kunai).asSelf();
        sut.bind(Ninja).asSelf();

        sut.bind<Katana | Kunai>('Weapon').asDynamicValue(ctx => {
            const {target, container} = ctx.request;

            switch (target.getName().toLowerCase()) {
                case 'katana':
                    return container.make<Katana>(Katana);
                case 'kunai':
                    return container.make<Kunai>(Kunai);
            }

            throw new Error('Invalid weapon');
        });
    });
});


