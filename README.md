# kidbright-compiler


## Installation
	npm i -g kidbright-compiler


## Usage
    Usage: kidbright-compiler <cmd> [options]

    Commands:
      kidbright-compiler compile   compile kidbright program.
      kidbright-compiler flash     flash device using esptool.
      kidbright-compiler generate  generate a dummy context configuration.

    Options:
      --help, -h     Show help                                             [boolean]
      --version, -v  1.1.3                                                 [boolean]


## Compile
    $ kidbright-compiler compile --context=context.json
    
    process_dir=/Users/nat/kidbright/KidBrightDev
    compiling... lcd_i2c.cpp ok.
    compiling... lcd1604.cpp ok.
    compiling... user_app.cpp ok. (with warnings)
    archiving... /Users/nat/kidbright/KidBrightDev/esp32/build/80-7d-3a-a5-8c-0c/libmain.a
    linking... /Users/nat/kidbright/KidBrightDev/esp32/build/80-7d-3a-a5-8c-0c/80-7d-3a-a5-8c-0c.elf
    creating bin image... /Users/nat/kidbright/KidBrightDev/esp32/build/80-7d-3a-a5-8c-0c/80-7d-3a-a5-8c-0c.bin
    compile all files done

## Flash
    $ kidbright-compiler flash --context=context.json --port=/dev/tty.usbserial-DO01WLR4
    
    esptool.py v2.3.1
    Connecting....
    Chip is ESP32D0WDQ6 (revision (unknown 0xa))
    Features: WiFi, BT, Dual Core, VRef calibration in efuse
    Uploading stub...
    Running stub...
    Stub running...
    Changing baud rate to 480600
    Changed.
    Configuring flash size...
    Auto-detected Flash size: 4MB
    Compressed 22800 bytes to 13413...
    Wrote 22800 bytes (13413 compressed) at 0x00001000 in 0.3 seconds (effective 599.4 kbit/s)...
    Hash of data verified.
    Compressed 3072 bytes to 103...
    Wrote 3072 bytes (103 compressed) at 0x00008000 in 0.0 seconds (effective 1573.0 kbit/s)...
    Hash of data verified.
    Compressed 257552 bytes to 120526...
    Wrote 257552 bytes (120526 compressed) at 0x00010000 in 3.0 seconds (effective 692.4 kbit/s)...
    Hash of data verified.

    Leaving...
    Hard resetting via RTS pin...
