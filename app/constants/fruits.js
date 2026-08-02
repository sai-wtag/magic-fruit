/**
 * Fruit catalogue and round layout for the Magic Fruit trick.
 *
 * The trick is a binary lookup: every fruit is assigned a hidden value and each
 * round shows the fruits whose value contains a given bit. Answering "yes" adds
 * the round number to the score, so the final score maps back to a single fruit.
 *
 * `name` is an i18n key, never a display string — translation happens in the UI.
 */

const fruit = (id, key) => ({ id, name: `fruit.${key}` })

export const FRUITS = {
  mango: fruit(1, 'mango'),
  berry: fruit(2, 'berry'),
  jackfruit: fruit(3, 'jackfruit'),
  banana: fruit(4, 'banana'),
  grapefruit: fruit(5, 'grapefruit'),
  amalaki: fruit(6, 'amalaki'),
  palm: fruit(7, 'palm'),
  pomegranate: fruit(8, 'pomegranate'),
  lychee: fruit(9, 'lychee'),
  carambola: fruit(10, 'carambola'),
  woodApple: fruit(11, 'woodApple'),
  jujube: fruit(12, 'jujube'),
  custardApple: fruit(13, 'custardApple'),
  velvetApple: fruit(14, 'velvetApple'),
  sapodilla: fruit(15, 'sapodilla'),
  papaya: fruit(16, 'papaya'),
  coconut: fruit(17, 'coconut'),
}

const {
  mango,
  berry,
  jackfruit,
  banana,
  grapefruit,
  amalaki,
  palm,
  pomegranate,
  lychee,
  carambola,
  woodApple,
  jujube,
  custardApple,
  velvetApple,
  sapodilla,
  papaya,
  coconut,
} = FRUITS

/** Every fruit, in catalogue order — this is the board the player picks from. */
export const ALL_FRUITS = Object.values(FRUITS)

/**
 * Fruits shown per round.
 * Round 0 is the full board; rounds 1..7 are the "is it here?" questions.
 */
export const ROUND_FRUITS = new Map([
  [0, ALL_FRUITS],
  [
    1,
    [
      grapefruit,
      amalaki,
      woodApple,
      papaya,
      coconut,
      lychee,
      velvetApple,
      jujube,
      banana,
      palm,
    ],
  ],
  [
    2,
    [
      jackfruit,
      palm,
      lychee,
      custardApple,
      sapodilla,
      papaya,
      velvetApple,
      berry,
    ],
  ],
  [3, [banana, mango, pomegranate, lychee, carambola, jujube, coconut]],
  [4, [jackfruit, amalaki, woodApple, berry, sapodilla, velvetApple]],
  [5, [mango, grapefruit, amalaki, custardApple, carambola, palm, berry]],
  [6, [grapefruit, pomegranate, jujube, lychee, mango, custardApple, papaya]],
  [
    7,
    [
      palm,
      jackfruit,
      grapefruit,
      pomegranate,
      banana,
      custardApple,
      jujube,
      berry,
    ],
  ],
])

/** Final score -> the fruit the player was thinking of. */
export const ANSWERS = new Map([
  [4, coconut],
  [5, woodApple],
  [6, sapodilla],
  [7, velvetApple],
  [8, carambola],
  [9, papaya],
  [10, amalaki],
  [11, banana],
  [12, lychee],
  [13, jackfruit],
  [14, mango],
  [15, palm],
  [16, pomegranate],
  [17, jujube],
  [18, berry],
  [19, grapefruit],
  [20, custardApple],
])
