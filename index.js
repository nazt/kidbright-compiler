#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {createCompiler} = require('./Compiler')

var argv = require('yargs')
    .usage('Usage: $0 <cmd> [options]') // usage string of application.
    .command('compile', 'to compile kidbright program.', yarg => {
        // console.log(`call command compile`)
    }, argv => {
        if (!argv.context) {
            console.log(`please add option --context [file.json]`)
            return
        }
        let context = path.resolve(argv.context)

        console.log(`${context}, ${fs.existsSync(context)} `)
        let content = {}
        content.context = JSON.parse(fs.readFileSync(context).toString())

        content.context.process_dir = content.context.kidbright
        content.context.toolchain_dir = `${content.context.process_dir}/xtensa-esp32-elf/bin`
        content.context.esptool = `${content.context.process_dir}/esptool`


        let Compiler = createCompiler(content.context)

        Compiler.compile(content.context.compiler).then(() => {
            console.log('compile all files done')
        }).catch(err => {
            console.error(err)
        })
    })
    .help('help')
    .version('1.0.1', 'version', 'display version information') // the version string.
    .alias('version', 'v')
    .alias('help', 'h')
    .alias('context', 'c')
    // .alias('kidbright', 'k')
    // .alias('flags', 'f')
    // .demand('cmd')
    // .demand('context')
    // .demand('kidbright')
    // .demand('flags')
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
    .command('generate', 'to generate dummy config.', yargs => {
        // console.log(yargs)
    }, argv => {
        console.log(`command generate has been called.`)
        if (argv._[1] === 'flags') {
            console.log(`generate flags`)
        }
        if (argv._[1] === 'cpp-options') {
            console.log(`generate cpp-options`)
        }
    })
    .demandCommand(1)
    // .demandOption(['w','h'])
    .argv;

