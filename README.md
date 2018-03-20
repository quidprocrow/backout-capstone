# backOUT
backOut is a story game, inspired by black out poetry and the choose your own adventure, about emphasis and what redaction means. The protagonist is a young woman who has made a mistake and hopes to correct it, magically; to play, choose from the available terms what she should be focusing on.

![check it out](https://preview.ibb.co/bUBjTS/Screenshot_2018_03_08_20_39_38.png)

## Related
- [Deployed API](https://tranquil-brook-35365.herokuapp.com)
- [Deployed Client Site](https://quidprocrow.github.io/backout-capstone/)
- [CLient Repository](https://github.com/quidprocrow/backout-capstone)
- [API Repository](https://github.com/quidprocrow/backout-capstone-api)

## Technologies used
- JS
- Ruby on Rails
- AJAX
- PostGresSQL
- [StripTags Node Package](https://www.npmjs.com/package/striptags)

## Planning process
I planned to write a choose your own adventure, where particular sentences would be displayed as a result of a players selecting a certain clickable word -- and words would be redacted on the basis of that same choice, with the game's hope and wisdom stats reflecting consequences. To do this, I thought I needed to have sentences that owned words, with words having keys for their clickability and whether or not they were redacted, as well as a link to the next step.


## Future Improvements
In V1, I was able to make all the necessary requests by having the application depend heavily on the backend. Though I was able to write the code to redact as it was, the free level of heroku can only make 100 requests per minute -- and I was making at least that when I was adding redaction to each word and removing clickability, then updating them all.

In V2, I shifted my emphasis to the front end. Though user's still own games, games only have a column of sentences expecting strings in an array -- rather than games owning sentences, which owned words, which referenced seeded steps, which referenced seeded sentences, which owned seeded words. (See? Much cleaner!)

In V3, I want to further refine the front end to make it more modular. Currently the game depends on an expansive switch case, which is difficult to track.


## User stories
As a user, I can create a game.
As a user, I can update a game by interacting with a game's sentences.
As a user, I can delete game.
As a user, I can show / 'load' a saved game.
As a user, I can see all of the sentences marked as active at once.
As a user, I can interact with games by clicking on select words.
As a user, I can see a new sentence as a result of a previous click on a particular word.
As a user, I cannot click a previous sentence's words.
As a user, I cannot create sentences.
As a user, I can view sentences that have been selectively redacted (blacked out).
As a user, I can view my hope and wisdom.
As a user, I observe as my hope and wisdom stats change on the basis of choices.
As a user, I  am notified when the game is over.
As a user, I can change my password.
As a user, I can sign out.
As a user, I can sign in.
Asa  user, I can sign up.

## ERD
https://www.lucidchart.com/invitations/accept/e9ef0c1e-0bc6-47b3-ac72-70ab93b7fecd

## WIREFREAMES
https://ibb.co/dBfdF7



## Gratitudes
- Maria Ines, Naida Rosenberger, Sarah Burke, Kostant Stanton, Virginia Donaire, Kate Lindsay, and Rebecca Coras were key components in my mental health in building this.
- Danny Kirschner and Nate Dunn were both excellent advisers on the structure of the database and the structure of the application.
- Mike Finneran was of great assistance in tackling serialization issues.
- Dan Soszynski graciously got me maple syrup upon request (as well as a lint roller!).
