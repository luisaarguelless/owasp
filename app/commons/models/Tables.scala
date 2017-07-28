package commons.models

// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.PostgresDriver
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{ GetResult => GR }

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = User.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /**
   * Entity class storing rows of table User
   *  @param username Database column username SqlType(text), Default(None)
   *  @param password Database column password SqlType(text), Default(None)
   *  @param id Database column id SqlType(int4), PrimaryKey
   */
  case class UserRow(username: Option[String] = None, password: Option[String] = None, id: Int)
  /** GetResult implicit for fetching UserRow objects using plain SQL queries */
  implicit def GetResultUserRow(implicit e0: GR[Option[String]], e1: GR[Int]): GR[UserRow] = GR {
    prs =>
      import prs._
      UserRow.tupled((<<?[String], <<?[String], <<[Int]))
  }
  /** Table description of table USER. Objects of this class serve as prototypes for rows in queries. */
  class User(_tableTag: Tag) extends Table[UserRow](_tableTag, "USER") {
    def * = (username, password, id) <> (UserRow.tupled, UserRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (username, password, Rep.Some(id)).shaped.<>({ r => import r._; _3.map(_ => UserRow.tupled((_1, _2, _3.get))) }, (_: Any) => throw new Exception("Inserting into ? projection not supported."))

    /** Database column username SqlType(text), Default(None) */
    val username: Rep[Option[String]] = column[Option[String]]("username", O.Default(None))
    /** Database column password SqlType(text), Default(None) */
    val password: Rep[Option[String]] = column[Option[String]]("password", O.Default(None))
    /** Database column id SqlType(int4), PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.PrimaryKey)
  }
  /** Collection-like TableQuery object for table User */
  lazy val User = new TableQuery(tag => new User(tag))
}
