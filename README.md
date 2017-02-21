# Iyfd (In Your Face Disgrace)

This is a simple project to help some friends manage their March Madness tournament

## The tech

This was developed using Angular2, Golang and Mongo as the back end.  I use AWS EC2 to host it all.

## The site

Pretty simple for a basic user.  The user creates a login and makes picks in the tournament round by round.
Clicking a pick instantly saves it.  The picks can be disabled by an admin.

The admin panel is where it gets slightly more complicated.  An admin has the ability to add teams, create tournament
entries with the team and finally generate matchups / pick winners.  They also need to pick which region plays which region.
There is also a button to turn "Play" off under settings (to prevent picks from occurring while matchups are in progress).

The final kicker is the users.  The admin can edit the users as needed INCLUDING the user picks.  So the admin can
essentially log in as a user and make picks EVEN IF PLAY IS BLOCKED.

This helps settle disputes (or late picks)

## Enjoy

Not sure anyone wants to use this, but it's absolutely free of use.