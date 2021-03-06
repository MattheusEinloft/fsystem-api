import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        gender: Sequelize.STRING,
        date_of_birth: Sequelize.DATE,
        admin: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // static associate(models) {
  //   this.hasMany(models.Answer, { as: 'answers' });
  // }
}

export default User;
