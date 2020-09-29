type Props = {
  who: string
}

const Hello = ({ who }: Props) => (
  <h1>
    <b>Hello</b> {who}!
  </h1>
)

export default Hello
