#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {createCompiler} = require('./Compiler')

var argv = require('yargs')
    .usage('Usage: $0 <cmd> [options]') // usage string of application.
    .command('compile', 'for compile kidbright program.') // describe commands available.
    .help('help')
    .version('1.0.1', 'version', 'display version information') // the version string.
    .alias('version', 'v')
    .alias('help', 'h')
    .alias('kidbright', 'k')
    .alias('context', 'c')
    .alias('flags', 'f')
    .demand('context')
    .demand('kidbright')
    .demand('flags')
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
    .argv;


let context = path.resolve(argv.context)
let flags = path.resolve(argv.flags)

console.log(`${context}, ${fs.existsSync(context)}
${flags}, ${fs.existsSync(flags)} 
`)

let content = {}
content.context = JSON.parse(fs.readFileSync(context).toString())
content.flags = JSON.parse(fs.readFileSync(flags).toString())
content.context.PROCESS_DIR = argv.kidbright
content.context.toolchain_dir = `${content.context.PROCESS_DIR}/xtensa-esp32-elf/bin`


let Compiler = createCompiler(content.context)

Compiler.compile(content.flags).then(() => {
    console.log('compile all files done')
}).catch(err => {
    console.error(err)
})

