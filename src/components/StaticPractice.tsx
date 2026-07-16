import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function StaticPractice() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/practice.md`)
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent('加载练习内容失败'))
  }, [])

  return (
    <section className="static-practice">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </section>
  )
}
