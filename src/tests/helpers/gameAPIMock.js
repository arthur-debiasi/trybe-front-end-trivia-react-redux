const gameAPI = {
  response_code: 0,
  results: [
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'hard',
      question:
        'What was the name of the spy ring that helped the United States win the Revolutionary War?',
      correct_answer: 'Culper Ring',
      incorrect_answers: [
        'New York Spy Ring',
        'Washington&#039;s Spies',
        'Unnamed',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'In Left 4 Dead, what is the name of the Special Infected that is unplayable in Versus mode?',
      correct_answer: 'The Witch',
      incorrect_answers: ['The Tank', 'The Smoker', 'The Spitter'],
    },
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'hard',
      question:
        'During the Wars of the Roses (1455 - 1487) which Englishman was dubbed &quot;the Kingmaker&quot;?',
      correct_answer: 'Richard Neville',
      incorrect_answers: ['Richard III', 'Henry V', 'Thomas Warwick'],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'On the 6th of June 2006, what was the name of the infamous glitch that occurred in the MMO RuneScape?',
      correct_answer: 'The Falador Massacre',
      incorrect_answers: [
        'Noclip glitch',
        'Party-hat Duplication Glitch',
        'TzHaar Massacre',
      ],
    },
    {
      category: 'Entertainment: Television',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Baron Silas Greenback is the arch nemesis of which cartoon hero?',
      correct_answer: 'Danger Mouse',
      incorrect_answers: ['Bananaman', 'SuperTed', 'Captain Star'],
    },
  ],
};

const gameAPIMock = gameAPI;
const badResponseAPI = { response_code: 3, results: [] };
export default gameAPIMock;
export { badResponseAPI };
