package models.infrastructure

import javax.inject.Inject

import commons.models.Tables
import models.User
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.lifted.{TableQuery, Tag}
import slick.model.{Column, Table}

import scala.concurrent.ExecutionContext

class DatabaseConnection @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  val user = Tables.User

  def getAllUers = db.run {
    List(user)
  }
}
