import { useCallback, useState } from 'react';

interface Passage {
  rhythm: { name: string; url: string }
  bars: { name: string; url: string }[]
}

function extractName(filename: string): string {
  return filename.replace(/\.[^.]+$/, '')
}

export default function RandomPassage() {
  const [passage, setPassage] = useState<Passage | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchManifest() {
    const base = import.meta.env.BASE_URL
    const res = await fetch(`${base}api/manifest.json`)
    return await res.json() as { chords: string[]; rhythms: string[] }
  }

  const generate = useCallback(async () => {
    setLoading(true)
    try {
      const base = import.meta.env.BASE_URL
      const manifest = await fetchManifest()
      if (manifest.chords.length === 0 || manifest.rhythms.length === 0) return

      const rhythmFile = manifest.rhythms[Math.floor(Math.random() * manifest.rhythms.length)]
      const rhythm = { name: extractName(rhythmFile), url: `${base}images/rhythms/${rhythmFile}` }

      const bars = Array.from({ length: 8 }, () => {
        const file = manifest.chords[Math.floor(Math.random() * manifest.chords.length)]
        return { name: extractName(file), url: `${base}images/chords/${file}` }
      })

      setPassage({ rhythm, bars })
    } finally {
      setLoading(false)
    }
  }, [])

  const randomizeRhythm = useCallback(async () => {
    const base = import.meta.env.BASE_URL
    const manifest = await fetchManifest()
    if (manifest.rhythms.length === 0) return
    const rhythmFile = manifest.rhythms[Math.floor(Math.random() * manifest.rhythms.length)]
    const rhythm = { name: extractName(rhythmFile), url: `${base}images/rhythms/${rhythmFile}` }
    setPassage((prev) => prev ? { ...prev, rhythm } : null)
  }, [])

  const randomizeChords = useCallback(async () => {
    const base = import.meta.env.BASE_URL
    const manifest = await fetchManifest()
    if (manifest.chords.length === 0) return
    const bars = Array.from({ length: 8 }, () => {
      const file = manifest.chords[Math.floor(Math.random() * manifest.chords.length)]
      return { name: extractName(file), url: `${base}images/chords/${file}` }
    })
    setPassage((prev) => prev ? { ...prev, bars } : null)
  }, [])

  return (
    <section className="random-passage">
      <h2>随机乐章</h2>

      <div className="btn-group">
        <button className="generate-btn" onClick={generate} disabled={loading}>
          生成乐章
        </button>
        {passage && (
          <>
            <button className="generate-btn btn-secondary" onClick={randomizeRhythm}>
              换节奏型
            </button>
            <button className="generate-btn btn-secondary" onClick={randomizeChords}>
              换和弦
            </button>
          </>
        )}
      </div>

      {passage && (
        <div className="passage-result">
          <div className="rhythm-section">
            <img
              src={passage.rhythm.url}
              alt={passage.rhythm.name}
              className="rhythm-image"
            />
          </div>

          <div className="bars-section">
            <div className="bars-grid">
              {passage.bars.map((chord, index) => (
                <div key={index} className="bar-card">
                  <img
                    src={chord.url}
                    alt={chord.name}
                    className="chord-image"
                  />
                  <span className="chord-name">{chord.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
