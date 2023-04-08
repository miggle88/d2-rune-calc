import Card from '@/components/common/Card'
import Paragraph from '@/components/common/Paragraph'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <div className="p-8">
        <Card title="Greetings Diablo 2 Players">
          <div className="px-4 py-2">
            <Paragraph>
              This is a website for Diablo 2 players to find out what runes they need to make runewords, as well as
              calculate what runes they can upgrade their current runes to. The following features that are currently
              available are as follows:
            </Paragraph>
            <div className="text-red-200 text-xl">
              <ul className="list-disc list-inside p-4 space-y-4">
                <li>Calculate the runes needed to make a runeword</li>
                <li>Calculate the runes needed to upgrade a rune</li>
                <li>Calculate the runes needed to upgrade a rune to a specific rune</li>
                <li>Ability to create profiles and save an inventory</li>
                <li>Filter by runewords using the Runewords page</li>
                <li>Filter by runes using the Calc page</li>
                <li>Provide feedback to the admins for future content you would like to see</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home
