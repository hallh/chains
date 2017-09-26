import {Chains} from '../../src/chains.js';
import chai from 'chai';

let expect = chai.expect;


describe('Initiate Chain', () => {
    it('Create without state', () => {
        expect(Chains()).to.be.an('object');
    });

    it('Create with state', () => {
        expect(Chains({foo: "bar"})).to.be.an('object');
    });

    it('Create with null', () => {
        expect(Chains(null)).to.be.an('object');
    });

    it('Create with undefined', () => {
        expect(Chains(undefined)).to.be.an('object');
    });

    it('Create with string', () => {
        expect(Chains.bind(Chains, 'invalid')).to.throw(Error);
    });

    it('Create with number 1', () => {
        expect(Chains.bind(Chains, 1)).to.throw(Error);
    });

    it('Create with bool', () => {
        expect(Chains.bind(Chains, true)).to.throw(Error);
    });

    it('Create with empty array', () => {
        expect(Chains.bind(Chains, [])).to.throw(Error);
    });

    it('Create with populated array', () => {
        expect(Chains.bind(Chains, [1, 2])).to.throw(Error);
    });
});



describe('Run Chain', () => {
    it('Functions are called, and state preserved', () => {
        let s = {
            i: 0
        };

        Chains(s)
            .then((state, next) => {
                state.i++;
                next();
            })
            .then((state, next) => {
                state.i++;
                next();
            })
            .then((state, next) => {
                expect(state.i).to.equal(2);
            });
    });

    it('Catch is triggered on next(Error)', () => {
        Chains()
            .then((state, next) => {
                state.u = 1;
                next();
            })
            .then((state, next) => {
                next(new Error('Triggered'));
            })
            .then((state, next) => {
                state.u = 2;
            })
            .catch((error, state) => {
                expect(state.u).to.equal(1);
            });
    });

    it('Catch is triggered on unhandled errors', () => {
        Chains()
            .then((state, next) => {
                state.u = 1;
                next();
            })
            .then((state, next) => {
                undefined.not_set = no_such.value;
            })
            .then((state, next) => {
                state.u = 2;
            })
            .catch((error, state) => {
                expect(state.u).to.equal(1);
            });
    });

    it('Catch is triggered on thrown errors', () => {
        Chains()
            .then((state, next) => {
                state.u = 1;
                next();
            })
            .then((state, next) => {
                throw new Error('thrown');
            })
            .then((state, next) => {
                state.u = 2;
            })
            .catch((error, state) => {
                expect(state.u).to.equal(1);
            });
    });
});
