
/**
 * Factory function for initiating chain.
 * @param   {object} state Optional. Sets the initial state object passed between steps.
 * @return  {object} Chain Chain instance.
*/
export const Chains = (state) => {
    // Validate input
    if (!isValidStateObject(state)) {
        throw new Error('Initial argument must be an object if specified');
    }


    // Create internal objects
    let _state = Object.assign({}, state || {});
    let _promise = Promise.resolve();


    // Create chain instance
    const instance = {
        then:   func => _then(func),
        catch:  func => _catch(func)
    };


    // Then method
    const _then = (func) => {
        // The generator
        _promise = _promise.then(() => new Promise((resolve, reject) => {
            func(_state, (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        }))

        return instance;
    };


    // Catch method
    const _catch = (func) => {
        _promise = _promise.catch((error) => {
            func(error, _state);
        });
    };


    // return instance
    return instance;
};



/**
 * Check whether argument is either an object, null, or undefined.
 * @param   {object} state  Input to check.
 * @return  {bool}   result True, or false.
*/
const isValidStateObject = (state) => {
    let valid_input = [
        '[object Object]',
        '[object Undefined]',
        '[object Null]'
    ];

    return valid_input.indexOf(Object.prototype.toString.call(state)) !== -1;
}
