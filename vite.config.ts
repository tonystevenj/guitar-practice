import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig, type Plugin } from 'vite'

function imageManifestPlugin(): Plugin {
  const imageExtensions = /\.(png|jpg|jpeg|webp|gif)$/i

  function scanDir(dir: string): string[] {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir).filter((f) => imageExtensions.test(f))
  }

  function getManifest() {
    const publicDir = path.resolve(__dirname, 'public')
    const chords = scanDir(path.join(publicDir, 'images/chords'))
    const rhythms = scanDir(path.join(publicDir, 'images/rhythms'))
    return { chords, rhythms }
  }

  return {
    name: 'image-manifest',

    // Dev: serve dynamic manifest via middleware (match both with and without base)
    configureServer(server) {
      const handler = (_req: any, res: any) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(getManifest()))
      }
      server.middlewares.use('/api/manifest.json', handler)
      server.middlewares.use('/guitar-practice/api/manifest.json', handler)
    },

    // Build: emit manifest as a static asset
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'api/manifest.json',
        source: JSON.stringify(getManifest()),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imageManifestPlugin()],
  base: '/guitar-practice/',
})
