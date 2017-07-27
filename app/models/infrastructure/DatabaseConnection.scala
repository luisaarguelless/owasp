package models.infrastructure

import javax.inject.Inject

import models.User
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import play.db.NamedDatabase
import slick.driver.JdbcProfile
import slick.jdbc.JdbcProfile
import slick.lifted.Tag
import slick.model.{Column, Table}
import play.api.db.slick.Config.driver.simple._

import scala.concurrent.ExecutionContext

class DatabaseConnection @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {

  import profile.api._

  private class UsersTable(tag: Tag) extends Table[User](tag, "USERS") {

    def name = columns[String]("NAME", O.PrimaryKey)
    def color = Column("COLOR","String")

    def * = (name, color) <> (Cat.tupled, Cat.unapply)
  }

}
