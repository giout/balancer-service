const os = require('os')
const osUtils = require('node-os-utils')
const bytes = require('./bytes.js')

// devuelve ram libre en GB
const getFreeRam = () => {
    const ramBytes = os.freemem()
    return bytes.bytesToGigabytes(ramBytes)
}

// devuelve cpu libre en %
const getFreeCpu = async () => {
    const { cpu } = osUtils
    const cpuUsage = await cpu.usage()

    return 100 - cpuUsage
}

module.exports = {
    getFreeRam,
    getFreeCpu
}