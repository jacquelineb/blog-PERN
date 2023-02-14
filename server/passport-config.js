const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const bcrypt = require('bcrypt');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const results = await pool.query(
        'SELECT * FROM blog_user WHERE LOWER(email) = LOWER($1)',
        [email]
      );
      // User with given email not found
      if (!(results.rows.length > 0)) {
        return done(null, false, { message: 'Incorrect email or password' });
      }

      const user = results.rows[0];
      if (await bcrypt.compare(password, user.hashed_password)) {
        return done(null, user);
      } else {
        // Wrong password
        return done(null, false, { message: 'Incorrect email or password.' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const results = await pool.query('SELECT * FROM blog_user WHERE id = $1', [id]);
      const user = results.rows[0];
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
}

module.exports = initialize;
