import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logDirectory = path.resolve(
  __dirname,
  '../../../logs'
)

const logFile = path.join(
  logDirectory,
  'security.log'
)

function ensureLogDirectory() {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {
      recursive: true
    })
  }
}

function sanitize(value = 'unknown') {
  return String(value)
    .replace(/[\r\n]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 120)
}

export function writeSecurityLog(
  event,
  {
    ip = 'unknown',
    username = 'unknown',
    requestPath = 'unknown'
  } = {}
) {
  try {
    ensureLogDirectory()

    const timestamp = new Date().toISOString()

    const logLine =
      `${timestamp} ` +
      `EVENT=${sanitize(event)} ` +
      `IP=${sanitize(ip)} ` +
      `USER=${sanitize(username)} ` +
      `PATH=${sanitize(requestPath)}\n`

    fs.appendFileSync(
      logFile,
      logLine,
      {
        encoding: 'utf8'
      }
    )
  } catch (error) {
    console.error(
      '[ERROR] No fue posible escribir el log de seguridad:',
      error.message
    )
  }
}

export function getSecurityLogPath() {
  return logFile
}