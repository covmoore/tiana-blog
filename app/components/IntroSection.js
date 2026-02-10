import { intro } from "../mockData/mockIntro"

export default function Intro() {

  return (
    <div>
      <div className="flex flex-row text-4xl justify-center">{intro.title}</div>
      <div>{intro.picture}</div>
      <div className="flex flex-row text-xl justify-center px-4 py-4">{intro.body}</div>
    </div>
  )
}
