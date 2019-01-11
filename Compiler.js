const util = require('util');
const Xtensa = require('./Xtensa')

const createCompiler = (AppContext) => {
    const _Compiler = function () {
        this.compile = ({cflags, plugins_includes_switch, plugins_sources, ldflags}) => {
            let promise = new Promise((resolve, reject) => {
                Xtensa.setConfig(AppContext)
                Xtensa.compileProgram({plugins_sources, cflags, plugins_includes_switch})
                    .then(() => Xtensa.archiveProgram({plugins_sources}))
                    .then(() => Xtensa.linkObject({ldflags}))
                    .then(() => Xtensa.createBin())
                    .then(() => {
                        resolve()
                    })
                    .catch(reject)
            })
            return promise
        }
    }
    return new _Compiler;
}


module.exports = {
    createCompiler
}
