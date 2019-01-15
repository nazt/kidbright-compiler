#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {createCompiler} = require('./Compiler')
const pkg = require('./package')

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
        let content = {}

        // console.log(`${context}, ${fs.existsSync(context)} `)

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
    .version('version', pkg.version, 'display version information') // the version string.
    .alias('version', 'v')
    .alias('help', 'h')
    .alias('context', 'c')
    // .demandOption(['w','h'])
    .showHelpOnFail(true, 'whoops, something went wrong! run with --help')
    .command('generate', 'to generate dummy config.', yargs => {
        // pass
    }, argv => {
        const dummy = fs.readFileSync(`${__dirname}/context.json`).toString()
        if (argv._[1] === 'context') {
            console.log(dummy)
        }
    })
    .demandCommand(1)
    .argv;

