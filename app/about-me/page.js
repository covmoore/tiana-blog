const aboutMe = [
  <text>
    Hello, my name is Tiana. This is my blog about music and stuff.
    I am a nurse that is obsessed with music and I talk way too much about it.
    Especially to my boyfriend who always listens. Speaking of my boyfriend, 
    did I mention that he's the best boyfriend in the world? No? Well he is
  </text>,
  <text>
    Anyways, this is my blog to share all of my thoughts on music, to post my top music lists,
    to talk about the shows I go to, to give my ratings, to do song/album analysis's, ect.
  </text>
]

export default function AboutMe() {
  return (
    <div className="flex flex-col mx-3">
      <div className="flex justify-center">
        <text className="text-5xl"> About Me</text>
      </div>
      <div className="mx-60">
        {aboutMe.map((val) => (
          <div className="my-7">
            {val}
          </div>
        ))}
      </div>
      <div>
        
      </div>
    </div>
  )
}