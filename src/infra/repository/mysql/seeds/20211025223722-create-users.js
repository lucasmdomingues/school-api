const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [
      {
        first_name: 'User ',
        last_name: '1',
        email: 'user1@gmail.com',
        password: await bcryptjs.hash('user1', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'User ',
        last_name: '2',
        email: 'user2@gmail.com',
        password: await bcryptjs.hash('user2', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'User ',
        last_name: '3',
        email: 'user3@gmail.com',
        password: await bcryptjs.hash('user3', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('user', null, {});
  },
};
