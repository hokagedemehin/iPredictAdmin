# Todo Checklist to complete

- [x] Get the date and country selection from the predict and win page
- [x] change the value of the options in the selction pane to the IDs
- [x] pass the data from predict page to the utilities function to get the list of all matches
- [x] create a component to render when there are no matches to display
- [x] click event on the add and remove button for each match. This will populate or remove selected matches from the use state
- [x] work on the matches that are rendered when clicked on
- [x] only two matches are to be displayed per row with scores
- [x] create an update button to get any update on selected matches
- [x] update button should forEach on the featureIds and get the scores of all matches
- [x] create a clear all button
- [x] create another page to display all predictions and a check sign if the predictions are correct and a close if it is wrong
- [x] arrange the database in descending order
- [x] add isLoading logic to all my buttonsconfirmed matches should remain in selected matches
- [x] work out how all the predictions will be displayed based on the match that was selected
- [x] each card should show fist name, last name, email, prediction time, matches and the respective predicted score and an icon to show if the prediction was right or wrong
- [x] login page to guard the whole site
- [x] only certain emails can see the site
- [ ] each match prediction cost 5 coins, so for a complete 4 match prediction you need 20 coins
- [ ] check email for coin value

## Trivia TODO

### checklists

- [x] Each question will have three options and a correct response with a unique ID
- [x] check if a question already exist
- [x] create home trivia page with options to add a question, view question and view responses
- [x] Add question page will have a form to fill in the questions, three possible answer and correct answer, also store the unique ID
- [x] view question page will have each question as a card that has the question truncated to two lines and when you click it, you see the complete question with all the three possible options and the correct answer
- [x] each question detail page will have a button to edit the question so as to update the content and submit it to firebase
- [x] skeleton loader for pages that are asynchronous
- [ ] each question should have a checkbox that is clicked by default. Once it is unclicked it will be set to false for visible
- [ ] create a component to show if there a no questions at all
- [ ] Any question that is false will not show up on the user side
- [ ] view response page, a detail card of each attempt with name, email, date and time of attempt, no of questions, no of correct answer (green) and no of wrong answers (red)
