# Day 04

Overall a lot more progress today. Solved in 5 prompts. I didn't keep track of the total time, but there was a fair bit of debugging needed to get to the third prompt. I did spend a bit of time futzing with the parsing, when in retrospect, I should have just prompted it. Which I eventually did at prompt #2.

## First prompt

The input of each line has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have. Figure out which of the numbers you have appear in the list of winning numbers. The first match makes the card worth one point and each match after the first doubles the point value of that card. For example:
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
In the above example, card 1 has five winning numbers (41, 48, 83, 86, and 17) and eight numbers you have (83, 86, 6, 31, 17, 9, 48, and 53). Of the numbers you have, four of them (48, 83, 17, and 86) are winning numbers! That means card 1 is worth 8 points (1 for the first match, then doubled three times for each of the three matches after the first).
		Card 2 has two winning numbers (32 and 61), so it is worth 2 points.
		Card 3 has two winning numbers (1 and 21), so it is worth 2 points.
		Card 4 has one winning number (84), so it is worth 1 point.
		Card 5 has no winning numbers, so it is worth no points.
		Card 6 has no winning numbers, so it is worth no points.  Write a Javascript program to calculate how many points are they worth in total?


## Second prompt
Good. Now create a parser function that takes this input, and makes it suitable for the calculatePoints function. "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"

## Third prompt
For the calculatePoints function, it should not match on empty strings, or zeros.

This was enough to get the first star. 

## Fourth prompt

Good. Now modify the function to make is so that you win copies of the cards that are below the winning card equal to the number of matches. So, if card 10 were to have 5 matching numbers, you would win one copy each of cards 11, 12, 13, 14, and 15. Copies of cards are scored like normal cards and have the same card number as the card they copied. So, if you win a copy of card 10 and it has 5 matching numbers, it would then win a copy of the same cards that the original card 10 won: cards 11, 12, 13, 14, and 15. This process repeats until none of the copies cause you to win any more cards. Cards will never make you copy a card past the end of the table. Here is the input Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
		Card 1 has four matching numbers, so you win one copy each of the next four cards: cards 2, 3, 4, and 5.
		Your original card 2 has two matching numbers, so you win one copy each of cards 3 and 4.
		Your copy of card 2 also wins one copy each of cards 3 and 4.
		Your four instances of card 3 (one original and three copies) have two matching numbers, so you win four copies each of cards 4 and 5.
		Your eight instances of card 4 (one original and seven copies) have one matching number, so you win eight copies of card 5.
		Your fourteen instances of card 5 (one original and thirteen copies) have no matching numbers and win no more cards.
		Your one instance of card 6 (one original) has no matching numbers and wins no more cards.  Write a javascript function to calculate how many total scratchcards do you end up with?


## Fifth prompt

I'm getting an infinite loop


That returned a brute force solution that allowed me to get a second star.
