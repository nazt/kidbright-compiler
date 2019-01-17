#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {createCompiler} = require('./Compiler')
const pkg = require('./package')

var argv = require('yargs')
    .usage('Usage: $0 <cmd> [options]') // usage string of application.
    .command('compile', 'compile kidbright program.', yarg => {
        // console.log(`call command compile`)
    }, argv => {
        if (!argv.context) {
            console.log(`please add option --context [file.json]`)
            return
        }

        let context = path.resolve(argv.context)
        let Compiler

        context = JSON.parse(fs.readFileSync(context).toString())

        context.process_dir = context.kidbright_path
        context.toolchain_dir = `${context.process_dir}/xtensa-esp32-elf/bin`
        context.esptool = `${context.process_dir}/esptool`
        context.compiler.plugins_sources.push(`${context.user_app_dir}/${context.board_name}/user_app.cpp`)

        Compiler = createCompiler(context)

        Compiler.compile(context.compiler).then(() => {
            console.log('compile all files done')
        }).catch(err => {
            console.error("project failed.")
        })
    })
    .help('help')
    .version('version', pkg.version, `version ${pkg.version}`) // the version string.
    .alias('version', 'v')
    .alias('help', 'h')
    .alias('context', 'c')
    .showHelpOnFail(true, 'whoops, something went wrong! run with --help')
    .command('flash', 'flash device using esptool.', yargs => {
        // pass
    }, argv => {
        let context = path.resolve(argv.context)
        context = JSON.parse(fs.readFileSync(context).toString())
        context.process_dir = context.kidbright_path
        context.toolchain_dir = `${context.process_dir}/xtensa-esp32-elf/bin`
        context.esptool = `${context.process_dir}/esptool`

        if (!argv.port) {
            console.log(`no port specify.`)
            return
        } else {
            if (fs.existsSync(argv.port)) {
                const Xtensa = require('./Xtensa')
                Xtensa.flash({portname: argv.port, G: context, stdio: 'inherit'})
            } else {
                console.log(`port isn't exists.`)
            }
        }
    })
    .command('generate', 'generate a dummy context configuration.', yargs => {
        // pass
    }, argv => {
        const dummy = fs.readFileSync(`${__dirname}/context.json`).toString()
        console.log(dummy)
    })
    .demandCommand(1)
    .argv;

