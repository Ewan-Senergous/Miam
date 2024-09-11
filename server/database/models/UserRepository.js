const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (username, name, password, email, role) values (?, ?, ?, ?, ?)`,
      [user.username, user.name, user.password, user.email, user.role]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async update(id, user) {
    const [result] = await this.database.query(
      `update ${this.table} set username = ?, name = ?, password = ?, email = ?, role = ? where id = ?`,
      [user.username, user.name, user.password, user.email, user.role, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async readByEmailWithPassword(email) {
    const [result] = await this.database.query(
      `select * from ${this.table} WHERE email = ?`,
      [email]
    );
    return result;
  }
}

module.exports = UserRepository;
