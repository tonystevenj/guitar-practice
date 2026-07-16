import './App.css'
import RandomPassage from './components/RandomPassage'
import StaticPractice from './components/StaticPractice'

function App() {
  return (
    <div className="app">
      <h1>吉他每日练习</h1>
      <StaticPractice />
      <hr />
      <RandomPassage />
    </div>
  )
}

export default App
