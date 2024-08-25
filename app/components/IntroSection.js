import { intro } from "../mockData/mockIntro"

export default function Intro() {

  return (
    <div>
      <div className="flex flex-row text-5xl justify-center">{intro.title}</div>
      <div>{intro.picture}</div>
      <div className="flex flex-row text-2xl justify-center px-4 py-8">{intro.body}</div>
    </div>
  )
}
