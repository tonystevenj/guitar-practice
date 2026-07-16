import { useCallback, useMemo, useState } from 'react';

const chordModules = import.meta.glob<string>('/public/images/chords/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default', query: '?url' })
const rhythmModules = import.meta.glob<string>('/public/images/rhythms/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default', query: '?url' })

interface Item { name: string; url: string }

interface Passage {
  rhythm: Item
  bars: Item[]
}

function toItems(modules: Record<string, string>): Item[] {
  return Object.entries(modules).map(([path, url]) => ({
    name: (path.split('/').pop() || '').replace(/\.[^.]+$/, ''),
    url,
  }))
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function RandomPassage() {
  const [passage, setPassage] = useState<Passage | null>(null)

  const chords = useMemo(() => toItems(chordModules), [])
  const rhythms = useMemo(() => toItems(rhythmModules), [])

  const generate = useCallback(() => {
    if (chords.length === 0 || rhythms.length === 0) return
    setPassage({
      rhythm: pickRandom(rhythms),
      bars: Array.from({ length: 8 }, () => pickRandom(chords)),
    })
  }, [chords, rhythms])

  const randomizeRhythm = useCallback(() => {
    if (rhythms.length === 0) return
    setPassage((prev) => prev ? { ...prev, rhythm: pickRandom(rhythms) } : null)
  }, [rhythms])

  const randomizeChords = useCallback(() => {
    if (chords.length === 0) return
    setPassage((prev) => prev ? { ...prev, bars: Array.from({ length: 8 }, () => pickRandom(chords)) } : null)
  }, [chords])

  return (
    <section className="random-passage">
      <h2>随机乐章</h2>

      <div className="btn-group">
        <button className="generate-btn" onClick={generate}>
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
